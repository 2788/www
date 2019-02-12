$(document).ready ->
  $modal = $('#feedback-modal')
  $webform = $('.web-form')
  $alertSuccess = $('#feedback-alert-success')
  $alertError = $('#feedback-alert-error')
  $alertLink = $('#feedback-alert-link')
  $form = $('#feedback-form')
  $content = $('#feedback-content')
  $name = $('#feedback-name')
  $phone = $('#feedback-phone')
  $submitBtn = $('#feedback-submit')[0]
  $submitAfter = $('.submit-after')
  $submitSuccess = $(".submit-success")
  $submitErr = $(".submit-err")

  # 弹出框自动焦点到咨询内容输入框
  $modal.on 'shown.bs.modal', ->
    $content.focus()

  $modal.on 'hidden.bs.modal', ->
    $form.show()
    $alertSuccess.hide()
    $alertError.hide()
    $alertLink.hide()
    $submitBtn.disabled = true
    # 重新验证一下 form
    feedbackValidate = new inputValidate("#feedback-form")

  # input 及时验证，form btn 检验
  feedbackValidate = new inputValidate("#feedback-form")

  $form.on 'ajax:beforeSend', (event, xhr, settings)->
    settings.url = settings.url + '-' + new Date().getTime()

  # 表单改版，提交结果模态框不自动关闭，添加导流文案
  # https://jira.qiniu.io/browse/BO-6391
  $form.on 'ajax:success', (event, xhr, status, error)->
    $alertSuccess.show()
    $alertError.hide()
    $alertLink.show()
    $form.hide()
    $webform.hide()
    $submitAfter.show()
    $submitSuccess.show()
    $submitErr.hide()
    $('#feedback-form .form-control').val('')

  # 表单改版，提交结果模态框不自动关闭，添加导流文案
  # https://jira.qiniu.io/browse/BO-6391
  $form.on 'ajax:error', (event, xhr, status, error)->
    $alertError.show()
    $alertSuccess.hide()
    $alertLink.show()
    $form.hide()
    $webform.hide()
    $submitAfter.show()
    $submitSuccess.hide()
    $submitErr.show()
