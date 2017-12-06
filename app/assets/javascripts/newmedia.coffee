$(document).ready ->
  $('.newmedia .card').mouseenter ->
    $('.newmedia .card.active').removeClass('active')
    $(this).addClass('active')