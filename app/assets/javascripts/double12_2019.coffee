$(document).ready ->
  # page
  $2019double12EventPage = $('.events-page-double12_2019')
  # dropdown
  $2019double12KodoTopDropdown = $2019double12EventPage.find('.features-double12-2019-kodo .content-dropdown .double12-2019-kodo-top-dropdown')
  $2019double12KodoDropdown = $2019double12EventPage.find('.features-double12-2019-kodo .content-dropdown .double12-2019-kodo-dropdown')
  $2019double12FusionDropdown = $2019double12EventPage.find('.features-double12-2019-fusion .content-dropdown .double12-2019-fusion-dropdown')
  # order button
  $2019double12OrderBtn = $2019double12EventPage.find('.jumbotron.hero.hero-double12-2019 .container .middle-container .btn-double12-2019-order')
  # buy buttons
  $2019double12AllBtns = $2019double12EventPage.find('.features-double12-2019 .container .btn-double12-2019')
  $2019double12BuyBtns = $2019double12EventPage.find('.features-double12-2019 .container .btn-double12-2019.package-buy')
  # modal
  $2019double12OrderSuccessModal = $2019double12EventPage.find('#double12-2019-order-success-modal')
  $2019double12OrderFailModal = $2019double12EventPage.find('#double12-2019-order-fail-modal')
  $2019double12PackageBuySuccessModal = $2019double12EventPage.find('#double12-2019-package-buy-success-modal')
  $2019double12PackageBuyFailModal = $2019double12EventPage.find('#double12-2019-package-buy-fail-modal')
  $2019double12EffectTimeModal = $2019double12EventPage.find('#double12-2019-effect-time-modal')
  # fail modal tip
  $2019double12PackageBuyFailTip = $2019double12PackageBuyFailModal.find('.modal-dialog .modal-body .error-tip')
  $2019double12OrderFailTip = $2019double12OrderFailModal.find('.modal-dialog .modal-body .error-tip')
  # effect time buttons
  $2019double12EffectTimeBtns = $2019double12EffectTimeModal.find('.modal-dialog .modal-body .effect-time-btns .effect-time')

  double12SelectedPackageID = 0
  double12SelectedPackageInfo = ''
  double12PackageBuyDefaultFailMessage = '下单失败，请稍后重试'
  double12OrderDefaultFailMessage = '预约失败，请稍后重试'

  bindDropdownList = () ->
    if $2019double12KodoTopDropdown.length > 0
      $2019double12KodoTopDropdown.on 'change', (e) ->
        $tr = $(this).parents('tr')
        $sections = $tr.find('.content-section')
        for section in $sections
          if $(section).hasClass 'active'
            $(section).removeClass 'active'
            $(section).css 'display', 'none'
        query = '#' + e.target.value + '-price, #' + e.target.value + '-btn'
        $tr.find(query).fadeIn 300, () ->
          $(this).addClass 'active'

    if $2019double12KodoDropdown.length > 0
      $2019double12KodoDropdown.on 'change', (e) ->
        $container = $(this).parents('.content-container')
        $sections = $container.find('.content-section')
        for section in $sections
          if $(section).hasClass 'active'
            $(section).removeClass 'active'
            $(section).css 'display', 'none'
        sectionID = ''
        if $(this).hasClass('duration-dropdown') || $(this).hasClass('area-dropdown')
          $durationDropdown = $container.find('.double12-2019-kodo-dropdown.duration-dropdown')
          $areaDropdown = $container.find('.double12-2019-kodo-dropdown.area-dropdown')
          sectionID = $areaDropdown.val() + '-' + $durationDropdown.val()
        else
          sectionID = e.target.value
        $container.find('#' + sectionID).fadeIn 300, () ->
          $(this).addClass 'active'

    if $2019double12FusionDropdown.length > 0
      $2019double12FusionDropdown.on 'change', (e) ->
        $container = $(this).parents('.content-container')
        $sections = $container.find('.content-section')
        for section in $sections
          if $(section).hasClass 'active'
            $(section).removeClass 'active'
            $(section).css 'display', 'none'
        $container.find('#' + e.target.value).fadeIn 300, () ->
          $(this).addClass 'active'

  showOrderSuccessModal = () ->
    if $2019double12OrderSuccessModal.length > 0
      $2019double12OrderSuccessModal.modal 'show'

  showOrderFailModal = (message) ->
    if $2019double12OrderFailModal.length > 0
      $2019double12OrderFailTip.html message || double12OrderDefaultFailMessage
      $2019double12OrderFailModal.modal 'show'

  showPackageBuySuccessModal = () ->
    if $2019double12PackageBuySuccessModal.length > 0
      $2019double12PackageBuySuccessModal.modal 'show'

  showPackageBuyFailModal = (message) ->
    if $2019double12PackageBuyFailModal.length > 0
      $2019double12PackageBuyFailTip.html message || double12PackageBuyDefaultFailMessage
      $2019double12PackageBuyFailModal.modal 'show'

  showEffectTimeModal = () ->
    if $2019double12EffectTimeModal.length > 0
      $2019double12EffectTimeModal.find('.package-info').html double12SelectedPackageInfo
      $2019double12EffectTimeModal.modal 'show'

  hideEffectTimeModal = (cb) ->
    if $2019double12EffectTimeModal.length > 0
      double12SelectedPackageID = 0
      double12SelectedPackageInfo = ''
      $2019double12EffectTimeModal.find('.package-info').html double12SelectedPackageInfo
      $2019double12EffectTimeModal.one('hidden.bs.modal', cb)
      $2019double12EffectTimeModal.modal 'hide'

  handleDouble12OrderRes = (res) ->
    if res && res.is_success
      showOrderSuccessModal()
    else
      showOrderFailModal res.message

  handleDouble12BuyRes = (res) ->
    if res && res.is_success
      showPackageBuySuccessModal()
    else
      showPackageBuyFailModal res.message

  bindDouble12OrderBtn = () ->
    if $2019double12OrderBtn.length > 0
      $2019double12OrderBtn.attr 'href', ''
      $2019double12OrderBtn.attr 'target', ''
      $2019double12OrderBtn.on 'click', (e) ->
        e.preventDefault()
        if $(this).hasClass 'disabled'
          return
        $2019double12OrderBtn.addClass 'disabled'
        $.ajax
          method: 'GET',
          url: '/events/20191212/combo/order',
          success: (res) ->
            handleDouble12OrderRes res
          error: (err) ->
            showOrderFailModal()
          complete: () ->
            $2019double12OrderBtn.removeClass 'disabled'

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
          showEffectTimeModal()
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
          url: '/events/20191212/package/buy',
          data:
            package_id: double12SelectedPackageID
            effect_type: effectTime
          success: (res) ->
            hideEffectTimeModal -> handleDouble12BuyRes res
          error: (err) ->
            hideEffectTimeModal -> showPackageBuyFailModal()
          complete: () ->
            $2019double12EffectTimeBtns.removeClass 'disabled'

  # 2019 年 1212 活动是否结束
  is2019double12End = (callback) ->
    uuid = generateUUID()
    timestamp = new Date().getTime()
    $.ajax
      method: 'GET',
      url: '/events/20191212/is_end?u=' + uuid + '&t=' + timestamp,
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

  double122019GetUserInfo = () ->
    uuid = generateUUID()
    timestamp = new Date().getTime()
    $.ajax
      method: 'GET',
      url: '/userinfo?u=' + uuid + '&t=' + timestamp,
      success: (res) ->
        if res && res.is_signin
          bindDouble12OrderBtn()
          bindDouble12BuyBtns()
          bindDouble12EffectTimeBtns()
        enableDouble12AllBtns()
      error: (err) ->
        enableDouble12AllBtns()

  disableDouble12AllBtns = () ->
    if $2019double12OrderBtn.length > 0
      $2019double12OrderBtn.attr 'href', ''

    if $2019double12AllBtns.length > 0
      $2019double12AllBtns.html '活动已结束'
      $2019double12AllBtns.attr 'href', ''

  enableDouble12AllBtns = () ->
    if $2019double12OrderBtn.length > 0
      $2019double12OrderBtn.removeClass 'disabled'

    if $2019double12AllBtns.length > 0
      $2019double12AllBtns.removeClass 'disabled'

  # 绑定页面的 dropdown
  if $2019double12EventPage.length > 0
    bindDropdownList()

  if $2019double12EventPage.length > 0
    is2019double12End (isEnd) ->
      if isEnd
        # 活动已结束
        disableDouble12AllBtns()
      else
        # 活动未结束
        double122019GetUserInfo()

  # 解析锚点
  if $2019double12EventPage.length > 0
    splitList = window.location.hash.split('?')
    hash = if splitList[0] then splitList[0] else ''
    if hash
      setTimeout(() ->
        $targetDom = $2019double12EventPage.find('#tab-content-double12-2019-' + hash.replace('#', ''))
        $targetDom.length > 0 && $targetDom.click()
        return
      , 0)

  combPackElToModel = (combPackEl) ->
    return {
      combPackType: combPackEl.data('comb-pack-type')
      duration: combPackEl.find('[name="duration"]').val()
      zone: combPackEl.find('[name="zone"]').val()
      protocal: combPackEl.find('[name="protocal"]').val()
    }

  getPriceAndPackId = (combPackType, duration, zone, protocal) ->
    priceAndPackIdMap =
      "comb-pack-1":
        "duration-1":
          "price": "1890"
          "origin-price": "2691.59"
          "diff-price": "801.59"
          "ids":
            "z0http": "1-1-z0http"
            "z0https": "1-1-z0https"
            "z1http": "1-1-z1http"
            "z1https": "1-1-z1https"
            "z3http": "1-1-z3http"
            "z3https": "1-1-z3https"
        "duration-3":
          "price": "5556.6"
          "origin-price": "8074.77"
          "diff-price": "2518.17"
          "ids":
            "z0http": "1-3-z0http"
            "z0https": "1-3-z0https"
            "z1http": "1-3-z1http"
            "z1https": "1-3-z1https"
            "z3http": "1-3-z3http"
            "z3https": "1-3-z3https"
        "duration-6":
          "price": "10886.4"
          "origin-price": "16149.54"
          "diff-price": "5263.14"
          "ids":
            "z0http": "1-6-z0http"
            "z0https": "1-6-z0https"
            "z1http": "1-6-z1http"
            "z1https": "1-6-z1https"
            "z3http": "1-6-z3http"
            "z3https": "1-6-z3https"
      "comb-pack-2":
        "duration-1":
          "price": "1920"
          "origin-price": "2734.59"
          "diff-price": "814.59"
          "ids":
            "z0http": "2-1-z0http"
            "z0https": "2-1-z0https"
            "z1http": "2-1-z1http"
            "z1https": "2-1-z1https"
            "z3http": "2-1-z3http"
            "z3https": "2-1-z3https"
        "duration-3":
          "price": "5646.6"
          "origin-price": "8203.77"
          "diff-price": "2557.17"
          "ids":
            "z0http": "2-3-z0http"
            "z0https": "2-3-z0https"
            "z1http": "2-3-z1http"
            "z1https": "2-3-z1https"
            "z3http": "2-3-z3http"
            "z3https": "2-3-z3https"
        "duration-6":
          "price": "11066.4"
          "origin-price": "16407.54"
          "diff-price": "5341.14"
          "ids":
            "z0http": "2-6-z0http"
            "z0https": "2-6-z0https"
            "z1http": "2-6-z1http"
            "z1https": "2-6-z1https"
            "z3http": "2-6-z3http"
            "z3https": "2-6-z3https"
      "comb-pack-3":
        "duration-3":
          "price": "19120.2"
          "origin-price": "32215.77"
          "diff-price": "13095.57"
          "ids":
            "z0http": "3-3-z0http"
            "z0https": "3-3-z0https"
            "z1http": "3-3-z1http"
            "z1https": "3-3-z1https"
            "z3http": "3-3-z3http"
            "z3https": "3-3-z3https"
        "duration-6":
          "price": "31202.7"
          "origin-price": "56295.54"
          "diff-price": "25092.84"
          "ids":
            "z0http": "3-6-z0http"
            "z0https": "3-6-z0https"
            "z1http": "3-6-z1http"
            "z1https": "3-6-z1https"
            "z3http": "3-6-z3http"
            "z3https": "3-6-z3https"
        "duration-12":
          "price": "45295.2"
          "origin-price": "104455.08"
          "diff-price": "59159.88"
          "ids":
            "z0http": "3-12-z0http"
            "z0https": "3-12-z0https"
            "z1http": "3-12-z1http"
            "z1https": "3-12-z1https"
            "z3http": "3-12-z3http"
            "z3https": "3-12-z3https"
      "comb-pack-4":
        "duration-3":
          "price": "19540.2"
          "origin-price": "32860.77"
          "diff-price": "13320.57"
          "ids":
            "z0http": "4-3-z0http"
            "z0https": "4-3-z0https"
            "z1http": "4-3-z1http"
            "z1https": "4-3-z1https"
            "z3http": "4-3-z3http"
            "z3https": "4-3-z3https"
        "duration-6":
          "price": "32042.7"
          "origin-price": "57585.54"
          "diff-price": "25542.84"
          "ids":
            "z0http": "4-6-z0http"
            "z0https": "4-6-z0https"
            "z1http": "4-6-z1http"
            "z1https": "4-6-z1https"
            "z3http": "4-6-z3http"
            "z3https": "4-6-z3https"
        "duration-12":
          "price": "46975.2"
          "origin-price": "107035.08"
          "diff-price": "60059.88"
          "ids":
            "z0http": "4-12-z0http"
            "z0https": "4-12-z0https"
            "z1http": "4-12-z1http"
            "z1https": "4-12-z1https"
            "z3http": "4-12-z3http"
            "z3https": "4-12-z3https"

    priceAndIds = priceAndPackIdMap[combPackType]['duration-'+duration]
    return {
      price: priceAndIds.price
      originPrice: priceAndIds['origin-price']
      diffPrice: priceAndIds['diff-price']
      packId: priceAndIds.ids[zone+protocal]
    }

  setCombPackPriceAndId = (combPackEl, price, originPrice, diffPrice, packId) ->
    combPackEl.find('.price').text(price)
    combPackEl.find('.origin-price').text(originPrice)
    combPackEl.find('.diff-price').text(diffPrice)

  updateCombPackEl = (el) ->
    m = combPackElToModel(el)
    p = getPriceAndPackId(m.combPackType, m.duration, m.zone, m.protocal)
    setCombPackPriceAndId(el, p.price, p.originPrice, p.diffPrice, p.packId)

  if $2019double12EventPage.length > 0
    combPacks = $2019double12EventPage.find('.comb-pack')
    for el in combPacks
      updateCombPackEl($(el))
    combPacks.on 'change', ->
      updateCombPackEl($(@))
