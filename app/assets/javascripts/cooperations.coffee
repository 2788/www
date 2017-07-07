# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
$(document).ready ->
  # channel,developer validate and post
  $modal = $('.web-form')
  $alert = $('.submit-alert')
  $form = $('#channel-form, #developer-form')
  $submitBtn = $('#channel-submit #developer-submit')

  # 弹出框自动焦点到咨询内容输入框
  $modal.on 'shown.bs.modal', ->
    $('#channel-content').focus()

  $modal.on 'hidden.bs.modal', ->
    $form.show()
    $alert.hide()

  # channel input 即使验证，form btn 检验
  channelValidate = new inputValidate("#channel-form");

  # developer input 即使验证，form btn 检验
  developerValidate = new inputValidate("#developer-form");

  $form.on 'ajax:beforeSend', (event, xhr, settings)->
    settings.url = settings.url + '-' + new Date().getTime()

  $form.on 'ajax:success', (event, xhr, status, error)->
    $alert.attr('class', 'alert alert-success').html('<i class="glyphicon glyphicon-ok"></i> 提交成功！').show()
    setTimeout ->
      $modal.modal('hide')
      $('#channel-form .form-control').val('')
    , 1000 * 1.5

  $form.on 'ajax:error', (event, xhr, status, error)->
    $alert.attr('class', 'alert alert-danger').html('<i class="glyphicon glyphicon-remove"></i> 提交失败，稍后重试！').show()
    setTimeout ->
      $modal.modal('hide')
    , 1000 * 1.5