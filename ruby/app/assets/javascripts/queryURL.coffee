# 解析URL参数 返回对象obj
window.parseQueryString = (url) ->
  obj = {}
  keyvalue = []
  key = ''
  value = ''

  queryArray = url.substring(decodeURI(url).indexOf('?') + 1).split('&')

  for i of queryArray
    keyvalue = queryArray[i].split('=')
    key = decodeURI(keyvalue[0])
    value = decodeURI(keyvalue[1])
    obj[key] = value
  return obj
