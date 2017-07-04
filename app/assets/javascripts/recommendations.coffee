# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
$(document).ready ->
  $webform = $('.web-form')
  $form = $('#recommendation-form')
  $company = $('#recommendation-company')
  $website = $('#recommendation-website')
  $business = $('#recommendation-business')
  $name = $('#recommendation-name')
  $phone = $('#recommendation-phone')
  $im = $('#recommendation-im')
  $email = $('#recommendation-email')
  $submitBtn = $('#recommendation-submit')
  $submitSuccess = $(".submit-success")
  $submitErr = $(".submit-err")

  $submitSuccess.hide()
  $submitErr.hide()

  # 检验输入框
  $('#recommendation-form .form-control').keyup ->
    if $.trim($company.val()) != "" && $.trim($website.val()) != "" && $.trim($business.val()) != "" && $.trim($name.val()) != "" && $.trim($phone.val()) != "" && $.trim($im.val()) != "" && $.trim($email.val()) != ""
      $submitBtn.prop('disabled', false)
    else
      $submitBtn.prop('disabled', true)

  # onblur时及时验证
  recommendatiomnValidate = new inputValidate("#recommendation-form");

  $form.on 'ajax:beforeSend', (event, xhr, settings)->
    settings.url = settings.url + '-' + new Date().getTime()

  $form.on 'ajax:success', (event, xhr, status, error)->
    $webform.hide()
    $('#recommendation-form .form-control').val('')
    $submitSuccess.show()
    $submitErr.hide()

  $form.on 'ajax:error', (event, xhr, status, error)->
    $webform.hide()
    $submitSuccess.hide()
    $submitErr.show()