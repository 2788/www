$(document).ready ->
  $productSVESDKPage = $('.products-page-svesdk')
  $bannerDemoDownloadBtn = $productSVESDKPage.find('.jumbotron.hero.hero-svesdk .container .row .demo-download')

  bindBannerDemoDownloadBtn = () ->
    if $bannerDemoDownloadBtn.length > 0
      $bannerDemoDownloadBtn.on 'click', (e) ->
        e.preventDefault()
        $targetDom = $productSVESDKPage.find('.features.feature-svesdk-product')
        if $targetDom.length > 0
          offsetTop = $targetDom[0].offsetTop
          $('html, body').animate({scrollTop: offsetTop - 100 + 'px'}, 500)

  if $productSVESDKPage.length > 0
    bindBannerDemoDownloadBtn()
