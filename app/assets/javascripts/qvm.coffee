# qvm 产品涉及页面上报数据
$(document).ready ->

  QVM_RELATED_PATHS = ["/products/qvm", "/events/qvm0rmb", "/events/qvm1rmb", "/events/double11"]

  queries = if location.search then parseQueryString(location.search) else {}
  hash = location.hash
  path = location.origin + location.pathname

  # 上报用户行为
  reportUserQvmActivity = (actionType, data) ->
    $.ajax
      method: 'POST',
      url: '/qvm/user/action',
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify({
        action_type: actionType,
        path: path,
        hash: hash,
        query_data: queries,
        data: data,
      })

  reportUserQvmActivity("view") if (QVM_RELATED_PATHS.indexOf(location.pathname) != -1) 

  
