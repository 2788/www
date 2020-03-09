$(document).ready ->
  $('.alaccelerator-bg .price-box').mouseenter ->
    $('.price-box.active').removeClass('active')
    $(this).addClass('active')