# This is a manifest file that'll be compiled into application.js, which will include all the files
# listed below.
#
# Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
# or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
#
# It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
# compiled file. JavaScript code in this file should be added after the last require_* statement.
#
# Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
# about supported directives.
#
#= require jquery
#= require jquery_ujs
#= require bootstrap
#= require jquery.slick
#= require data
#= require queryURL
#= require cxselect
#= require cityData
#= require social-share-button
#= require social-share-button/wechat
#= require smint

#= require validate
#= require events
#= require prices
#= require feedbacks
#= require recommendations
#= require cooperations
#= require about
#= require sla
#= require career
#= require blog
#= require newmedia
#= require alaccelerator

isMobile = false; # initiate as false
# device detection
isMobile = true if /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
isMobile = true if /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))

setSEORefer = () ->
  ref = document.referrer
  if ref && ref.length > 0 && ref.indexOf('qiniu.com') < 0 && ref.indexOf('qiniu.io') < 0
    expire = new Date()
    expire.setDate(expire.getDate() + 3)
    document.cookie = 'qiniu_seo_refer=' + ref + ';domain=.qiniu.com;path=/;expires=' + expire


# 首页成功案例
$(document).ready ->
  setSEORefer()
  # 添加 ref
  $('body').on 'click', "a", (e)->
    href = $(this).prop('href')
    hostname = $('<a>').prop('href', href).prop('hostname')
    ref = 'ref=' + window.location.hostname
    if hostname && hostname.length > 0 && window.location.hostname != hostname && href.indexOf(ref) < 0
      connector = if /\?/.test(href) then '&' else '?'
      href += connector + ref
      $(this).prop('href', href)

  $('[data-toggle="tooltip"]').tooltip()

  $('#index-cases-slider').slick
    dots: true
    autoplay: true
    autoplaySpeed: 2000
    arrows: false
    slidesToShow: 6
    slidesToScroll: 6
    responsive: [{
      breakpoint: 1024
      settings:
        slidesToShow: 3
        slidesToScroll: 3
    },{
      breakpoint: 600
      settings:
        slidesToShow: 3
        slidesToScroll: 3
    },{
      breakpoint: 480
      settings:
        slidesToShow: 3
        slidesToScroll: 3
    },{
      breakpoint: 320
      settings:
        slidesToShow: 2
        slidesToScroll: 2
    }]

 # 导航栏菜单
  if isMobile
    $('.panel').on 'touchstart', ->
      $(this).find('.panel-sort').toggleClass('actived')
    $('#spaces-dropdown, #solution-dropdown, #user-dropdown').on 'touchstart', ->
      $(this).find('.dropdown-toggle').toggleClass('actived')
  else
    $('#solution-dropdown-title').on 'click', ->
      locale = if window.location.pathname.split('/')[1] == 'en' then '/en/solutions' else '/solutions'
      window.location.href = window.location.origin + locale
    $('#spaces-dropdown, #solution-dropdown, #user-dropdown').hover ->
      $(this).addClass('open')
    , ->
      $(this).removeClass('open')

  if document.documentElement.clientWidth > 415
    # dropdown menu scroll or not
    $services = $('.services-menu')
    $servicesH = $services.height()

    $solutions = $('.solutions-menu')
    $solutionsH = $solutions.height()

    _servicesIsmin = document.documentElement.clientHeight - 68 < $servicesH
    _solutionsIsmin = document.documentElement.clientHeight - 68 < $solutionsH

    if _servicesIsmin
      $maxH = document.documentElement.clientHeight - 68 + 'px'
      $services.css({
        "max-height": $maxH,
        "overflow-y": "auto"
      }).addClass("scrollbar-light")
    else
     $services.css({
        "max-height": "none"
      }).removeClass("scrollbar-light")

    if _solutionsIsmin
      $maxH = document.documentElement.clientHeight - 68 + 'px'
      $solutions.css({
        "max-height": $maxH,
        "overflow-y": "auto"
      }).addClass("scrollbar-light")
    else
      $solutions.css({
        "max-height": "none"
      }).removeClass("scrollbar-light")

    $(window).resize ->
      $isMobile = document.documentElement.clientWidth < 750
      console.log($isMobile)
      if document.documentElement.clientHeight - 68 < $servicesH && !$isMobile
        $maxH = document.documentElement.clientHeight - 68 + 'px'
        $services.css({
          "max-height": $maxH,
          "overflow-y": "auto"
        }).addClass("scrollbar-light")
      else
        $services.css({
          "max-height": "none"
        }).removeClass("scrollbar-light")

      if document.documentElement.clientHeight - 68 < $solutionsH && !$isMobile
        $maxH = document.documentElement.clientHeight - 68 + 'px'
        $solutions.css({
          "max-height": $maxH,
          "overflow-y": "auto"
        }).addClass("scrollbar-light")
      else
        $solutions.css({
          "max-height": "none"
        }).removeClass("scrollbar-light")

  # 文档侧边导航栏隐藏与展开
  $('.sidebar-toggle').click ->
    $('.blog-page').toggleClass('sidebar-collapse')


  # 悬浮按钮（咨询反馈）关闭
  # TODO: 记录 cookie
  $('.helper .close-btn').click ->
    $('.helper').hide()

  # mobile 底部注册导航 关闭
  $('.fixed-b .stripe-close-btn').click ->
    $('.footer-sign').hide()

  # weixin
  $('.weixin').on 'click', (e)->
    e.stopPropagation()
    $('#wexin-qrcode-popover').toggle()

  $('html,body').on 'click', ->
    $('#wexin-qrcode-popover').hide()

