# controll a active && section active
$(document).ready ->
  $('section').hide()
  current = $('.action').attr('id')
  $('#about-left-bar .active').removeClass('active')
  $('.li_' + current).addClass('active')
  $('.' + current).show()