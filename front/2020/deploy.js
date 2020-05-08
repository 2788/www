/**
 * @file 部署脚本
 * @description 将构建结果发布到指定账号下的指定 bucket
 */

const path = require('path')
const walk = require('walk')
const qiniu = require('qiniu')

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

const indexFilePattern = /(^|\/)index\.html$/

async function deploy(config) {
  const mac = new qiniu.auth.digest.Mac(config.accessKey, config.secretKey)
  const outputFiles = await getAllFiles(config.outputPath)

  return Promise.all(outputFiles.map(fileName => {
    const filePath = path.resolve(config.outputPath, fileName)

    // 对于文件 `xxx/index.html`，额外以 `xxx` & `xxx/` 作为 key 上传
    // 以保证通过 URL `/xxx` 或 `/xxx/` 都能访问到该内容
    // 注意虽然 Kodo 支持设置“默认首页”，但是如果 bucket 同时开启了镜像回源的话
    // 对于 `/xxx/` 会优先去镜像回源，而不是使用 `/xxx/index.html`
    const keys = [fileName]
    if (indexFilePattern.test(fileName)) {
      keys.push(fileName.replace(indexFilePattern, ''))
      keys.push(fileName.replace(indexFilePattern, '/'))
    }

    return Promise.all(keys.map(
      key => uploadFile(filePath, config.bucket, key, mac).then(
        () => console.log(`[UPLOADED] ${key} (${fileName})`)
      )
    ))
  }))
}

// next export 产物所在目录
const outputPath = path.resolve(__dirname, 'out')

// 执行命令：node deploy.js $AK $SK $BUCKET
const [accessKey, secretKey, bucket] = process.argv.slice(2)

deploy({ outputPath, accessKey, secretKey, bucket }).catch(e => {
  console.error(`[ERROR] Deploy failed: ${e}`)
  process.exit(1)
})
