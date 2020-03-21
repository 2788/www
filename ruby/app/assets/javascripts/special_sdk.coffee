$(document).ready ->
  $productSpecialSDKPage = $('.products-page-special_sdk')
  $bannerDemoDownloadBtn = $productSpecialSDKPage.find('.jumbotron.hero.hero-special-sdk .container .row .demo-download')

  bindBannerDemoDownloadBtn = () ->
    if $bannerDemoDownloadBtn.length > 0
      $bannerDemoDownloadBtn.on 'click', (e) ->
        e.preventDefault()
        $targetDom = $productSpecialSDKPage.find('.features.feature-special-sdk-product')
        if $targetDom.length > 0
          offsetTop = $targetDom[0].offsetTop
          $('html, body').animate({scrollTop: offsetTop - 100 + 'px'}, 500)

  if $productSpecialSDKPage.length > 0
    bindBannerDemoDownloadBtn()
