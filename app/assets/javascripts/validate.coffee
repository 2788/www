do (window, document) ->
  tel_rule = /^1[0-9]{10}/ #手机号
  regPhone_rule = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/ #电话
  email_rule = /[a-zA-Z0-9]{1,10}@[a-zA-Z0-9]{1,5}\.[a-zA-Z0-9]{1,5}/

  # show error filed，edit class -> active

  showErrorField = (info_field) ->
    error_field = info_field.nextSibling.nextSibling
    $(error_field).addClass 'active'
    return

  # hide error filed，edit class -> remove active

  hideErrorField = (info_field) ->
    error_field = info_field.nextSibling.nextSibling
    $(error_field).removeClass 'active'
    return

  # input value is null and then return true

  isNull = (_value) ->
    if _value == null or _value == undefined or _value == ''
      true
    else
      false

  # validate one input

  validate = (id, typeInfo) ->
    element = document.getElementById(id)
    _value = element.value
    switch typeInfo
      when 'email'
        if !email_rule.test(_value)
          showErrorField element
        else
          hideErrorField element
      when 'tel'
        if !tel_rule.test(_value) and !regPhone_rule.test(_value)
          showErrorField element
        else
          hideErrorField element
      else
        if isNull(_value)
          showErrorField element
        else
          hideErrorField element
    true

  # validate all inputs that need to validate

  inputValidate = (form_id) ->
    _module = document.querySelector(form_id)
    input_arr = _module.querySelectorAll('div.form-group > div.col-sm-10 > input')
    textarea_arr = _module.querySelectorAll('div.form-group > div.col-sm-10 > textarea')
    i = 0
    while i < input_arr.length
      #check to validate or not
      isvalidate = input_arr[i].getAttribute('validate')
      if isvalidate
        #bind onblurEvent for every input in this 'demo' form
        input_arr[i].onblur = ((input_index) ->
          ->
            validate(input_arr[input_index].id, input_arr[input_index].type)
        )(i)
        #this is a closed scope will be caused by your function maybe!so do this
        input_arr[i] = null
        #destroy element avoid the memory leak
      i++
    j = 0
    while j < textarea_arr.length
      #check to validate or not
      isvalidate = textarea_arr[j].getAttribute('validate')
      if isvalidate
        #bind onblurEvent for every input in this 'demo' form
        textarea_arr[j].onblur = ((textarea_index) ->
          ->
            validate(textarea_arr[textarea_index].id, textarea_arr[textarea_index].type)
        )(j)
        #this is a closed scope will be caused by your function maybe!so do this
        textarea_arr[j] = null
        #destroy element avoid the memory leak
      j++
    return

  # API
  window.inputValidate = inputValidate
  return

###
# 使用方式：
# 1不通用。需要在验证的input框后面添加 验证label
# 2通过给label添加active来触发其错误信息显示样式
# 3引用该JS后 直接在自己代码中写入  var validation=new inputValidate("form-id");即可
###