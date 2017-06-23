$(document).ready ->
  ## 控制总价格是否加上隐藏的模块价格
  prices =
    kodo: true
    lowKodo: true
    fusion: true

  ## 获取dom节点
  kodoDOM = $('#kodo')
  numkodospaceDOM = $('#num-kodo-space')
  numkodoreadDOM = $('#num-kodo-read')
  numkodowriteDOM = $('#num-kodo-write')

  numlowkodospaceDOM = $('#num-lowKodo-space')
  numlowkodoAPIDOM = $('#num-lowKodo-API')
  numlowkodotypeDOM = $('#num-lowKodo-type')
  numlowkodoHTTPDOM = $('#num-lowKodo-HTTP')

  fusionDOM = $('#fusion')
  numfusionHTTPDOM = $('#num-fusion-HTTP')
  numfusionHTTPSDOM = $('#num-fusion-HTTPS')
  fusionoutlandDOM = $('#fusion-outland')

  ##
  ## 控制prices页面tab
  ##
  pre = 'kodo'
  $('#pricesTabs').change (e) ->
    val = $(this).val()
    $('#tab-prices-' + val).addClass('active')
    $('#tab-prices-' + pre).removeClass('active')
    pre = val

  ##
  ## 控制caculator的tab
  ##
  $('.caculatorTabs').bind 'click', (e) ->
    id = $(this).val()
    if $(this).attr('checked') == 'checked'
      #点击之前是checked,所以点击之后就是false 需要隐藏section
      $('#tab-caculator-'+id).removeClass('active')
      $(this).removeAttr 'checked'
      $('#pricing-info-'+id).addClass('displayNone')
      caculatePrice(id, false)
    else
      $('#tab-caculator-'+id).addClass('active')
      $(this).attr 'checked', 'checked'
      $('#pricing-info-'+id).removeClass('displayNone')
      caculatePrice(id, true)

  ##
  ## 控制fusion 第二个连动select
  ##
  $("#fusion").change (e) ->
    val = $(this).val()
    if val == "inland"
      $("#fusion-outland").addClass("displayNone")
    else if $("#fusion-outland").hasClass("displayNone")
      $("#fusion-outland").removeClass("displayNone")

  ##
  ## 公用方法
  ##
  #caculate all prices and set
  setPrice = () ->
    # 获取数量
    amountJSON =
      kodo:
        area: kodoDOM.val()
        space: numkodospaceDOM.val()
        reads: numkodoreadDOM.val()
        writes: numkodowriteDOM.val()
      lowKodo:
        space: numlowkodospaceDOM.val()
        APIs: numlowkodoAPIDOM.val()
        types: numlowkodotypeDOM.val()
        HTTPs: numlowkodoHTTPDOM.val()
      fusion:
        area:
          land: fusionDOM.val()
          region: null
        HTTPs: numfusionHTTPDOM.val()
        HTTPSs: numfusionHTTPSDOM.val()
    if amountJSON.fusion.area.land == 'outland'
      amountJSON.fusion.area.region = fusionoutlandDOM.val()

    # kodo的价格计算
    kodoVal = 1986
    $("#kodo-price").text(kodoVal)
    # lowKodo的价格计算
    lowKodoVal = 1986
    $("#lowKodo-price").text(lowKodoVal)
    # fusion的价格计算
    fusionVal = 1986
    $("#fusion-price").text(fusionVal)

    # 总价的计算
    caculatePrice()

  #render range
  renderRange = (key, val) ->
    #range条填充颜色
    max = $(key).attr('max')
    $(key).css 'background-size', val / max * 100 + '% 100%'

  #caculate all sum
  caculatePrice = (key, bol) ->
    sum = 0;
    if arguments.length > 0
      prices[key] = bol
    for i of prices
      if prices[i]
        #如果存在该板块 总价加进去
        sum += Number($('#' + i + '-price').text())
    $('#sum-price').text(sum)

  #set Amount and then set prices
  setAmount = (key, val) ->
    $('#range-' + key).val(val)
    renderRange('#range-' + key, val)
    $('#num-' + key).val(val)
    $('#text-' + key).text(val)
    setPrice()

  ##
  ## the entrance of all events
  ##
  $('.amount-input').bind 'input', ->
    key = $(this).attr('key')
    setAmount(key, $(this).val())

  ##
  ## 初始化 range num text一致
  ##
  $('.input-range').each (index,item) ->
    key = $(this).attr('key')
    setAmount(key, $(this).val())
