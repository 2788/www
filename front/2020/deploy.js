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

function uploadFile(localFile, bucket, key, mac) {
  return new Promise(
    (resolve, reject) => {
      const options = {
        scope: bucket + ':' + key
      }
      const putPolicy = new qiniu.rs.PutPolicy(options)
      const uploadToken = putPolicy.uploadToken(mac)
      const putExtra = new qiniu.form_up.PutExtra()
      const config = new qiniu.conf.Config()
      const formUploader = new qiniu.form_up.FormUploader(config)

      formUploader.putFile(uploadToken, key, localFile, putExtra, (err, ret) => {
        if(err) {
          reject(err)
          return
        }
        if (ret.error) {
          reject(ret.error)
          return
        }
        resolve()
      })
    }
  )
}

// TODO: 这边需要优化上传策略，需要先上传 static 内容，再上传页面
async function deploy(config) {
  const mac = new qiniu.auth.digest.Mac(config.accessKey, config.secretKey)
  const outputFiles = await getAllFiles(config.outputPath)

  function deployFile(fileName) {
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

    return Promise.all(keys.map(
      key => uploadFile(filePath, config.bucket, key, mac).then(
        () => console.log(`[UPLOADED] ${key} (${fileName})`)
      )
    ))
  }

  // 同时最多 50 个一起处理（注意最多可能有 50*3=150 个上传请求）
  const deployFiles = batch(deployFile, 50)
  return deployFiles(outputFiles)
}

// next export 产物所在目录
const outputPath = path.resolve(__dirname, 'out')

// 执行命令：node deploy.js $AK $SK $BUCKET
const [accessKey, secretKey, bucket] = process.argv.slice(2)

deploy({ outputPath, accessKey, secretKey, bucket }).catch(e => {
  console.error(`[ERROR] Deploy failed: ${e}`)
  process.exit(1)
})
