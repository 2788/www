$(document).ready ->
  $modal = $('#feedback-modal')
  $webform = $('.web-form')
  $alertSuccess = $('#feedback-alert-success')
  $alertError = $('#feedback-alert-error')
  $form = $('#feedback-form')
  $content = $('#feedback-content')
  $name = $('#feedback-name')
  $phone = $('#feedback-phone')
  $submitBtn = $('#feedback-submit')
  $submitAfter = $('.submit-after')
  $submitSuccess = $(".submit-success")
  $submitErr = $(".submit-err")

  # 弹出框自动焦点到咨询内容输入框
  $modal.on 'shown.bs.modal', ->
    $('#feedback-content').focus()

  $modal.on 'hidden.bs.modal', ->
    $form.show()
    $alertSuccess.hide()
    $alertError.hide()

  # input 即使验证，form btn 检验
  feedbackValidate = new inputValidate("#feedback-form");

  $form.on 'ajax:beforeSend', (event, xhr, settings)->
    settings.url = settings.url + '-' + new Date().getTime()

  $form.on 'ajax:success', (event, xhr, status, error)->
    $alertSuccess.show()
    $alertError.hide()
    $form.hide()
    $webform.hide()
    $submitAfter.show()
    $submitSuccess.show()
    $submitErr.hide()
    setTimeout ->
      $modal.modal('hide')
      $('#feedback-form .form-control').val('')
    , 1000 * 1.5

  $form.on 'ajax:error', (event, xhr, status, error)->
    $alertError.show()
    $alertSuccess.hide()
    $form.hide()
    $webform.hide()
    $submitAfter.show()
    $submitSuccess.hide()
    $submitErr.show()
    setTimeout ->
      $modal.modal('hide')
    , 1000 * 1.5