# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
$(document).ready ->
  $('.grid-container').click (e) ->
    src = $(this).data('src')
    if src == "undefined" || src.length == 0
      return
    # 点击瞬间更改图标
    $(this).find('.btn-icon').addClass('btn-icon-visited');
    # 赋值video的src
    $('#edu-video').attr('src', src);
    # 展示video
    $('#video-play-modal').modal('show')

$(document).ready ->
  # 点击完成恢复
    $('#video-play-modal').on 'hidden.bs.modal',->
      $(".btn-icon").removeClass('btn-icon-visited');