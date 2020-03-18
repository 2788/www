$(document).ready ->
  $springSaleEventPage = $('.events-page-spring_sale')
  # dropdown
  $springSaleKodoDropdown = $springSaleEventPage.find('.features-spring-sale-kodo .content-dropdown .spring-sale-kodo-dropdown')
  $springSaleDoraDropdown = $springSaleEventPage.find('.features-spring-sale-dora .content-dropdown .spring-sale-dora-dropdown')
  $springSaleQvmDropdown = $springSaleEventPage.find('.features-spring-sale-qvm .content-dropdown .spring-sale-qvm-dropdown')
  
  $2019double12AllBtns = $springSaleEventPage.find('.features-spring-sale .container .btn-double12-2019')
  $2019double12BuyBtns = $springSaleEventPage.find('.features-spring-sale .container .btn-double12-2019.package-buy')

  $springSaleEndModal = $springSaleEventPage.find('#double12-2019-end-modal')
  $2019double12PackageBuyFailModal = $springSaleEventPage.find('#double12-2019-package-buy-fail-modal')
  $2019double12PackageBuySuccessModal = $springSaleEventPage.find('#double12-2019-package-buy-success-modal')

  $2019double12EffectTimeModal = $springSaleEventPage.find('#double12-2019-effect-time-modal')
  $2019double12EffectTimeBtns = $springSaleEventPage.find('.modal-dialog .modal-body .effect-time-btns .effect-time')
  $springSaleSdkEffectTimeModal = $springSaleEventPage.find('#double12-2019-sdk-confirm-modal')

  $2019double12PackageBuyFailTip = $2019double12PackageBuyFailModal.find('.modal-dialog .modal-body .error-tip')

  double12SelectedPackageID = 0
  double12SelectedPackageInfo = ''
  double12PackageBuyDefaultFailMessage = '下单失败，请稍后重试'

  bindDropdownList = () ->
    if $springSaleKodoDropdown.length > 0
      $springSaleKodoDropdown.on 'change', (e) ->
        $container = $(this).parents('.content-container')
        $sections = $container.find('.content-section')
        for section in $sections
          if $(section).hasClass 'active'
            $(section).removeClass 'active'
            $(section).css 'display', 'none'
        sectionID = ''
        $areaDropdown = $container.find('.spring-sale-kodo-dropdown.area-dropdown')
        sectionID = $areaDropdown.val()
        $container.find('#' + sectionID).fadeIn 300, () ->
          $(this).addClass 'active'


    if $springSaleQvmDropdown.length > 0
      $springSaleQvmDropdown.on 'change', (e) ->
        $container = $(this).parents('.content-container')
        $sections = $container.find('.content-section')
        for section in $sections
          if $(section).hasClass 'active'
            $(section).removeClass 'active'
            $(section).css 'display', 'none'
        sectionID = ''
        $durationDropdown = $container.find('.spring-sale-qvm-dropdown')
        sectionID = $durationDropdown.val()
        $container.find('#' + sectionID).fadeIn 300, () ->
          $(this).addClass 'active'
  
  # nav 滚动
  navScrollEvent = () ->
    $navContainer = $springSaleEventPage.find('.spring-nav.normal')
    $navFixedContainer = $springSaleEventPage.find('.spring-nav.fixed')
    if $navContainer.length > 0
      $(document).on 'scroll', (e) ->
        navHeight = $("#navbar").get(0).offsetHeight
        springNavHeight = $navContainer.get(0).offsetHeight
        top = $springSaleEventPage.find('.jumbotron.hero.spring-sale').get(0).offsetHeight
        scrollHeight = $(document).scrollTop()
        if scrollHeight >= (top - navHeight + springNavHeight)
          $navContainer.find('.container').fadeOut(300)
          $navFixedContainer.fadeIn(600)
        else
          $navContainer.find('.container').fadeIn(300)
          $navFixedContainer.fadeOut(300)
  
  # dora tabs切换
  doraTabEvent = () ->
    $doraTabs = $springSaleEventPage.find('.dora-nav')
    $doraTabs.on 'click', (e) ->
      $(this).parents('.dora-nav-container').find('.dora-nav').removeClass 'active'
      $(this).addClass 'active'
      activeClass = $(this).attr 'id'
      $('.' + activeClass).siblings('.content-section').removeClass 'active'
      $('.' + activeClass).addClass 'active'
        

  # 2019 年 1212 活动是否结束
  isSpringSaleEnd = (callback) ->
    uuid = generateUUID()
    timestamp = new Date().getTime()
    $.ajax
      method: 'GET',
      url: '/events/20200316/is_end?u=' + uuid + '&t=' + timestamp,
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
  
  disableDouble12AllBtns = () ->
    if $2019double12AllBtns.length > 0
      $2019double12AllBtns.html '活动已结束'
      $2019double12AllBtns.attr 'href', ''
  
  enableDouble12AllBtns = () ->
    if $2019double12AllBtns.length > 0
      $2019double12AllBtns.removeClass 'disabled'
  showSpringSaleEndModal = () ->
    if $springSaleEndModal.length > 0
      $springSaleEndModal.modal 'show'
  
  double122019GetUserInfo = () ->
    uuid = generateUUID()
    timestamp = new Date().getTime()
    $.ajax
      method: 'GET',
      url: '/userinfo?u=' + uuid + '&t=' + timestamp,
      success: (res) ->
        if res && res.is_signin
          bindDouble12EffectTimeBtns()
          bindDouble12BuyBtns()
        enableDouble12AllBtns()
      error: (err) ->
        enableDouble12AllBtns()

  showEffectTimeModal = () ->
    if $2019double12EffectTimeModal.length > 0
      $2019double12EffectTimeModal.find('.package-info').html double12SelectedPackageInfo
      $2019double12EffectTimeModal.modal 'show'
  
  showSdkConfirmModal = () ->
    if $springSaleSdkEffectTimeModal.length > 0
      $springSaleSdkEffectTimeModal.find('.package-info').html double12SelectedPackageInfo
      $springSaleSdkEffectTimeModal.modal 'show'
  
  # 购买失败
  showPackageBuyFailModal = (message) ->
    if $2019double12PackageBuyFailModal.length > 0
      $2019double12PackageBuyFailTip.html message || double12PackageBuyDefaultFailMessage
      $2019double12PackageBuyFailModal.modal 'show'

  # 购买
  bindDouble12BuyBtns = () ->
    if $2019double12BuyBtns.length > 0
      $2019double12BuyBtns.attr 'href', ''
      $2019double12BuyBtns.attr 'target', ''
      $2019double12BuyBtns.on 'click', (e) ->
        e.preventDefault()
        packageID = parseInt($(this).attr('data-package-id')) | 0
        packageInfo = $(this).attr('data-package-info') || ''
        if packageID
          double12SelectedPackageID = packageID
          double12SelectedPackageInfo = packageInfo
          if $(this).parents('.features-spring-sale-sdk').length == 0
            showEffectTimeModal()
          else
            showSdkConfirmModal()
        else
          showPackageBuyFailModal()
  
  bindDouble12EffectTimeBtns = () ->
    if $2019double12EffectTimeBtns.length > 0
      $2019double12EffectTimeBtns.on 'click', (e) ->
        e.preventDefault()
        if $(this).hasClass 'disabled'
          return
        $2019double12EffectTimeBtns.addClass 'disabled'
        effectTime = parseInt($(this).attr('data-effect-time'))
        $.ajax
          method: 'POST',
          url: '/events/package/buy',
          data:
            package_id: double12SelectedPackageID
            effect_type: effectTime
          success: (res) ->
            hideEffectTimeModal -> handleDouble12BuyRes res
          error: (err) ->
            hideEffectTimeModal -> showPackageBuyFailModal()
          complete: () ->
            $2019double12EffectTimeBtns.removeClass 'disabled'
  
  handleDouble12BuyRes = (res) ->
    if res && res.is_success
      showPackageBuySuccessModal()
    else
      showPackageBuyFailModal res.message

  showPackageBuySuccessModal = () ->
    if $2019double12PackageBuySuccessModal.length > 0
      $2019double12PackageBuySuccessModal.modal 'show'

  showPackageBuyFailModal = (message) ->
    if $2019double12PackageBuyFailModal.length > 0
      $2019double12PackageBuyFailTip.html message || double12PackageBuyDefaultFailMessage
      $2019double12PackageBuyFailModal.modal 'show'

  hideEffectTimeModal = (cb) ->
    if $2019double12EffectTimeModal.length > 0
      double12SelectedPackageID = 0
      double12SelectedPackageInfo = ''
      $2019double12EffectTimeModal.find('.package-info').html double12SelectedPackageInfo
      $2019double12EffectTimeModal.one('hidden.bs.modal', cb)
      $2019double12EffectTimeModal.modal 'hide'
    if $springSaleSdkEffectTimeModal.length > 0
      double12SelectedPackageID = 0
      double12SelectedPackageInfo = ''
      $springSaleSdkEffectTimeModal.find('.package-info').html double12SelectedPackageInfo
      $springSaleSdkEffectTimeModal.one('hidden.bs.modal', cb)
      $springSaleSdkEffectTimeModal.modal 'hide'

  # hash 锚点功能
  hashScroll = () ->
    hash = window.location.hash
    if $(hash).length > 0
      $(hash).find('a').click()
    window.onhashchange = () ->
      hash = window.location.hash
      if $(hash).length > 0
        $(hash).find('a').click()
    

  # 绑定页面的 dropdown
  if $springSaleEventPage.length > 0
    hashScroll()
    isSpringSaleEnd (isEnd) ->
      if isEnd
        # 活动已结束
        disableDouble12AllBtns()
        showSpringSaleEndModal()
      else
        # 活动未结束
        double122019GetUserInfo()
    bindDropdownList()
    navScrollEvent()
    doraTabEvent()
