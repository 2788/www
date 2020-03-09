$(document).ready ->
  $downloadPage = $('.download-page')
  $navSigninBtn = $downloadPage.find('.navbar.navbar-default .nav.navbar-nav.navbar-right .need-signin .actions .btn.btn-hollow')
  $pageDownloadBtn = $downloadPage.find('.jumbotron.hero.hero-download .container .middle-container .btn-download')
  $needSigninModal = $downloadPage.find('#need-signin-modal')

  if $downloadPage.length > 0 && $pageDownloadBtn.length > 0

    bindPageDownloadBtnClickEvent = (isSignin) ->
      if !isSignin
        $pageDownloadBtn.attr 'href', ''
        $pageDownloadBtn.attr 'target', ''
        # 改变顶部导航栏登录按钮 redirect_url 地址
        navbarSigninURL = $navSigninBtn.attr 'href'
        $navSigninBtn.attr 'href', navbarSigninURL + window.location.pathname

      $pageDownloadBtn.on 'click', (e) ->
        e.preventDefault()

        if !isSignin
          # 当前为非登录状态
          $needSigninModal.modal 'show'
        else
          # 当前为登录状态
          fileLink = $(this).attr 'href'
          # 新建 tab 页打开
          window.open fileLink, '_blank'

    getUserInfo = () ->
      uuid = generateUUID()
      timestamp = new Date().getTime()
      $.ajax
        method: 'GET',
        url: '/userinfo?u=' + uuid + '&t=' + timestamp,
        success: (res) ->
          if res.is_signin
            bindPageDownloadBtnClickEvent true
          else
            bindPageDownloadBtnClickEvent false
        error: (err) ->
          bindPageDownloadBtnClickEvent false

    getUserInfo()