$(document).ready ->
  $qvmSumSalePage = $('.events-page.events-page-qvmsumsale')
  $hotPartC5Button = $qvmSumSalePage.find('.features-qvmsumsale-hot .col-hot .col-right .model-C5')
  $hotPartT5Button = $qvmSumSalePage.find('.features-qvmsumsale-hot .col-hot .col-right .model-T5')
  $serverPartDropdown = $qvmSumSalePage.find('.features-qvmsumsale-server .content-dropdown .qvmsumsale-server-dropdown')
  $serverPartBuyButtons = $qvmSumSalePage.find('.features-qvmsumsale-server .container .row .btn-qvmsumsale')
  $smsPartBuyButtons = $qvmSumSalePage.find('.features-qvmsumsale-sms .container .row .btn-qvmsumsale')
  $hotPartStartTimeSpan = $qvmSumSalePage.find('.qvmsumsale-start-time')

  # qvmsumsale 活动结束时间 2019 年 7 月 31 号 0 点
  qvmSumSaleEndTime = new Date(2019, 6, 31, 0, 0, 0).getTime()

  # 判断 qvmsumsale 活动是否过期
  isQvmSumSaleExpired = () ->
    isExpired = false
    currentTime = new Date().getTime()
    if currentTime >= qvmSumSaleEndTime
      isExpired = true
    return isExpired

  # 热卖机型无限购部分下拉菜单事件
  if $qvmSumSalePage.length > 0 && $serverPartDropdown.length > 0
    $serverPartDropdown.on 'change', (e) ->
      $container = $(this).parents('.content-container')
      $sections = $container.find('.content-section')
      for section in $sections
        if $(section).hasClass 'active'
          $(section).removeClass 'active'
          $(section).css 'display', 'none'
      $container.find('#' + e.target.value).fadeIn 300, () ->
        $(this).addClass 'active'

  # 爆款限时抢部分是否开始
  isHotRobStart = (callback) ->
    uuid = generateUUID()
    timestamp = new Date().getTime()
    $.ajax
      method: 'GET',
      url: '/events/qvmsumsale/is_start?u=' + uuid + '&t=' + timestamp,
      success: (res) ->
        if res && res.is_start
          # 已开始
          callback true, res.start_time_text
        else
          # 未开始
          callback false, res.start_time_text
      error: (err) ->
        # error
        callback false, "10 点"

  updateHotPartBuyBtnsStatus = (isStart, startTimeText) ->
    if !isStart
      # 没到开抢时间
      if $hotPartC5Button.length > 0
        $hotPartC5Button.html startTimeText + "启动"
        $hotPartC5Button.attr 'href', ''
      if $hotPartT5Button.length > 0
        $hotPartT5Button.html startTimeText + "启动"
        $hotPartT5Button.attr 'href', ''
    else
      # 到开抢时间
      if $hotPartC5Button.length > 0
        $hotPartC5Button.removeClass 'disabled'
      if $hotPartT5Button.length > 0
        $hotPartT5Button.removeClass 'disabled'
    # 更新其他标明了开抢时间的文案
    if $hotPartStartTimeSpan.length > 0
      $hotPartStartTimeSpan.html startTimeText

  updateQvmSumSaleBuyBtnsStatus = (isExpired) ->
    if !isExpired
      # 活动没过期
      # 去掉热卖机型无限购部分 button 的 disabled class
      if $serverPartBuyButtons.length > 0
        $serverPartBuyButtons.removeClass 'disabled'
      # 去掉云通信专场部分 button 的 disabled class
      if $smsPartBuyButtons.length > 0
        $smsPartBuyButtons.removeClass 'disabled'
      isHotRobStart (isStart, startTimeText) ->
        updateHotPartBuyBtnsStatus isStart, startTimeText
    else
      # 修改爆款限时抢部分 button 的文案和 href
      if $hotPartC5Button.length > 0
        $hotPartC5Button.html '活动已结束'
        $hotPartC5Button.attr 'href', ''
      if $hotPartT5Button.length > 0
        $hotPartT5Button.html '活动已结束'
        $hotPartT5Button.attr 'href', ''
      # 修改热卖机型无限购部分 button 的文案和 href
      if $serverPartBuyButtons.length > 0
        $serverPartBuyButtons.html '活动已结束'
        $serverPartBuyButtons.attr 'href', ''
      # 修改云通信专场部分 button 的文案和 href
      if $smsPartBuyButtons.length > 0
        $smsPartBuyButtons.html '活动已结束'
        $smsPartBuyButtons.attr 'href', ''

  if $qvmSumSalePage.length > 0
    isExpired = isQvmSumSaleExpired()
    updateQvmSumSaleBuyBtnsStatus isExpired
