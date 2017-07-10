$(document).ready ->
  $modal = $('#feedback-modal')
  $webform = $('.web-form')
  $alert = $('#feedback-alert')
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
    $alert.hide()

  # input 即使验证，form btn 检验
  feedbackValidate = new inputValidate("#feedback-form");

  $form.on 'ajax:beforeSend', (event, xhr, settings)->
    settings.url = settings.url + '-' + new Date().getTime()

  $form.on 'ajax:success', (event, xhr, status, error)->
    $alert.attr('class', 'alert alert-success').html('<i class="glyphicon glyphicon-ok"></i> 提交成功！').show()
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
    $alert.attr('class', 'alert alert-danger').html('<i class="glyphicon glyphicon-remove"></i> 提交失败，稍后重试！').show()
    $form.hide()
    $webform.hide()
    $submitAfter.show()
    $submitSuccess.hide()
    $submitErr.show()
    setTimeout ->
      $modal.modal('hide')
    , 1000 * 1.5