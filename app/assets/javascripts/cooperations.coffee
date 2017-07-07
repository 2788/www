# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
$(document).ready ->
  # channel validate and post
  $modal = $('#channel-modal')
  $alert = $('#channel-alert')
  $form = $('#channel-form')
  $content = $('#channel-content')
  $name = $('#channel-name')
  $phone = $('#channel-phone')
  $submitBtn = $('#channel-submit')

  # 弹出框自动焦点到咨询内容输入框
  $modal.on 'shown.bs.modal', ->
    $('#channel-content').focus()

  $modal.on 'hidden.bs.modal', ->
    $form.show()
    $alert.hide()

  # input 即使验证，form btn 检验
  channelValidate = new inputValidate("#channel-form");

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

  # developer validate and post
$(document).ready ->
  $modal = $('#developer-modal')
  $alert = $('#developer-alert')
  $form = $('#developer-form')
  $content = $('#developer-content')
  $name = $('#developer-name')
  $phone = $('#developer-phone')
  $submitBtn = $('#developer-submit')

  # 弹出框自动焦点到咨询内容输入框
  $modal.on 'shown.bs.modal', ->
    $('#developer-content').focus()

  $modal.on 'hidden.bs.modal', ->
    $form.show()
    $alert.hide()

  # input 即使验证，form btn 检验
  developerValidate = new inputValidate("#developer-form");

  $form.on 'ajax:beforeSend', (event, xhr, settings)->
    settings.url = settings.url + '-' + new Date().getTime()

  $form.on 'ajax:success', (event, xhr, status, error)->
    $alert.attr('class', 'alert alert-success').html('<i class="glyphicon glyphicon-ok"></i> 提交成功！').show()
    setTimeout ->
      $modal.modal('hide')
      $('#developer-form .form-control').val('')
    , 1000 * 1.5

  $form.on 'ajax:error', (event, xhr, status, error)->
    $alert.attr('class', 'alert alert-danger').html('<i class="glyphicon glyphicon-remove"></i> 提交失败，稍后重试！').show()
    setTimeout ->
      $modal.modal('hide')
    , 1000 * 1.5