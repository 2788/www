$(document).ready ->
  # page
  $bigPromotionPage = $('.events-page-big_promotion')
  # banner
  $bigPromotionBannerIconsRow = $bigPromotionPage.find('.jumbotron.hero.hero-bigpromotion .container .middle-container .hero-icons-row')
  $bigPromotionBannerIcons = $bigPromotionBannerIconsRow.find('.col-icon a')
  # dropdown
  $bigPromotionKodoDropdown = $bigPromotionPage.find('.features-bigpromotion-kodo .content-dropdown .bigpromotion-kodo-dropdown')
  $bigPromotionQvmDropdown = $bigPromotionPage.find('.features-bigpromotion-qvm .content-dropdown .bigpromotion-qvm-dropdown')
  # buy buttons
  $bigPromotionBuyBtns = $bigPromotionPage.find('.features-bigpromotion .container .row .btn-bigpromotion')

  bindDropdownList = () ->
    if $bigPromotionKodoDropdown.length > 0
      $bigPromotionKodoDropdown.on 'change', (e) ->
        $container = $(this).parents('.content-container')
        $sections = $container.find('.content-section')
        for section in $sections
          if $(section).hasClass 'active'
            $(section).removeClass 'active'
            $(section).css 'display', 'none'
        $container.find('#' + e.target.value).fadeIn 300, () ->
          $(this).addClass 'active'
    if $bigPromotionQvmDropdown.length > 0
      $bigPromotionQvmDropdown.on 'change', (e) ->
        $container = $(this).parents('.content-container')
        $sections = $container.find('.content-section')
        for section in $sections
          if $(section).hasClass 'active'
            $(section).removeClass 'active'
            $(section).css 'display', 'none'
        $container.find('#' + e.target.value).fadeIn 300, () ->
          $(this).addClass 'active'

  # 618 活动是否结束
  isBigPromotionEnd = (callback) ->
    uuid = generateUUID()
    timestamp = new Date().getTime()
    $.ajax
      method: 'GET',
      url: '/events/2019618/is_end?u=' + uuid + '&t=' + timestamp,
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

  bindBannerIconsEventByStatus = (isEnd) ->
    if !isEnd
      # 活动未结束
      $bigPromotionBannerIcons.removeClass 'disabled'
    else
      $bigPromotionBannerIcons.attr 'href', ''

    $bigPromotionBannerIcons.on 'click', (e) ->
      if $(this).hasClass 'disabled'
        e.preventDefault()
        return

  updateBannerByStatus = (isEnd) ->
    if isEnd
      # 活动已结束
      $bigPromotionBannerIconsRow.html '<h2 class="activity-end-tip">活动已结束</h2>'

  updateBtnsByStatus = (isEnd) ->
    if !isEnd
      # 活动未结束
      $bigPromotionBuyBtns.removeClass 'disabled'
    else
      # 活动已结束
      $bigPromotionBuyBtns.html '活动已结束'
      $bigPromotionBuyBtns.attr 'href', ''

  # 去掉页面的 helper
  if $bigPromotionPage.length > 0
    $bigPromotionPage.find('div.helper').remove()

  # 绑定页面的 dropdown
  if $bigPromotionPage.length > 0
    bindDropdownList()

  if $bigPromotionPage.length > 0
    isBigPromotionEnd (isEnd) ->
      bindBannerIconsEventByStatus isEnd
      updateBannerByStatus isEnd
      updateBtnsByStatus isEnd
