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
  rangeFusionHTTP = $('#range-fusion-HTTP')
  rangeFusionHTTPS = $('#range-fusion-HTTPS')
  fusionUnit = $('.fusion-unit')

  #/////////////////////////////////////////////////
  ## 解析URL参数 返回对象obj
  parseQueryString = (url) ->
    obj = {}
    keyvalue = []
    key = ''
    value = ''
    paraString = url.substring(url.indexOf('?') + 1, url.length).split('&')
    for i of paraString
      keyvalue = paraString[i].split('=')
      key = keyvalue[0]
      value = keyvalue[1]
      obj[key] = value
    return obj
  ## 控制prices页面tab
  if parseQueryString(location.search)['source']
    source = if ['kodo','fusion','dora'].indexOf(parseQueryString(location.search)['source']) == -1 then 'kodo' else parseQueryString(location.search)['source'];
  pre = source || 'kodo';
  $('#tab-prices-' + pre).addClass('active')
  $('#pricesTabs').val(pre)
  $('#pricesTabs').change (e) ->
    val = $(this).val()
    $('#tab-prices-' + val).addClass('active')
    $('#tab-prices-' + pre).removeClass('active')
    pre = val

  #//////////////////////////////////////////////////
  ## 控制caculator的tab
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

  #/////////////////////////////////////////////////////////
  ## 控制fusion 第二个连动select
  $("#fusion").change (e) ->
    val = $(this).val()
    if val == "inland"
      fusionoutlandDOM.addClass("displayNone")
      rangeFusionHTTP.attr('max', 10000000)
      rangeFusionHTTPS.attr('max', 10000000)
    else if fusionoutlandDOM.hasClass("displayNone")
      fusionoutlandDOM.removeClass("displayNone")
      rangeFusionHTTP.attr('max', 100000000)
      rangeFusionHTTPS.attr('max', 100000000)
    renderRange('#range-fusion-HTTP', $('#range-fusion-HTTP').val())
    renderRange('#range-fusion-HTTPS', $('#range-fusion-HTTPS').val())
    setPrice()

  #//////////////////////////////////////////////////////////////////////
  ## 控制标准存储 区域select-->price
  ## 控制融合CDN select
  $("#kodo, #fusion-outland").change (e) ->
    setPrice()

  #/////////////////////////////////////////////////////////////////////
  ## 公用方法
  # fix some block
  setFxd = (json) ->
    defaultVar =
      'fxdClass':'fxd'
      'elem': 'elem'
      'prevPosition': 'relative'
    json = json or defaultVar
    fxd = json.fxdClass
    prevPosition = json.prevPosition
    myElem = json.elem
    myOffset = myElem.height()
    stickyTop = myElem.offset().top
    $(window).scroll ->
      # current distance top
      if $(window).width() < 768
        return
      scrollTop = $(window).scrollTop()
      # if we scroll more than the navigation, change its position to fixed and add class 'fxd', otherwise change it back to absolute and remove the class
      if scrollTop > stickyTop
        myElem.css({
          'position': 'fixed'}).addClass fxd
        # When an item is fixed, its removed from the flow so its height doesnt impact the other items on the page
      else
        myElem.css(
          'position': prevPosition
          ).removeClass fxd

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
        sum += Number($('#' + i + '-price').text())*1000
    $('#sum-price').text(sum/1000)


  # search data,add to sum
  cacuSum = (num, obj) ->
    sum = 0
    prev = 0
    for i of obj
      i = +i
      item = obj[i]
      if num > item[0]
        sum += (num - item[0])*(item[1]*1000)
        num = item[0]
    sum

  # caculate fusion outland
  cacuSumOutFusion = (num, region, obj) ->
    sum = 0
    prev = 0
    for j of obj
      if region == j
        sum = cacuSum num, obj[j]
        break
    sum

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
    kodoVal =  cacuSum(amountJSON.kodo.space, kodoData[amountJSON.kodo.area]) + cacuSum(amountJSON.kodo.reads, kodoData['reads']) + cacuSum(amountJSON.kodo.writes, kodoData['writes'])
    kodoVal = if isNaN(kodoVal) then 0 else kodoVal/1000
    $("#kodo-price").text(kodoVal)

    # lowKodo的价格计算
    lowKodoVal =  amountJSON.lowKodo.space*(lowKodoData.space*1000) + amountJSON.lowKodo.APIs*(lowKodoData.APIs*1000) + amountJSON.lowKodo.types*(lowKodoData.types*1000) + cacuSum(amountJSON.lowKodo.HTTPs, lowKodoData['HTTPs'])
    lowKodoVal = if isNaN(lowKodoVal) then 0 else lowKodoVal/1000
    $("#lowKodo-price").text(lowKodoVal)

    # fusion的价格计算
    if amountJSON.fusion.area.land == 'inland'
      fusionVal = cacuSum(amountJSON.fusion.HTTPs, fusionData.inland.HTTPs) + cacuSum(amountJSON.fusion.HTTPSs, fusionData.inland.HTTPSs)
    else
      fusionVal = cacuSumOutFusion(amountJSON.fusion.HTTPs, amountJSON.fusion.area.region, fusionData.outland.HTTPs) + cacuSumOutFusion(amountJSON.fusion.HTTPSs, amountJSON.fusion.area.region, fusionData.outland.HTTPSs)
    fusionVal = if isNaN(fusionVal) then 0 else fusionVal/1000
    $("#fusion-price").text(fusionVal)

    # 总价的计算
    caculatePrice()

  #set Amount and then set prices
  setAmount = (key, val) ->
    $('#range-' + key).val(val)
    renderRange('#range-' + key, val)
    $('#num-' + key).val(val)
    $('#text-' + key).text(val)
    setPrice()

  # 容错
  if $('#feature-price-nav').length != 0 && $(window).width() > 768
    setFxd
      'elem': $('#feature-price-nav')
      'fxdClass': 'fix-top'
      'prevPosition': 'relative'
  if $('#pricing-info').length != 0 && $(window).width() > 768
    setFxd
      'elem': $('#pricing-info')
      'fxdClass': 'fixed-right'
      'prevPosition': 'absolute'

  #////////////////////////////////////////////////////////////////
  ## the entrance of all events
  $('.amount-input').bind 'input', ->
    max = Number($(this).attr('max'))
    val = Number($(this).val())
    if val > 0
      $(this).removeClass("init")
      $(this).addClass("sliding")
    else
      $(this).removeClass("sliding")
      $(this).addClass("init")
    if val > max
      $(this).val(max)
    key = $(this).attr('key')
    setAmount(key, +$(this).val())

  #/////////////////////////////////////////////////////////////////
  ## 初始化 range num text一致
  $('.input-range').each (index, item) ->
    key = $(this).attr('key')
    setAmount(key, $(this).val())
    return
