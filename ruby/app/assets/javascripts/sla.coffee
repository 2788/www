# controll a active && section active
$(document).ready ->
  $('.features-sla section').hide()
  current = $('.features-sla .action').attr('id')
  $('.features-sla .active').removeClass('active')
  $('.features-sla .li_' + current).addClass('active')
  $('.features-sla .' + current).show()