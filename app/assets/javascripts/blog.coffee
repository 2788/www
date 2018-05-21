$(document).ready ->
  $('pre code').each (i, block) ->
    hljs.highlightBlock(block)
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
  catnum = +curlink.slice(curlink.indexOf("category")+1 , curlink.indexOf("category")+2)[0] || 0
  # rm active
  $('.list-blog li.active').removeClass('active')
  # add active
  curli = $($('.list-blog li')[catnum])
  curli.addClass('active')
  # update search-value
  $('#blog-search-input').val(curli.find('a').text()||search)

  width = $('.blog-content .blog-imgBox').width()
  $('.blog-content .blog-imgBox').css({'height': width * 0.6})