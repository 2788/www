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
      $('#pricing-info-'+id).addClass('displayNone')
      caculatePrice(id, false)
    else
      $('#tab-caculator-'+id).addClass('active')
      $(this).attr 'checked', 'checked'
      $('#pricing-info-'+id).removeClass('displayNone')
      caculatePrice(id, true)

  ##
  # 公用方法
  #add = () ->
  setPrice = (amountJSON) ->
    # 数据表
    kodoData =
      '华东':
        '0': 0
        '10': 0.148
        '1024': 0.145
        '204800': 0.142
        '5242880': 0.139
      '华南':
        '0': 0
        '10': 0.134
        '1024': 0.131
        '204800': 0.128
        '5242880': 0.125
      '华北':
        '0': 0
        '10': 0.148
        '1024': 0.145
        '204800': 0.142
        '5242880': 0.139
      '北美':
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
      '国内':
        'HTTPs':
          '0': 0
          '10': 0.29
          '102400': 0.26
        'HTTPSs':
          '0': 0.36
          '10240': 0.32
          '102400': 0.26
      '海外':
        'HTTPs':
          '0':
            '欧洲/北美洲': 0.39
            '亚洲（除中国/印度/东南亚）': 0.57
            '亚洲（东南亚/印度）': 0.87
            '南美洲': 0.87
            '大洋洲与其他': 1.08
          '10':
            '欧洲/北美洲': 0.34
            '亚洲（除中国/印度/东南亚）': 0.50
            '亚洲（东南亚/印度）': 0.76
            '南美洲': 0.76
            '大洋洲与其他': 0.94
          '102400':
            '欧洲/北美洲': 0.30
            '亚洲（除中国/印度/东南亚）': 0.44
            '亚洲（东南亚/印度）': 0.66
            '南美洲': 0.66
            '大洋洲与其他': 0.82
          '1048576':
            '欧洲/北美洲': 0.26
            '亚洲（除中国/印度/东南亚）': 0.38
            '亚洲（东南亚/印度）': 0.57
            '南美洲': 0.57
            '大洋洲与其他': 0.71
          '10PB以上': '联系我们'
        'HTTPSs':
          '0':
            '欧洲/北美洲': 0.46
            '亚洲（除中国/印度/东南亚）': 0.68
            '亚洲（东南亚/印度）': 1.04
            '南美洲': 1.04
            '大洋洲与其他': 1.29
          '10':
            '欧洲/北美洲': 0.4
            '亚洲（除中国/印度/东南亚）': 0.60
            '亚洲（东南亚/印度）': 0.91
            '南美洲': 0.91
            '大洋洲与其他': 1.12
          '102400':
            '欧洲/北美洲': 0.36
            '亚洲（除中国/印度/东南亚）': 0.52
            '亚洲（东南亚/印度）': 0.79
            '南美洲': 0.79
            '大洋洲与其他': 0.98
          '1048576':
            '欧洲/北美洲': 0.31
            '亚洲（除中国/印度/东南亚）': 0.45
            '亚洲（东南亚/印度）': 0.68
            '南美洲': 0.68
            '大洋洲与其他': 0.85
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
      prices.key = bol
    for i of prices
      if prices[i]
        #如果存在该板块 总价加进去
        sum += Number($('#' + i + '-price').text())
    $('#sum-price').text(sum)

  #set all Amount same,caculate price and sum
  setAmount = (key, val) ->
    $('#range-' + key).val(val)
    renderRange('#range-' + key, val)
    $('#num-' + key).val(val)
    $('#text-' + key).text(val)
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
    if amountJSON.fusion.area.land == '海外'
      amountJSON.fusion.area.region = $('#fusion-outland').val()
    setPrice(amountJSON)
    caculatePrice()

  ##
  ## the entrance of all events
  $('.amount-input').bind 'input', ->
    key = $(this).attr('key')
    setAmount(key, $(this).val())

  ## 初始化 range num text一致
  $('.input-range').each (index,item) ->
    key = $(this).attr('key')
    setAmount(key, $(this).val())
