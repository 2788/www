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
  $submitAfter = $('.submit-after')
  $submitSuccess = $(".submit-success")
  $submitErr = $(".submit-err")

  # input 即使验证，form btn 检验
  recommendatiomnValidate = new inputValidate("#recommendation-form");

  $form.on 'ajax:beforeSend', (event, xhr, settings)->
    settings.url = settings.url + '-' + new Date().getTime()

  $form.on 'ajax:success', (event, xhr, status, error)->
    $webform.hide()
    $submitAfter.show()
    $submitSuccess.show()
    $submitErr.hide()
    $('#recommendation-form .form-control').val('')

  $form.on 'ajax:error', (event, xhr, status, error)->
    $webform.hide()
    $submitAfter.show()
    $submitSuccess.hide()
    $submitErr.show()

  $('#province_city').cxSelect
    data: window.city
    selects: [
      'province'
      'city'
    ]
    emptyStyle: 'none'