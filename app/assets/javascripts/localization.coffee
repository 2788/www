# $(document).on 'turbolinks:load', ->
#   console.log(I18n.locale)
#   I18n.locale = $('body').data('locale')
$(document).ready ->
  console.log("<%= I18n.default_locale %>")
  I18n.default_locale = 'en'
  console.log(I18n.default_locale)
  $(".select-unit li").click (e) ->
    $v = $(this).attr("val")
    $current = $(".select-unit .current")
    $cv = if $current.text() == '中国站' then 'zh' else 'en'
    $url = window.location.href

    if $v == 'zh' && $v != $cv
      $current.text('中国站')
      I18n.default_locale = 'zh'
      window.open($url)
    else if $v == 'en' && $v != $cv
      $current.text('International-English')
      I18n.default_locale = 'en'
      window.open($url)
