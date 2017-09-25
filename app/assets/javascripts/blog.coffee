$(document).ready ->
  # /////////////////////////////////////////////////////
  # blog-sidebar-searchform <--> URL-param-q
  search = parseQueryString(location.search)['q'] || ''
  # update search-value
  $('#blog-search-input').val(search)

  #//////////////////////////////////////////////////////
  # blog-sidebar-list.active <--> url-param-category
  # get URL
  # get category
  curlink = location.href.split('/')
  catnum = +curlink.slice(curlink.indexOf("category")+1 , curlink.indexOf("category")+2)[0]
  # rm active
  $('.list-blog a.active').removeClass('active')
  # add active
  curli = $($('.list-blog li')[catnum])
  curli.addClass('active')
  # update search-value
  $('#blog-search-input').val(curli.find('a').text())