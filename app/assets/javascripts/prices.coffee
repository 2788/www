$(document).ready ->
  #控制prices页面tab
  pre = 'kodo'
  $('#pricesTabs').change (e) ->
    val = $(this).val()
    $('#tab-prices-' + val).addClass('active')
    $('#tab-prices-' + pre).removeClass('active')
    pre = val

  #控制caculator的tab
  $('.caculatorTabs').bind 'click', (e) ->
    id = $(this).val()
    if $(this).attr('checked') == 'checked'
      #点击之前是checked,所以点击之后就是false 需要隐藏section
      $('#tab-caculator-'+id).removeClass('active')
      $(this).removeAttr 'checked'
    else
      $('#tab-caculator-'+id).addClass('active')
      $(this).attr 'checked', 'checked'

  #控制caculator页面滑条以及其val与num一致
  $('.input-range').each (index,item) ->
    $(item).next().attr 'value', $(item).val()
  $('.input-num').bind 'input', (e) ->
    val = $(this).val() | 0
    max = $(this).prev().attr 'max'
    $(this).val(val)
    $(this).attr 'max', max
    $(this).prev().val(val)
    $(this).prev().css 'background-size', val/max * 100 + '% 100%' ;

  #滑条变 连动 num
  change = (input) ->
    $(input).next().attr 'value', $(input).val()

  #调用range.coffee 使得拖动及时填充色
  $('.input-range').RangeSlider
    callback: change
