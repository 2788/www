$(document).ready ->
  $modal = $('#feedback-modal')

  # 弹出框自动焦点到咨询内容输入框
  $modal.on 'shown.bs.modal', ->
    $('#feedback-content').focus()

  $form = $('#feedback-form')
  $content = $('#feedback-content')
  $name = $('#feedback-name')
  $phone = $('#feedback-phone')

  # 检验输入框
  $('#feedback-form .form-control').keyup ->
    if $.trim($content.val()) != "" && $.trim($name.val()) != "" && $.trim($phone.val()) != ""
      $('#feedback-submit').prop('disabled', false)
    else
      $('#feedback-submit').prop('disabled', true)

  # 提交反馈表单
  $('#feedback-submit').click ->
    feedbackData = $form.serializeArray()
    $.ajax({
      url : '/feedbacks?'+new Date().getTime(),
      type: "POST",
      data : feedbackData,
      success: (data, textStatus, jqXHR) ->
        console.log "success"
      error: (jqXHR, textStatus, errorThrown) ->
        console.log "error"
    });

    # $modal.modal('hide')