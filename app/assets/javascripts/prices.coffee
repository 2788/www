$(document).ready ->
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
        area: $('#kodo').val()
        space: $('#num-kodo-space').val()
        reads: $('#num-kodo-read').val()
        writes: $('#num-kodo-write').val()
      lowKodo:
        space: $('#num-lowKodo-space').val()
        APIs: $('#num-lowKodo-API').val()
        types: $('#num-lowKodo-type').val()
        HTTPs: $('#num-lowKodo-HTTP').val()
      fusion:
        area:
          land: $('#fusion').val()
          region: null
        HTTPs: $('#num-fusion-HTTP').val()
        HTTPSs: $('#num-fusion-HTTPS').val()
    if amountJSON.fusion.area.land == 'outland'
      amountJSON.fusion.area.region = $('#fusion-outland').val()
    # 数据表
    kodoData =
      'east':
        '0': 0
        '10': 0.148
        '1024': 0.145
        '204800': 0.142
        '5242880': 0.139
      'sourth':
        '0': 0
        '10': 0.134
        '1024': 0.131
        '204800': 0.128
        '5242880': 0.125
      'north':
        '0': 0
        '10': 0.148
        '1024': 0.145
        '204800': 0.142
        '5242880': 0.139
      'northAmerica':
        '0': 0
        '10': 0.165
        '1024': 0.162
        '204800': 0.159
        '5242880': 0.156
      'writes':
        '0': 0
        '10': 0.01
      'reads':
        '0': 0
        '100': 0.01
    lowKodoData =
      'space': 0.06
      'APIs': 0.1
      'types': 0.1
      'HTTPs':
        '0': 0
        '10': 0.29
        '102400': 0.26
    fusionData =
      'inland':
        'HTTPs':
          '0': 0
          '10': 0.29
          '102400': 0.26
        'HTTPSs':
          '0': 0.36
          '10240': 0.32
          '102400': 0.26
      'outland':
        'HTTPs':
          '0':
            'ENA': 0.39
            'Asia': 0.57
            'India': 0.87
            'SA': 0.87
            'Oceania': 1.08
          '10':
            'ENA': 0.34
            'Asia': 0.50
            'India': 0.76
            'SA': 0.76
            'Oceania': 0.94
          '102400':
            'ENA': 0.30
            'Asia': 0.44
            'India': 0.66
            'SA': 0.66
            'Oceania': 0.82
          '1048576':
            'ENA': 0.26
            'Asia': 0.38
            'India': 0.57
            'SA': 0.57
            'Oceania': 0.71
          '10PB以上': '联系我们'
        'HTTPSs':
          '0':
            'ENA': 0.46
            'Asia': 0.68
            'India': 1.04
            'SA': 1.04
            'Oceania': 1.29
          '10':
            'ENA': 0.4
            'Asia': 0.60
            'India': 0.91
            'SA': 0.91
            'Oceania': 1.12
          '102400':
            'ENA': 0.36
            'Asia': 0.52
            'India': 0.79
            'SA': 0.79
            'Oceania': 0.98
          '1048576':
            'ENA': 0.31
            'Asia': 0.45
            'India': 0.68
            'SA': 0.68
            'Oceania': 0.85
          '10PB以上': '联系我们'
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

  ## 控制总价格是否加上隐藏的模块价格
  prices =
    kodo: true
    lowKodo: true
    fusion: true

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
