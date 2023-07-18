/**
 * @file 部署脚本（注意：本脚本不支持在 windows 环境执行）
 * @description 将构建结果发布到 qstack 指定 bucket
 */

const path = require('path')
const fs = require('fs')
const childProcess = require('child_process')
const crypto = require('crypto')

const minimist = require('minimist')
const qiniu = require('qiniu')

function getPromise() {
  let resolve, reject
  const promise = new Promise((rs, rj) => {
    resolve = rs
    reject = rj
  })
  return {
    promise, resolve, reject
  }
}

async function writeMd5File(config) {
  const filePath = path.resolve(config.outputPath, config.fileName)
  const md5FileName = `${config.fileName}.md5`
  const md5FilePath = path.resolve(config.outputPath, md5FileName)
  const md5 = crypto.createHash('md5')
  const fileInput = fs.createReadStream(filePath)
  const { promise, resolve, reject } = getPromise()
  fileInput.on('readable', () => {
    const fileData = fileInput.read()
    if (fileData) {
      md5.update(fileData)
    } else {
      const md5Result = md5.digest('hex')
      // childProcess.execSync(`md5 ${config.fileName}`, { stdio: 'inherit' })
      console.log(`MD5 (${config.fileName}) = ${md5Result}`)
      fs.writeFileSync(md5FilePath, md5Result)
      resolve({
        fileName: md5FileName,
        hash: md5Result
      })
    }
  }).on('error', err => {
    reject(err)
  })
  return promise
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

function deployFile(config) {
  const mac = new qiniu.auth.digest.Mac(config.accessKey, config.secretKey)
  const filePath = path.resolve(config.outputPath, config.fileName)
  const key = `${config.keyPrefix}/${config.deployId}/${config.fileName}`
  return uploadFile(filePath, config.bucket, key, mac).then(
    () => console.log(`[UPLOADED] ${key} (${config.fileName})`)
  )
}

async function deploy(config) {
  const { fileName: md5FileName } = await writeMd5File(config)
  console.log('[SUCCESS] Generate md5 of tar succeeded.')

  await deployFile(config)
  console.log('[SUCCESS] Deploy qstack tar succeeded.')

  await deployFile({ ...config, fileName: md5FileName })
  console.log('[SUCCESS] Deploy qstack tar.md5 succeeded.')
}

const keyPrefix = '/www/2020'
const outputPath = path.resolve(__dirname)
const bucket = 'qstack-releases'

// 执行命令（顺序固定）：node deploy-qstack.js $AK $SK $FILE_NAME $SPOCK_DIST_DIR
const argv = minimist(process.argv.slice(2))
const [accessKey, secretKey, fileName, spockDistDir] = argv._
const deployId = spockDistDir.split('/').slice(-1)[0]

deploy({ keyPrefix, outputPath, accessKey, secretKey, bucket, fileName, deployId }).catch(e => {
  console.error(`[ERROR] Deploy failed: ${e}`)
  process.exit(1)
})
