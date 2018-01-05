$(document).ready ->
  $current = $(".select-unit .current")
  $host = window.location.pathname
  $arr = $host.split("/")
  $locale = $arr[1]
  console.log $arr[1]
  if $locale == "en" then $current.text('International-English') else $current.text('中国站')
  $(".select-unit li").click (e) ->
    $v = $(this).attr("val")
    $cv = if $current.text() == '中国站' then 'zh' else 'en'
    $url = window.location.origin

    if $v == 'zh' && $v != $cv
      $current.text('中国站')
      $url = $url
    else if $v == 'en' && $v != $cv
      $current.text('International-English')
      $url = $url + '/en'
    console.log($url.toString())
    window.location = $url.toString()
