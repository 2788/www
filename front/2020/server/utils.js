/**
 * @file helper
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

const path = require('path')

const walk = require('walk')

exports.getAllFiles = function getAllFiles(baseDir) {
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

exports.cleanPathTrailingSlash = function cleanPathTrailingSlash(path) {
  return /^\/*$/.test(path) ? '/' : path.replace(/\/+$/, '')
}
