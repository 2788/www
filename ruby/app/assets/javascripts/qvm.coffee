# qvm 产品涉及页面上报数据
$(document).ready ->
  $productsQVMPage = $('.products-page-qvm')

  QVM_RELATED_PATHS = ['/products/qvm', '/events/qvm0rmb', '/events/qvm1rmb', '/events/double11']

  queries = if location.search then parseQueryString(location.search) else {}
  hash = location.hash
  path = location.origin + location.pathname

  # 上报用户行为
  reportUserQvmActivity = (actionType, data) ->
    $.ajax
      method: 'POST',
      url: '/qvm/user/action',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({
        action_type: actionType,
        path: path,
        hash: hash,
        query_data: queries,
        data: data,
      })

  reportUserQvmActivity('view') if (QVM_RELATED_PATHS.indexOf(location.pathname) != -1)

  if $productsQVMPage.length > 0
    # 解析到 url 里面的 hash 值
    urlHash = window.location.hash
    if urlHash != ''
      targetClass = urlHash.replace '#', ''
      targetDom = $productsQVMPage.find('.' + targetClass)
      if targetDom.length > 0
        offsetTop = targetDom[0].offsetTop
        $('html, body').animate({scrollTop: offsetTop - 100 + 'px'}, 500)
