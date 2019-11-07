$(document).ready ->
  # page
  $zeldaPage = $('.events-page-zelda')
  # banner
  $zeldaBannerRow = $zeldaPage.find('.jumbotron.hero.hero-zelda .container .middle-container .zelda-banner-row')
  # nav
  $zeldaTopNav = $zeldaPage.find('nav.navbar.navbar-default')
  $zeldaBlockNav = $zeldaPage.find('.features-nav.zelda-nav')
  # dropdown
  $zeldaKodoDropdown = $zeldaPage.find('.features-zelda-kodo .content-dropdown .zelda-kodo-dropdown')
  $zeldaFusionDropdown = $zeldaPage.find('.features-zelda-fusion .content-dropdown .zelda-fusion-dropdown')
  # buy buttons
  $zeldaBuyBtns = $zeldaPage.find('.features-zelda .container .row .btn-zelda')
  # modal
  $zeldaEventEndModal = $zeldaPage.find('#zelda-event-end-modal')

  bindDropdownList = () ->
    if $zeldaKodoDropdown.length > 0
      $zeldaKodoDropdown.on 'change', (e) ->
        $container = $(this).parents('.content-container')
        $sections = $container.find('.content-section')
        for section in $sections
          if $(section).hasClass 'active'
            $(section).removeClass 'active'
            $(section).css 'display', 'none'
        $container.find('#' + e.target.value).fadeIn 300, () ->
          $(this).addClass 'active'

    if $zeldaFusionDropdown.length > 0
      $zeldaFusionDropdown.on 'change', (e) ->
        $container = $(this).parents('.content-container')
        $sections = $container.find('.content-section')
        for section in $sections
          if $(section).hasClass 'active'
            $(section).removeClass 'active'
            $(section).css 'display', 'none'
        $container.find('#' + e.target.value).fadeIn 300, () ->
          $(this).addClass 'active'

  # 2019 年 1024 活动是否结束
  isZeldaEnd = (callback) ->
    uuid = generateUUID()
    timestamp = new Date().getTime()
    $.ajax
      method: 'GET',
      url: '/events/20191024/is_end?u=' + uuid + '&t=' + timestamp,
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

  updateBannerByStatus = (isEnd) ->
    if isEnd
      # 活动已结束
      $zeldaBannerRow.html '<h2 class="activity-end-tip">活动已结束</h2>'

  updateBtnsByStatus = (isEnd) ->
    if !isEnd
      # 活动未结束
      $zeldaBuyBtns.removeClass 'disabled'
    else
      # 活动已结束
      $zeldaBuyBtns.html '活动已结束'
      $zeldaBuyBtns.attr 'href', ''

  listenZeldaPageScroll = (json) ->
    fxd = json.fxdClass
    myElem = json.elem
    myElemOffset = myElem.offset().top
    topNavHeight = $zeldaTopNav.height()
    if $(window).scrollTop() > myElemOffset - topNavHeight
      myElem.addClass fxd
      myElem.css({'top': topNavHeight})
    else
      myElem.removeClass fxd
      myElem.css({'top': 0})
    $(window).scroll ->
      scrollTop = $(window).scrollTop()
      if scrollTop > myElemOffset - topNavHeight
        myElem.addClass fxd
        myElem.css({'top': topNavHeight})
      else
        myElem.removeClass fxd
        myElem.css({'top': 0})

  # 绑定页面的 dropdown
  if $zeldaPage.length > 0
    bindDropdownList()

  # 页面向下滚动到一定程度，导航栏固定在顶部
  if $zeldaPage.length > 0 && $zeldaBlockNav.length > 0
    windowWidth = $(window).width()
    if windowWidth >= 768
      listenZeldaPageScroll
        'elem': $zeldaBlockNav
        'fxdClass': 'fixed'

  if $zeldaPage.length > 0
    isZeldaEnd (isEnd) ->
      updateBannerByStatus isEnd
      updateBtnsByStatus isEnd
      if isEnd && $zeldaEventEndModal.length > 0
        $zeldaEventEndModal.modal 'show'
