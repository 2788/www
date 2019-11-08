$(document).ready ->
  # page
  $2019double11EventPage = $('.events-page-double11_2019')
  # dropdown
  $2019double11KodoDropdown = $2019double11EventPage.find('.features-double11-2019-kodo .content-dropdown .double11-2019-kodo-dropdown')
  $2019double11FusionDropdown = $2019double11EventPage.find('.features-double11-2019-fusion .content-dropdown .double11-2019-fusion-dropdown')
  # pili
  $2019double11PiliApplyBtns = $2019double11EventPage.find('.features-double11-2019-pili .pili-exp-table .pili-apply-btn')
  # dora
  $2019double11DoraVoucherBtns = $2019double11EventPage.find('.features-double11-2019-dora .container .btn-double11-2019')
  # progress
  $2019double11ProgressTip = $2019double11EventPage.find('.features-double11-2019 .content-section .progress-tip')
  $2019double11ProgressBar = $2019double11EventPage.find('.features-double11-2019 .content-section .progress-bar')
  # buy buttons
  $2019double11BuyBtns = $2019double11EventPage.find('.features-double11-2019 .container .btn-double11-2019')
  # modal
  $2019double11DoraVoucherSuccessModal = $2019double11EventPage.find('#double11-2019-dora-success-modal')
  $2019double11DoraVoucherFailModal = $2019double11EventPage.find('#double11-2019-dora-fail-modal')
  $2019double11DoraVoucherRepeatModal = $2019double11EventPage.find('#double11-2019-dora-repeat-modal')

  double112019PiliApplyURL = 'https://jinshuju.net/f/STSJ0m?x_field_1='

  bindDropdownList = () ->
    if $2019double11KodoDropdown.length > 0
      $2019double11KodoDropdown.on 'change', (e) ->
        $container = $(this).parents('.content-container')
        $sections = $container.find('.content-section')
        for section in $sections
          if $(section).hasClass 'active'
            $(section).removeClass 'active'
            $(section).css 'display', 'none'
        $container.find('#' + e.target.value).fadeIn 300, () ->
          $(this).addClass 'active'

    if $2019double11FusionDropdown.length > 0
      $2019double11FusionDropdown.on 'change', (e) ->
        $container = $(this).parents('.content-container')
        $sections = $container.find('.content-section')
        for section in $sections
          if $(section).hasClass 'active'
            $(section).removeClass 'active'
            $(section).css 'display', 'none'
        $container.find('#' + e.target.value).fadeIn 300, () ->
          $(this).addClass 'active'

  getProductCouponType = (target) ->
    productCouponType = 0
    if !target? || target.length == 0
      return productCouponType
    if target.hasClass 'voucher-wm'
      productCouponType = 1
    else if target.hasClass 'voucher-smart'
      productCouponType = 2
    else if target.hasClass 'voucher-speed'
      productCouponType = 3
    return productCouponType

  showDoraVoucherSuccessModal = () ->
    if $2019double11DoraVoucherSuccessModal.length > 0
      $2019double11DoraVoucherSuccessModal.modal 'show'

  showDoraVoucherFailModal = () ->
    if $2019double11DoraVoucherFailModal.length > 0
      $2019double11DoraVoucherFailModal.modal 'show'

  showDoraVoucherRepeatModal = () ->
    if $2019double11DoraVoucherRepeatModal.length > 0
      $2019double11DoraVoucherRepeatModal.modal 'show'

  handleDoraVoucherRes = (res) ->
    if res && res.is_success
      showDoraVoucherSuccessModal()
    else
      if res && res.is_repeat
        showDoraVoucherRepeatModal()
      else
        showDoraVoucherFailModal()

  bindDoraVoucherBtns = () ->
    if $2019double11DoraVoucherBtns.length > 0
      $2019double11DoraVoucherBtns.attr 'href', ''
      $2019double11DoraVoucherBtns.attr 'target', ''
      $2019double11DoraVoucherBtns.on 'click', (e) ->
        e.preventDefault()
        $doraVoucherBtn = $(this)
        if !$doraVoucherBtn.hasClass 'disabled'
          productCouponType = getProductCouponType $doraVoucherBtn
          if productCouponType
            $doraVoucherBtn.addClass 'disabled'
            $.ajax
              method: 'POST',
              url: '/events/20191111/dora/voucher',
              data:
                product_coupon_type: productCouponType
              success: (res) ->
                handleDoraVoucherRes res
              error: (err) ->
                if $2019double11DoraVoucherFailModal.length > 0
                  $2019double11DoraVoucherFailModal.modal 'show'
              complete: () ->
                $doraVoucherBtn.removeClass 'disabled'

  # 2019 年 1111 活动是否结束
  is2019Double11End = (callback) ->
    uuid = generateUUID()
    timestamp = new Date().getTime()
    $.ajax
      method: 'GET',
      url: '/events/20191111/is_end?u=' + uuid + '&t=' + timestamp,
      success: (res) ->
        if res && !res.is_end
          # 未结束
          callback false
        else
          # 已结束
          callback true
      error: (err) ->
        # error
        callback true

  double112019GetUserInfo = () ->
    uuid = generateUUID()
    timestamp = new Date().getTime()
    $.ajax
      method: 'GET',
      url: '/userinfo?u=' + uuid + '&t=' + timestamp,
      success: (res) ->
        if res && res.is_signin && res.uid
          $2019double11PiliApplyBtns.attr 'href', double112019PiliApplyURL + res.uid
          bindDoraVoucherBtns()

  getPercentByTime = () ->
    currentTime = new Date()
    beginOfDay = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), 0, 0, 0)
    return Math.floor((currentTime.getTime() - beginOfDay.getTime()) / 86400000 * 100)

  updateProgressByPercent = (percent) ->
    if $2019double11ProgressTip.length > 0
      $2019double11ProgressTip.html '已抢 ' + percent + '%'
    if $2019double11ProgressBar.length > 0
      $2019double11ProgressBar.attr('aria-valuenow', percent)
      $2019double11ProgressBar.css('width', percent + '%')

  updateBtnsByStatus = (isEnd) ->
    if $2019double11BuyBtns.length > 0
      if !isEnd
        # 活动未结束
        $2019double11BuyBtns.removeClass 'disabled'
      else
        # 活动已结束
        $2019double11BuyBtns.html '活动已结束'
        $2019double11BuyBtns.attr 'href', ''

  updateProgressBarByStatus = (isEnd) ->
    if isEnd
      updateProgressByPercent 0
    else
      percent = getPercentByTime()
      updateProgressByPercent percent

  # 绑定页面的 dropdown
  if $2019double11EventPage.length > 0
    bindDropdownList()

  if $2019double11EventPage.length > 0
    is2019Double11End (isEnd) ->
      updateBtnsByStatus isEnd
      # updateProgressBarByStatus isEnd
      if !isEnd
        double112019GetUserInfo()

  # 解析锚点
  if $2019double11EventPage.length > 0
    splitList = window.location.hash.split('?')
    hash = if splitList[0] then splitList[0] else ''
    if hash
      setTimeout(() ->
        $targetDom = $2019double11EventPage.find('#tab-content-double11-2019-' + hash.replace('#', ''))
        $targetDom.length > 0 && $targetDom.click()
        return
      , 0)
