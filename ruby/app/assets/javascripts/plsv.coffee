$(document).ready ->
  # services mouseenter
  $('.plsv-services .direction .img-box').mouseenter ->
    desc = '.plsv-services .description.' + $(this).attr('data')
    phone = '.plsv-services .iphone-box.' + $(this).attr('data')

    # direction img-box
    $('.plsv-services .direction .img-box').removeClass('hover')
    $(this).addClass('hover')

    # description
    $('.plsv-services .description').removeClass('hover')
    $(desc).addClass('hover')

    # iphone-box
    $('.plsv-services .iphone-box').removeClass('hover')
    $(phone).addClass('hover')

  # programme mouseenter
  $('.programme .step').mouseenter ->
    $('.programme .step').removeClass('active')
    $(this).addClass('active')

  # allfunction mouseenter
  $('.tab-content-allfunction .nav-tabs-allfunction a').mouseenter ->
    $(this).tab('show')
