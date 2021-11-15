/**
 * @file          produce
 * @description   构建前执行的脚本文件
 * 专门用于预先生成官网所需的初始数据 json 文件
 * 仅在 pwd 为 2020/ 目录 才能正常运行并产生正确的输出
 * @author        renpanpan
 */

const { resolve } = require('path')
require('next')
const { loadEnvConfig } = require('next/dist/lib/load-env-config')
const fs = require('fs')

const dir = resolve('.')
loadEnvConfig(dir, false)

const encoding = 'utf-8'
const jsonFilePath = __dirname + '/data.json'

async function main(){
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_HOST + '/api/proxy/www-admin/api/mongo/www-global-banner', {
      headers: {
        referer: process.env.NEXT_PUBLIC_HOST
      }
    }
  )
  const bannersRes = await res.json()
  const fileHandle = await fs.promises.open(jsonFilePath, 'w+')
  const data = await fileHandle.readFile(encoding)
  const preJsonData = data ? JSON.parse(data) : {}
  const newJsonData = JSON.stringify({
    ...preJsonData,
    globalBannersRes: bannersRes
  })
  await fileHandle.writeFile(newJsonData, encoding)
}
main()