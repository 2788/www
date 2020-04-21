$(document).ready ->
  $indexBannerContainer = $('.welcome-page-index .banners-slider')

  initBannerSlider = () ->
    $indexBannerContainer.slick
      dots: true
      autoplay: true
      autoplaySpeed: 4000
      arrows: false
      slidesToShow: 1
      slidesToScroll: 1
    $indexBannerContainer.find('.slick-dots').addClass('banners-arrow')

  prependBanner = (list) ->
    if $indexBannerContainer.length > 0
      list.map (banner) ->
        if !banner?
          return null

        jumpLink = banner.link || ''
        bannerStr = """
          <div
            class="jumbotron hero"
            title=#{ banner.title || "" }
            style="background-image: url(#{ banner.image_src });">
          </div>
        """

        if jumpLink
          bannerStr = """
            <a
              class="dynamic-banner-link"
              href=#{ jumpLink || "" }
              title=#{ banner.title || "" }
              target="_blank">
              #{ bannerStr }
            </a>
          """
        return $indexBannerContainer.prepend bannerStr

  if $indexBannerContainer.length > 0
    uuid = generateUUID()
    timestamp = new Date().getTime()
    $.ajax
      method: 'GET',
      url: '/banner/dynamic?u=' + uuid + '&t=' + timestamp,
      success: (res) ->
        if res && res.is_success && res.data && res.data.length > 0
          prependBanner res.data
          initBannerSlider()
      error: () ->
        initBannerSlider()
