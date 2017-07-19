# controll a active
$(document).ready ->
  current = $('section').attr('id')
  $('#about-left-bar .active').removeClass('active')
  $('.' + current).addClass('active')

