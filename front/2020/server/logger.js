/**
 * @file 日志
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

// TODO: 非常粗糙的实现，后续需要引库、重整实现、调整格式等等

function getLogs(level, logs) {
  const time = new Date(Date.now() + (8 * 60 * 60 * 1e3)).toISOString().replace('Z', '+08:00')
  const timeStr = `[${time}]`
  const levelStr = `[${level}]`.padEnd(7, ' ')
  return [timeStr, levelStr, ...logs]
}

exports.log = function log(...args) {
  console.log(...getLogs('LOG', args))
}

exports.info = function log(...args) {
  console.info(...getLogs('INFO', args))
}

exports.warn = function log(...args) {
  console.warn(...getLogs('WARN', args))
}

exports.error = function log(...args) {
  console.error(...getLogs('ERROR', args))
}

exports.trace = function log(...args) {
  console.trace(...getLogs('TRACE', args))
}
