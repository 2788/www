$(document).ready ->
  $kodoGoglobalPage = $('.products-page-kodo_goglobal')

  $kodoGoglobalCombos = $('.products-page-kodo_goglobal .features-kodogoglobal-combo .col-combo')
  $kodoGoglobalProCombo = $('.products-page-kodo_goglobal .features-kodogoglobal-combo .col-combo.pro-combo')

  $kodoGoglobalStanComboBtn = $('.products-page-kodo_goglobal .features-kodogoglobal-combo .col-combo.stan-combo .btn-combo')
  $kodoGoglobalProComboBtn = $('.products-page-kodo_goglobal .features-kodogoglobal-combo .col-combo.pro-combo .btn-combo')
  $kodoGoglobalExceComboBtn = $('.products-page-kodo_goglobal .features-kodogoglobal-combo .col-combo.exce-combo .btn-combo')

  $kodoGoglobalClientSlider = $('.products-page-kodo_goglobal .features-kodogoglobal-client .kodogoglobal-client-slider')

  $kodoGoglobalBottomStartBtn = $('.products-page-kodo_goglobal .features-kodogoglobal-footer .container .btn-start')

  kodoGoglobalJinshujuURL = 'https://jinshuju.net/f/IT4S7n?x_field_1='

  kodoGoglobalProComboOffsetTop = 0

  bindKodoGoglobalWindowResize = () ->
    $(window).resize ->
      calcKodoGoglobalProComboOffsetTop()

  calcKodoGoglobalProComboOffsetTop = () ->
    if $kodoGoglobalProCombo.length > 0
      if document.body.clientWidth > 768
        kodoGoglobalProComboOffsetTop = $kodoGoglobalProCombo[0].offsetTop - 100 || 0
      else
        timeOut = setTimeout ->
          kodoGoglobalProComboOffsetTop = $kodoGoglobalProCombo[0].offsetTop - 150 || 0
          clearTimeout timeOut
        , 500

  bindSlickEventTOKodoGoglobalClientSlider = () ->
    if $kodoGoglobalClientSlider.length > 0
      $kodoGoglobalClientSlider.slick
        dots: true
        autoplay: true
        autoplaySpeed: 4000
        arrows: false
        slidesToShow: 1
        slidesToScroll: 1

  bindMouseEnterLeaveTOKodoGoglobalCombos = () ->
    if $kodoGoglobalCombos.length > 0
      $kodoGoglobalCombos.on 'mouseenter', () ->
        if $(this).hasClass 'col-active'
          return
        $kodoGoglobalCombos.removeClass 'col-active'
        $(this).addClass 'col-active'

      $kodoGoglobalCombos.on 'mouseleave', () ->
        if $kodoGoglobalProCombo.hasClass 'col-active'
          return
        $kodoGoglobalCombos.removeClass 'col-active'
        $kodoGoglobalProCombo.addClass 'col-active'

  bindScrollTOKodoGoglobalBottomStartBtn = () ->
    if $kodoGoglobalBottomStartBtn.length > 0
      $kodoGoglobalBottomStartBtn.on 'click', (e) ->
        e.preventDefault()
        $('html, body').animate({scrollTop: kodoGoglobalProComboOffsetTop + 'px'}, 500)

  changeBtnEventOFKodoGoglobalCombos = (uid) ->
    # 标准版立即使用按钮
    if $kodoGoglobalStanComboBtn.length > 0
      $kodoGoglobalStanComboBtn.attr 'href', $kodoGoglobalStanComboBtn[0].origin + '/bucket'

    # 专业版立即申请按钮
    if $kodoGoglobalProComboBtn.length > 0 && uid
      $kodoGoglobalProComboBtn.attr 'href', kodoGoglobalJinshujuURL + uid

    # 卓越版立即咨询按钮
    if $kodoGoglobalExceComboBtn.length > 0
      $kodoGoglobalExceComboBtn.attr 'href', ''
      $kodoGoglobalExceComboBtn.attr 'target', ''
      $kodoGoglobalExceComboBtn.attr 'data-toggle', 'modal'
      $kodoGoglobalExceComboBtn.attr 'data-target', '#feedback-modal'

  getUserInfo = () ->
    uuid = generateUUID()
    timestamp = new Date().getTime()
    $.ajax
      method: 'GET',
      url: '/userinfo?u=' + uuid + '&t=' + timestamp,
      success: (res) ->
        if res.is_signin
          changeBtnEventOFKodoGoglobalCombos(res.uid)

  # start
  if $kodoGoglobalPage.length > 0
    bindKodoGoglobalWindowResize()
    calcKodoGoglobalProComboOffsetTop()
    bindSlickEventTOKodoGoglobalClientSlider()
    bindMouseEnterLeaveTOKodoGoglobalCombos()
    bindScrollTOKodoGoglobalBottomStartBtn()
    getUserInfo()
