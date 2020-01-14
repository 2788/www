$(document).ready ->
  ## 控制总价格是否加上隐藏的模块价格
  prices =
    'kodo': true
    'lowKodo': true
    'fileKodo': true
    'fusion': true

  prices_area =
    kodo:
      'east': true
      'sourth': false
      'north': false
      'singapore': false
      'northAmerica': false
    lowKodo:
      'east-lowKodo': true
      'sourth-lowKodo': false
      'north-lowKodo': false
      'singapore-lowKodo': false
      'northAmerica-lowKodo': false
    fileKodo:
      'east-fileKodo': true
      'sourth-fileKodo': false
      'north-fileKodo': false
      'singapore-fileKodo': false
      'northAmerica-fileKodo': false
    fusion:
      'inland': true
      'ENA': false
      'Asia': false
      'India': false
      'SA': false
      'Oceania': false

  ## 获取dom节点
  kodoDOM = $('#kodo')
  numkodospaceDOM = $('#num-kodo-space')
  numkodoreadDOM = $('#num-kodo-read')
  numkodowriteDOM = $('#num-kodo-write')
  numkodoossDOM = $('#num-kodo-oss')
  numkodocdnBSDOM = $('#num-kodo-cdnBS')

  numlowkodospaceDOM = $('#num-lowKodo-space')
  numlowkodoAPIGETDOM = $('#num-lowKodo-API-GET')
  numlowkodoAPIPUTDOM = $('#num-lowKodo-API-PUT')
  numlowkodotypeDOM = $('#num-lowKodo-type')
  numlowkodoHTTPDOM = $('#num-lowKodo-HTTP')
  numlowkodoossDOM = $('#num-lowKodo-oss')
  numlowkodocdnBSDOM = $('#num-lowKodo-cdnBS')

  numfilekodospaceDOM = $('#num-fileKodo-space')
  numfilekodoAPIGETDOM = $('#num-fileKodo-API-GET')
  numfilekodoAPIPUTDOM = $('#num-fileKodo-API-PUT')
  numfilekodotypeDOM = $('#num-fileKodo-type')
  numfilekodoHTTPDOM = $('#num-fileKodo-HTTP')
  numfilekodoossDOM = $('#num-fileKodo-oss')
  numfilekodocdnBSDOM = $('#num-fileKodo-cdnBS')

  fusionDOM = $('#fusion')
  numfusionHTTPDOM = $('#num-fusion-HTTP')
  numfusionHTTPSDOM = $('#num-fusion-HTTPS')
  fusionoutlandDOM = $('#fusion-outland')
  rangeFusionHTTP = $('#range-fusion-HTTP')
  rangeFusionHTTPS = $('#range-fusion-HTTPS')
  fusionUnit = $('.fusion-unit')

  ## 控制prices页面tab
  if parseQueryString(location.search)['source']
    source = if ['kodo', 'fusion', 'dora', 'pili'].indexOf(parseQueryString(decodeURI(location.search))['source']) == -1 then 'kodo' else parseQueryString(location.search)['source'];
  pre = source || 'kodo';
  $('#tab-prices-' + pre).addClass('active')
  $('.tab-prices-' + pre).addClass('active')
  $('.nav-prices-tabs a').click (e) ->
    e.preventDefault()
    $(this).tab 'show'
    val = $(this).attr('key')
    if history && history.pushState
      history.pushState("", "", "/prices?source=" + val);
    pre = val

  #//////////////////////////////////////////////////
  ## 控制caculator的tab
  $('.caculatorTabs').bind 'click', (e) ->
    id = $(this).val()
    if $(this).attr('checked') == 'checked'
      #点击之前是checked,所以点击之后就是false 需要隐藏section
      $('#tab-caculator-' + id).removeClass('active')
      $('#tab-caculator-' + id).addClass('displayNone')
      $(this).removeAttr 'checked'
      $('#pricing-info-' + id).addClass('displayNone')
      caculatePrice(id, false)
    else
      $('#tab-caculator-' + id).removeClass('displayNone')
      $('#tab-caculator-' + id).addClass('active')
      $(this).attr 'checked', 'checked'
      $('#pricing-info-' + id).removeClass('displayNone')
      caculatePrice(id, true)

  #//////////////////////////////////////////////////////////////////////
  ## 控制标准存储 区域checkbox-->price
  ## 控制CDN checkbox
  $(".spacecheck").bind 'click', (e) ->
    id = $(this).val()
    area = $(this).attr('key')
    if $(this).attr('checked') == 'checked'
      #点击之前是checked,所以点击之后就是false 需要隐藏space
      $('.' + id).addClass('displayNone')
      caculateEveryPrice area, id, false
      $(this).removeAttr 'checked'
    else
      $('.' + id).removeClass('displayNone')
      caculateEveryPrice area, id, true
      $(this).attr 'checked', 'checked'

  #/////////////////////////////////////////////////////////////////////
  ## 公用方法
  # fix some block
  # setFxd = (json) ->
  #   defaultVar =
  #     'fxdClass':'fxd'
  #     'elem': 'elem'
  #     'prevPosition': 'relative'
  #   json = json or defaultVar
  #   fxd = json.fxdClass
  #   prevPosition = json.prevPosition
  #   myElem = json.elem
  #   myOffset = myElem.height()
  #   stickyTop = myElem.offset().top
  #   $(window).scroll ->
  #     # current distance top
  #     if $(window).width() < 768
  #       return
  #     scrollTop = $(window).scrollTop()
  #     # if we scroll more than the navigation, change its position to fixed and add class 'fxd', otherwise change it back to absolute and remove the class
  #     if scrollTop > stickyTop
  #       myElem.css({
  #         'position': 'fixed'}).addClass fxd
  #       # When an item is fixed, its removed from the flow so its height doesnt impact the other items on the page
  #     else
  #       myElem.css(
  #         'position': prevPosition
  #         ).removeClass fxd

  # search data,add to sum
  cacuSum = (num, obj) ->
    sum = 0
    prev = 0
    for i of obj
      i = +i
      item = obj[i]
      if num > item[0]
        sum += (num - item[0]) * (item[1] * 1000)
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
      return num * 1024
    else if units == 'PB'
      return num * 1024 * 1024
    else
      return num

  #set amount to price
  setPrice = (price_units, data_obj) ->
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
        sum += Number($('#' + i + '-price').text()) * 1000
    $('#sum-price').text(sum / 1000)

  #caculate every product sum
  caculateEveryPrice = (pro, key, bol) ->
    sum_kodo = 0
    sum_lowKodo = 0
    sum_fileKodo = 0
    sum_fusion = 0
    if arguments.length > 0
      prices_area[pro][key] = bol
    for i of prices_area.kodo
      if prices_area.kodo[i]
        #if this area is here add
        sum_kodo += setPrice($('#text-kodo-space-' + i).text(), kodoData[i]) + setPrice($('#text-kodo-read-' + i).text(), kodoData['reads']) + setPrice($('#text-kodo-write-' + i).text(), kodoData['writes']) + setPrice($('#text-kodo-oss-' + i).text(), kodoData['oss']) + setPrice($('#text-kodo-cdnBS-' + i).text(), kodoData['cdnBS'])

    for m of prices_area.lowKodo
      if prices_area.lowKodo[m]
        #if this area is here add
        sum_lowKodo += setPrice($('#text-space-' + m).text(), lowKodoData[m]) + unifyNum($('#text-API-GET-' + m).text()) * (lowKodoData.APIs['GET'] * 1000) + unifyNum($('#text-API-PUT-' + m).text()) * (lowKodoData.APIs['PUT'] * 1000) + unifyNum($('#text-type-' + m).text()) * (lowKodoData.types * 1000) + setPrice($('#text-HTTP-' + m).text(), lowKodoData.HTTPs) + setPrice($('#text-oss-' + m).text(), lowKodoData['oss']) + setPrice($('#text-cdnBS-' + m).text(), lowKodoData['cdnBS'])

    for p of prices_area.fileKodo
      if prices_area.fileKodo[p]
        #if this area is here add
        sum_fileKodo += setPrice($('#text-space-' + p).text(), fileKodoData[p]) + unifyNum($('#text-API-GET-' + p).text()) * (fileKodoData.APIs['GET'] * 1000) + unifyNum($('#text-API-PUT-' + p).text()) * (fileKodoData.APIs['PUT'][p] * 1000) + unifyNum($('#text-type-' + p).text()) * (fileKodoData.types * 1000) + setPrice($('#text-HTTP-' + p).text(), fileKodoData.HTTPs[p]) + setPrice($('#text-oss-' + p).text(), fileKodoData['oss']) + setPrice($('#text-cdnBS-' + p).text(), fileKodoData['cdnBS'])

    for f of prices_area.fusion
      if prices_area.fusion[f]
        sum_fusion += setPrice($('#text-fusion-HTTP-' + f).text(), fusionData.HTTPs[f]) + setPrice($('#text-fusion-HTTPS-' + f).text(), fusionData.HTTPSs[f])

    $('#kodo-price').text(sum_kodo / 1000)
    $('#lowKodo-price').text(sum_lowKodo / 1000)
    $('#fileKodo-price').text(sum_fileKodo / 1000)
    $('#fusion-price').text(sum_fusion / 1000)

    caculatePrice()

  #set Amount and then set prices
  setAmount = (key, val) ->
    $('#text-' + key).text(val)
    caculateEveryPrice()

  #set price info item show or hide
  setPriceInfoItemDisplay = (key, val) ->
    priceText = $('#text-' + key)
    priceItemContainer = priceText.parent('dd')

    if priceItemContainer.length == 0
      return

    if val > 0
      priceItemContainer.removeClass('displayNone')
    else
      priceItemContainer.addClass('displayNone')

  #////////////////////////////////////////////////////////////////
  ## the entrance of all events
  $('.input-num').bind 'input', ->
    key = $(this).attr('key')
    units = $(this).next().attr('val') || '万次'
    $(this).val( parseInt($(this).val()) | 0 )
    val = $(this).val()
    valWithUnits = val + units
    setAmount(key, valWithUnits)
    setPriceInfoItemDisplay(key, val)

  #////////////////////////////////////////////////////////////////
  ##units change
  $('.unit-select li').click (e) ->
    $p = $(this).parents('.unit-select')
    units = $(this).attr('val')
    input = $p.prev()
    val = +input.val()
    valWithUnits = val + units
    key = input.attr('key')
    $p.attr('val', units)
    $p.find('.unit-txt').text(units)
    setAmount(key, valWithUnits)

  #/////////////////////////////////////////////////////////////////
  ## 初始化 range num text一致
  $('.input-num').each (index, item) ->
    key = $(this).attr('key')
    units = $(this).next().attr('val') || '万次'
    val = +$(this).val()
    valWithUnits = val + units
    setAmount(key, valWithUnits)
    return
