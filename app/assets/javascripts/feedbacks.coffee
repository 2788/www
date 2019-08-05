$(document).ready ->
  $modal = $('#feedback-modal')
  $webform = $('.web-form')
  $alertSuccess = $('#feedback-alert-success')
  $alertError = $('#feedback-alert-error')
  $alertLink = $('#feedback-alert-link')
  $form = $('#feedback-form')
  $content = $('#feedback-content')
  $company = $('#feedback-company')
  $name = $('#feedback-name')
  $phone = $('#feedback-phone')
  $email = $('#feedback-email')
  $provinceCN = $('#province_city #province')
  $provinceEN = $('#province_city #feedback-province')
  $submitBtn = $('#feedback-submit')[0]
  $submitAfter = $('.submit-after')
  $submitSuccess = $(".submit-success")
  $submitErr = $(".submit-err")

  isFeedBackSubmitted = false
  begin_with_en_rule = /^(\/en)/

  shouldReportFeedbackDataTOSensors = () ->
    shouldReport = false
    location = window.location
    # 判断是否为英文页面
    isEnPage = begin_with_en_rule.test location.pathname

    if !!$content.val() ||
       !!$company.val() ||
       !!$name.val() ||
       !!$phone.val() ||
       !!$email.val()
      shouldReport = true

    if !isEnPage && !!$provinceCN.find('option:selected').val()
      shouldReport = true

    if isEnPage && !!$provinceEN.val()
      shouldReport = true

    return shouldReport

  getFeedbackReportOptions = () ->
    location = window.location

    options =
      $url: location.href
      $url_path: location.pathname
      feedback_content: $content.val() || ''
      feedback_company: $company.val() || ''
      feedback_name: $name.val() || ''
      feedback_phone: $phone.val() || ''
      feedback_email: $email.val() || ''

    # 判断是否为英文页面
    isEnPage = begin_with_en_rule.test location.pathname

    if !isEnPage
      options.feedback_province = $provinceCN.find('option:selected').val() || ''
    if isEnPage
      options.feedback_province = $provinceEN.val() || ''

    return options

  # 弹出框自动焦点到咨询内容输入框
  $modal.on 'shown.bs.modal', ->
    $content.focus()
    isFeedBackSubmitted = false

  $modal.on 'hidden.bs.modal', ->
    $form.show()
    $alertSuccess.hide()
    $alertError.hide()
    $alertLink.hide()
    $submitBtn.disabled = true
    # 重新验证一下 form
    feedbackValidate = new inputValidate("#feedback-form")
    shouldReport = shouldReportFeedbackDataTOSensors()
    if !isFeedBackSubmitted && shouldReport
      options = getFeedbackReportOptions()
      sensorsService.track 'QuitFeedback', options

  # input 及时验证，form btn 检验
  feedbackValidate = new inputValidate("#feedback-form")

  $form.on 'ajax:beforeSend', (event, xhr, settings)->
    settings.url = settings.url + '-' + new Date().getTime()
    isFeedBackSubmitted = true
    options = getFeedbackReportOptions()
    sensorsService.track 'Feedback', options

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
