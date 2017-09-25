$(document).ready ->
  search = parseQueryString(location.search)['q'] || ''
  $('#blog-search-input').val(search)