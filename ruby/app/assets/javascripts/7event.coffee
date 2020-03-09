$(document).ready ->

  # 动态改变梯形的大小
  resizeTrapezoid = () ->
    wWidth = $(window).width()
    cWidth = $('.features-7event-present .container').width()
    bWdith = (wWidth - cWidth) / 2;
    $('.features-7event-present .trapezoid-large-rl, .trapezoid-small-rl').css 'border-right-width', bWdith + 'px'
    $('.features-7event-present .trapezoid-large-lr, .trapezoid-small-lr').css 'border-left-width', bWdith + 'px'

  resizeTrapezoid()

  $(window).resize ->
    resizeTrapezoid()