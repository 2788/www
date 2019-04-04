$(document).ready ->
  $qvm2for3EventsPage = $('.events-page.events-page-qvm2for3')
  $qvm2for3NavSignupButton = $qvm2for3EventsPage.find('.navbar .navbar-right.navbar-nav-mobile .need-signin .btn.btn-primary')
  $qvm2for3VoucherImage = $qvm2for3EventsPage.find('.features-qvm2for3-voucher .row .col-voucher img')
  $buyButtons = $('.features-qvm2for3 .container .row .content-container .btn-qvm2for3')
  $hotPartDropdown = $('.features-qvm2for3-hot .content-dropdown .qvm2for3-hot-dropdown')
  $dbPartDropdown = $('.features-qvm2for3-db .content-dropdown .qvm2for3-db-dropdown')
  $exclusiveVoucherModal = $qvm2for3EventsPage.find('#exclusive-voucher-modal')

  # qvm2for3 活动结束时间 2019 年 5 月 1 号 0 点
  qvm2for3EventEndTime = new Date(2019, 4, 1, 0, 0, 0).getTime()

  # 判断 qvm2for3 活动是否过期
  isQvm2for3EventExpired = () ->
    isEventExpired = false
    currentTime = new Date().getTime()
    if currentTime >= qvm2for3EventEndTime
      isEventExpired = true
    return isEventExpired

  # 热卖机型部分下拉菜单事件
  if $qvm2for3EventsPage.length > 0 && $hotPartDropdown.length > 0
    $hotPartDropdown.on 'change', (e) ->
      $container = $(this).parents('.content-container')
      $sections = $container.find('.content-section')
      for section in $sections
        if $(section).hasClass 'active'
          $(section).removeClass 'active'
          $(section).css 'display', 'none'
      $container.find('#' + e.target.value).fadeIn 300, () ->
        $(this).addClass 'active'
  
  # 云数据库部分下拉菜单事件
  if $qvm2for3EventsPage.length > 0 && $dbPartDropdown.length > 0
    $dbPartDropdown.on 'change', (e) ->
      $container = $(this).parents('.content-container')
      $sections = $container.find('.content-section')
      for section in $sections
        if $(section).hasClass 'active'
          $(section).removeClass 'active'
          $(section).css 'display', 'none'
      $container.find('#' + e.target.value).fadeIn 300, () ->
        $(this).addClass 'active'

  # 根据 eventStatus 标识
  # 更新购买按钮状态
  updateBuyButtonStatus = (eventStatus) ->
    if eventStatus == 'not_signin'
      # not signin
      $buyButtons.html '注册'
      $buyButtons.attr 'href', 'https://portal.qiniu.com/signup?promotion=qvm2for3'
      $buyButtons.removeClass 'disabled'
    else if eventStatus == 'signin'
      # signin
      $buyButtons.removeClass 'disabled'
    else if eventStatus == 'event_expired'
      $buyButtons.html '活动已结束'
      $buyButtons.attr 'href', ''

  # 根据 isSignin 标识
  # 代金券图像绑定 click 事件
  bindClickMethodForVoucherMethod = (isSignin) ->
    $qvm2for3VoucherImage.addClass 'active'
    $qvm2for3VoucherImage.on 'click', (e) ->
      e.preventDefault()
      if !isSignin
        # not signin
        promotionCode = ''
        targetDom = e.target || e.srcElement
        if $(targetDom).hasClass 'voucher-50'
          promotionCode = 'qvm2for3-50'
        else if $(targetDom).hasClass 'voucher-100'
          promotionCode = 'qvm2for3-100'
        else if $(targetDom).hasClass 'voucher-200'
          promotionCode = 'qvm2for3-200'
        window.open 'https://portal.qiniu.com/signup?promotion=' + promotionCode, '_blank'
      else
        $exclusiveVoucherModal.modal 'show'

  # 获取用户登录信息
  getUserInfo = () ->
    uuid = generateUUID()
    timestamp = new Date().getTime()
    $.ajax
      method: 'GET',
      url: '/userinfo?u=' + uuid + '&t=' + timestamp,
      success: (res) ->
        # success
        bindClickMethodForVoucherMethod res.is_signin
        if !res.is_signin
          # not signin
          updateBuyButtonStatus 'not_signin'
        else
          # signin
          updateBuyButtonStatus 'signin'
      error: (err) ->
        # error
        bindClickMethodForVoucherMethod false
        updateBuyButtonStatus 'not_signin'

  if $qvm2for3EventsPage.length > 0
    isEventExpired = isQvm2for3EventExpired()
    if !isEventExpired
      # 活动没有过期
      getUserInfo()
      # 修改导航栏 signup 按钮跳转链接
      if $qvm2for3NavSignupButton.length > 0
        $qvm2for3NavSignupButton.attr 'href', 'https://portal.qiniu.com/signup?promotion=qvm2for3'
    else
      # 活动已过期
      updateBuyButtonStatus 'event_expired'
