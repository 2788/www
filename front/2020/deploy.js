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
        resolve(ret)
      })
    }
  )
}

async function deploy(config) {
  const mac = new qiniu.auth.digest.Mac(config.accessKey, config.secretKey)
  const outputFiles = await getAllFiles(config.outputPath)

  try {
    await Promise.all(
      outputFiles.map(name => {
        const filePath = path.resolve(config.outputPath, name)

        return uploadFile(
          filePath,
          config.bucket,
          name,
          mac
        ).then(
          (res) => console.log(`[UPLOAD] ${filePath} -> ${name}`)
        )
      })
    )
  } catch (e) {
    console.error(`[ERROR] Deploy failed: ${e}`)
  }
}

deploy({
  outputPath: path.resolve(__dirname, 'out'),
  // node deploy.js $AK $SK $BUCKET
  accessKey: process.argv[2],
  secretKey: process.argv[3],
  bucket: process.argv[4]
})