# 客户案例
$(document).ready ->
  $('#cases-slider').slick
    slidesToShow: 6
    slidesToScroll: 6
    responsive: [{
      breakpoint: 1024
      settings:
        slidesToShow: 6
        slidesToScroll: 6
    },{
      breakpoint: 600
      settings:
        slidesToShow: 4
        slidesToScroll: 4
    },{
      breakpoint: 480
      settings:
        slidesToShow: 3
        slidesToScroll: 3
    },{
      breakpoint: 320
      settings:
        slidesToShow: 2
        slidesToScroll: 2
    }]
  # banner slider
  $('.banners-slider').slick
    dots: true
    autoplay: true
    autoplaySpeed: 2000
    arrows: false
    slidesToShow: 1
    slidesToScroll: 1
  $('.banners-slider .slick-dots').addClass('banners-arrow')

listenScroll = (json) ->
  defaultVar =
    'fxdClass':'fxd'
    'elem': 'elem'
    'prevPosition': 'relative'
  json = json or defaultVar
  fxd = json.fxdClass
  prevPosition = json.prevPosition
  myElem = json.elem
  myOffset = myElem.height()
  # document.ready set nav-bar-style
  if $(window).scrollTop() > 0
    myElem.css({
      'position': 'fixed'}).addClass fxd
    # When an item is fixed, its removed from the flow so its height doesnt impact the other items on the page
  else
    myElem.css(
      'position': prevPosition
      ).removeClass fxd
  $(window).scroll ->
    # current distance top
    if $(window).width() < 768
      return
    scrollTop = $(window).scrollTop()
    # if we scroll more than the navigation, change its position to fixed and add class 'fxd', otherwise change it back to absolute and remove the class
    if scrollTop > 0
      myElem.css({
        'position': 'fixed'}).addClass fxd
      # When an item is fixed, its removed from the flow so its height doesnt impact the other items on the page
    else
      myElem.css(
        'position': prevPosition
        ).removeClass fxd

# 监控滚动 导航
$(document).ready ->
  listenScroll
    'elem': $('#navbar')
    'fxdClass': 'nav-bg'
    'prevPosition': 'fixed'
  return

#中部导航
$(document).ready ->
  $('.navbar-wrapper-middle').smint 'fxdClass':'relative'
  return

# ourcompany timeline
$(document).ready ->
  if document.body.clientWidth <= 768
    $('.timeline-ul').find('.left-li').addClass('right')
    $('.timeline-ul').find('.left-li').removeClass('left')
  else
    $('.timeline-ul').find('.left-li').addClass('left')
    $('.timeline-ul').find('.left-li').removeClass('right')

  ismin = document.body.clientWidth <= 768
  $(window).resize ->
    if document.body.clientWidth <= 768 && !ismin
      $('.timeline-ul').find('.left-li').addClass('right')
      $('.timeline-ul').find('.left-li').removeClass('left')
    else if document.body.clientWidth > 768 && ismin
      $('.timeline-ul').find('.left-li').addClass('left')
      $('.timeline-ul').find('.left-li').removeClass('right')

# get userinfo
$(document).ready ->
  $.ajax
    method: 'GET',
    url: '/userinfo',
    success: (res) ->
      if !res.is_signin
        $('.need-signin').removeClass 'hidden'
      else
        $('.need-signin').addClass 'hidden'
        $('.user-email').text res.email
        $('.userinfo').removeClass 'hidden'
    error: (err) ->
      $('.need-signin').removeClass 'hidden'
