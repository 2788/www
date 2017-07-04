# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
$(document).ready ->
  $website = $('.web-form')
  $alert = $('#recommendation-alert')
  $form = $('#recommendation-form')
  $company = $('#recommendation-company')
  $website = $('#recommendation-website')
  $business = $('#recommendation-business')
  $name = $('#recommendation-name')
  $phone = $('#recommendation-phone')
  $im = $('#recommendation-im')
  $email = $('#recommendation-email')
  $submitBtn = $('#recommendation-submit')

  # 检验输入框
  $('#recommendation-form .form-control').keyup ->
    if $.trim($company.val()) != "" && $.trim($website.val()) != "" && $.trim($business.val()) != "" && $.trim($name.val()) != "" && $.trim($phone.val()) != "" && $.trim($im.val()) != "" && $.trim($email.val()) != ""
      $submitBtn.prop('disabled', false)
    else
      $submitBtn.prop('disabled', true)

  $('#recommendation-form .form-control').change ->
    if $(this).attr 'validate'
      myType = $(this).attr 'type'

  # onblur时及时验证
  recommendationValidate = new inputValidate("#recommendation-form");

  $form.on 'ajax:beforeSend', (event, xhr, settings)->
    settings.url = settings.url + '-' + new Date().getTime()

  $form.on 'ajax:success', (event, xhr, status, error)->
    $alert.attr('class', 'alert alert-success').html('<i class="glyphicon glyphicon-ok"></i> 提交成功！').show()
    $form.hide()
    setTimeout ->
      $website.hide()
      $('#recommendation-form .form-control').val('')
    , 1000 * 1.5

  $form.on 'ajax:error', (event, xhr, status, error)->
    $alert.attr('class', 'alert alert-danger').html('<i class="glyphicon glyphicon-remove"></i> 提交失败，稍后重试！').show()
    setTimeout ->
      $website.hide()
    , 1000 * 1.5