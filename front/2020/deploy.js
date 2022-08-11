/**
 * @file 部署脚本（注意：本脚本不支持在 windows 环境执行）
 * @description 将构建结果发布到指定账号下的指定 bucket
 */

const path = require('path')

const walk = require('walk')
const minimist = require('minimist')
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
    const key = `${config.keyPrefix}/${fileName}`
    return uploadFile(filePath, config.bucket, key, mac).then(
      () => console.log(`[UPLOADED] ${key} (${fileName})`)
    )
  }

  // 同时最多 50 个一起处理（注意最多可能有 50*3=150 个上传请求）
  return batch(deployFile, 50)
}

async function deploy(config) {
  const outputFiles = (await getAllFiles(config.outputPath))
    // 过滤掉 source map 防止线上能通过错误栈等方式定位到源码
    .filter(fileName => config.withSourceMap || !fileName.endsWith('.js.map'))
  const deployFiles = makeDeployer(config)
  await deployFiles(outputFiles)
  console.log(`[SUCCESS] Deploy succeeded: ${outputFiles.length} asset files.`)
}

const keyPrefix = '_next/static'
const outputPath = path.resolve(__dirname, '.next/static')

// 执行命令（顺序固定）：node deploy.js $AK $SK $BUCKET [--with-source-map]
const argv = minimist(process.argv.slice(2))
const [accessKey, secretKey, bucket] = argv._
const withSourceMap = !!argv['with-source-map']

deploy({ keyPrefix, outputPath, accessKey, secretKey, bucket, withSourceMap }).catch(e => {
  console.error(`[ERROR] Deploy failed: ${e}`)
  process.exit(1)
})
