$(document).ready ->
  ## 控制总价格是否加上隐藏的模块价格
  prices =
    kodo: true
    lowKodo: true
    fusion: true

  prices_area =
    kodo:
      east: true
      sourth: false
      north: false
      northAmerica: false
    fusion:
      inland: true
      ENA: false
      Asia: false
      India: false
      SA: false
      Oceania: false

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
  $('.tab-prices-' + pre).addClass('active')
  $('.nav-prices a').click (e) ->
    e.preventDefault()
    $(this).tab 'show'
    val = $(this).attr('key')
    if history && history.pushState
      history.pushState("","","/prices?source="+val);
    pre = val

  #//////////////////////////////////////////////////
  ## 控制caculator的tab
  $('.caculatorTabs').bind 'click', (e) ->
    id = $(this).val()
    if $(this).attr('checked') == 'checked'
      #点击之前是checked,所以点击之后就是false 需要隐藏section
      $('#tab-caculator-'+id).removeClass('active')
      $('#tab-caculator-'+id).addClass('displayNone')
      $(this).removeAttr 'checked'
      $('#pricing-info-'+id).addClass('displayNone')
      caculatePrice(id, false)
    else
      $('#tab-caculator-'+id).removeClass('displayNone')
      $('#tab-caculator-'+id).addClass('active')
      $(this).attr 'checked', 'checked'
      $('#pricing-info-'+id).removeClass('displayNone')
      caculatePrice(id, true)

  #//////////////////////////////////////////////////////////////////////
  ## 控制标准存储 区域checkbox-->price
  ## 控制融合CDN checkbox
  $(".spacecheck").bind 'click', (e) ->
    id = $(this).val()
    area = $(this).attr('key')
    if $(this).attr('checked') == 'checked'
      #点击之前是checked,所以点击之后就是false 需要隐藏space
      $('.'+id).addClass('displayNone')
      caculateEveryPrice area, id, false
      $(this).removeAttr 'checked'
    else
      $('.'+id).removeClass('displayNone')
      caculateEveryPrice area, id, true
      $(this).attr 'checked', 'checked'


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
  #unify num
  unifyNum = (price_units) ->
    len = price_units.length
    num = +price_units.substring(0, len-2)
    units = price_units.substr(len-2, 2)
    if num == 0
      return 0
    else if units == 'GB'
      return num
    else if units == 'TB'
      return num*1024
    else if units == 'PB'
      return num*1024*1024
    else
      return num

  #set amount to price
  setPrice = (price_units,data_obj) ->
    num = unifyNum(price_units)
    sum = cacuSum(num, data_obj)
    return sum
  #caculate all sum
  caculatePrice = (key, bol) ->
    sum = 0
    if arguments.length > 0
      prices[key] = bol
    for i of prices
      if prices[i]
        #如果存在该板块 总价加进去
        sum += Number($('#' + i + '-price').text())*1000
    $('#sum-price').text(sum/1000)

  #caculate every product sum
  caculateEveryPrice = (pro,key,bol) ->
    sum_kodo = 0
    sum_lowKodo = 0
    sum_fusion = 0
    if arguments.length > 0
      prices_area[pro][key] = bol
    for i of prices_area.kodo
      if prices_area.kodo[i]
        #if this area is here add
        sum_kodo += setPrice($('#text-kodo-space-'+i).text(), kodoData[i]) + setPrice($('#text-kodo-read-'+i).text(), kodoData['reads'])+ setPrice($('#text-kodo-write-'+i).text(), kodoData['writes'])
    for f of prices_area.fusion
      if prices_area.fusion[f]
        sum_fusion += setPrice($('#text-fusion-HTTP-'+f).text(),fusionData.HTTPs[f]) + setPrice($('#text-fusion-HTTPS-'+f).text(),fusionData.HTTPSs[f])
    sum_lowKodo = unifyNum($('#text-lowKodo-space').text())*(lowKodoData.space*1000) + unifyNum($('#text-lowKodo-API').text())*(lowKodoData.APIs*1000) + unifyNum($('#text-lowKodo-type').text())*(lowKodoData.types*1000) + setPrice($('#text-lowKodo-HTTP').text(), lowKodoData.HTTPs)
    $('#kodo-price').text(sum_kodo/1000)
    $('#lowKodo-price').text(sum_lowKodo/1000)
    $('#fusion-price').text(sum_fusion/1000)

    caculatePrice()

  #set Amount and then set prices
  setAmount = (key, val) ->
    $('#text-' + key).text(val)
    caculateEveryPrice()

  # 容错
  if $('#feature-price-nav').length != 0 && $(window).width() > 768
    setFxd
      'elem': $('#feature-price-nav')
      'fxdClass': 'fix-top'
      'prevPosition': 'relative'

  #////////////////////////////////////////////////////////////////
  ## the entrance of all events
  $('.input-num').bind 'input', ->
    key = $(this).attr('key')
    units = $(this).next().val()|| '万次'
    $(this).val( parseInt($(this).val()) )
    val = +$(this).val() + units
    setAmount(key, val)

  #////////////////////////////////////////////////////////////////
  ##units change
  $("select").change (e) ->
    units = $(this).val()
    val = +$(this).prev().val() + units
    key = $(this).prev().attr('key')
    setAmount(key, val)

  #/////////////////////////////////////////////////////////////////
  ## 初始化 range num text一致
  $('.input-num').each (index, item) ->
    key = $(this).attr('key')
    units = $(this).next().val() || '万次'
    val = +$(this).val() + units
    setAmount(key, val)
    return