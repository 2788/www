/**
 * @file server side global data
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

const globalKey = '__qiniu_www_global_ssr_data__'

exports.init = function init() {
  global[globalKey] = {}
}

exports.register = function register(key, value) {
  global[globalKey][key] = value
}

exports.get = function get(key) {
  return global[globalKey][key]
}
