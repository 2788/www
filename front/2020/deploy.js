/**
 * @file 部署脚本（注意：本脚本不支持在 windows 环境执行）
 * @description 将构建结果发布到指定账号下的指定 bucket
 */

const path = require('path')
const walk = require('walk')
const qiniu = require('qiniu')

// https://gist.github.com/nighca/6562d098ac01814b6e1c1718b16d4abc
function batch(process, limit = -1) {
  return function batchProcess(tasks = []) {
    let results = [], finished = 0, processing = 0
    let rejected = false

    function tryProcess(resolve, reject) {
      if (rejected) return
      if (finished >= tasks.length) {
        resolve(results)
        return
      }

      const offset = finished + processing
      const todo = limit > 0 ? limit - processing : tasks.length
      tasks.slice(offset, offset + todo).forEach((task, i) => {
        processing++
        process(task).then(
          result => {
            results[offset + i] = result
            processing--
            finished++
            tryProcess(resolve, reject)
          },
          err => {
            reject(err)
            rejected = true
          }
        )
      })
    }

    return new Promise(tryProcess)
  }
}

function getAllFiles(baseDir) {
  return new Promise((resolve, reject) => {
    const walker = walk.walk(baseDir)
    const files = []

    walker.on('error', (_, stat) => {
      reject(stat.error)
    })

    walker.on('files', (_, stats, next) => {
      stats.forEach(
        stat => files.push(
          path.relative(baseDir, path.join(_, stat.name))
        )
      )
      next()
    })
    walker.on('end', () => {
      resolve(files)
    })
  })
}

async function uploadFile(localFile, bucket, key, mac) {
  const options = {
    scope: bucket + ':' + key
  }
  const putPolicy = new qiniu.rs.PutPolicy(options)
  const uploadToken = putPolicy.uploadToken(mac)
  const putExtra = new qiniu.form_up.PutExtra()
  const config = new qiniu.conf.Config()
  const formUploader = new qiniu.form_up.FormUploader(config)

  const putFile = () => new Promise((resolve, reject) => {
    formUploader.putFile(uploadToken, key, localFile, putExtra, (err, ret) => {
      if(err || ret.error) {
        reject(err || ret.error)
        return
      }
      resolve()
    })
  })

  // 最多重试 3 次
  let retryTime = 3
  let error = null
  while (retryTime-- > 0) {
    try {
      await putFile()
      return
    } catch (e) {
      error = e
    }
  }
  if (error != null) {
    throw error
  }
}

function makeDeployer(config) {
  function deployFile(fileName) {
    const mac = new qiniu.auth.digest.Mac(config.accessKey, config.secretKey)
    const filePath = path.resolve(config.outputPath, fileName)

    // 对于文件 `foo/index.html` 或 `foo.html`，分别以 `foo`、`foo/` & `foo/index.html` 作为 key 上传
    // 以保证通过 URL `/foo` 或 `/foo/` 都能访问到该内容
    // 注意虽然 Kodo 支持设置“默认首页”，但是如果 bucket 同时开启了镜像回源的话
    // 对于 `/foo/` 会优先去镜像回源，而不是使用 `/foo/index.html`
    const keys = []
    if (path.extname(fileName) === '.html') {
      const dirname = fileName.indexOf('/') >= 0 ? path.dirname(fileName) : ''
      const basename = path.basename(fileName, '.html')
      const routePath = basename === 'index' ? dirname : path.join(dirname, basename)
      keys.push(routePath, routePath + '/', routePath + '/index.html')
    } else {
      keys.push(fileName)
    }

    // 对于 404 页面，特别地以 error-404 为名上传
    // 相关文档 https://developer.qiniu.com/kodo/manual/1659/download-setting
    if (fileName === config.notFoundPage) {
      keys.push('errno-404')
    }

    return Promise.all(keys.map(
      key => uploadFile(filePath, config.bucket, key, mac).then(
        () => console.log(`[UPLOADED] ${key} (${fileName})`)
      )
    ))
  }

  // 同时最多 50 个一起处理（注意最多可能有 50*3=150 个上传请求）
  return batch(deployFile, 50)
}

async function deploy(config) {
  const outputFiles = await getAllFiles(config.outputPath)

  // 区分页面内容跟静态资源，先上传 static 内容，再上传页面
  // 否则在发布过程中页面在对应的静态资源上次完成前更新，会导致访问到的页面不能正确工作
  const pageFiles = []
  const assetFiles = []
  outputFiles.forEach(fileName => (
    (path.extname(fileName) === '.html' ? pageFiles : assetFiles).push(fileName)
  ))

  // 如果指定了 notFoundPage，但构建结果中不存在对应的文件，提醒之
  if (outputFiles.indexOf(config.notFoundPage) < 0) {
    console.warn('[NOT FOUND] notFoundPage specified, while no such file found.')
  }

  const deployFiles = makeDeployer(config)
  await deployFiles(assetFiles)
  await deployFiles(pageFiles)

  console.log(`[SUCCESS] Deploy succeeded: ${pageFiles.length} pages, ${assetFiles.length} asset files.`)
}

// next export 产物所在目录
const outputPath = path.resolve(__dirname, 'out')

// 404 对应的 HTML 页面路径（相对于 outputPath）
const notFoundPage = '404.html'

// 执行命令：node deploy.js $AK $SK $BUCKET
const [accessKey, secretKey, bucket] = process.argv.slice(2)

deploy({ outputPath, notFoundPage, accessKey, secretKey, bucket }).catch(e => {
  console.error(`[ERROR] Deploy failed: ${e}`)
  process.exit(1)
})
