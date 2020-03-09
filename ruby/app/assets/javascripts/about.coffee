# controll a active
$(document).ready ->
  current = $('.features-about section').attr('id')
  $('.features-about .active').removeClass('active')
  $('.features-about .' + current).addClass('active')
