do (window, document) ->
  phone_rule = /^((\d{11})|^((\+86)|(86))?\d{11}$|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/ # 11位手机号码-可包含+86|86,3-4位区号，7-8位直播号码，1－4位分机号
  email_rule = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ # email

  # show error filed, edit class -> active

  showErrorField = (info_field) ->
    error_field = info_field.nextSibling.nextSibling
    $(info_field).addClass 'active'
    $(error_field).addClass 'active'
    return

  # hide error filed, edit class -> remove active

  hideErrorField = (info_field) ->
    error_field = info_field.nextSibling.nextSibling
    $(info_field).removeClass 'active'
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
          return true
        else
          return false
      when 'tel'
        if !phone_rule.test(_value)
          return true
        else
          return false
      else
        if isNull(_value)
          return true
        else
          return false
    true

  # validate all inputs that need to validate
  inputValidate = (form_id) ->
    _module = document.querySelector(form_id)
    if _module
      $submitBtn = _module.querySelectorAll('button')[0]
      input_arr = _module.querySelectorAll('input, textarea, select')
      validateJSON = {}
      i = 0
      while i < input_arr.length
        # check to validate or not
        isvalidate = input_arr[i].getAttribute('validate')
        if isvalidate
          # add status of every input which is to be validated, to a JSON
          bol = validate(input_arr[i].id, input_arr[i].type)
          validateJSON[i] = bol
          # bind onblurEvent for every input in this 'demo' form
          input_arr[i].onblur = ((input_index) ->
            ->
              validatedBol = validate(input_arr[input_index].id, input_arr[input_index].type)
              if validatedBol
                showErrorField input_arr[input_index]
              else
                hideErrorField input_arr[input_index]
              # status of JSON to be changed with the input value change
              validateJSON[input_index] = validatedBol
              trueNum = 0
              falseNum = 0
              for j of validateJSON
                if validateJSON[j]
                  trueNum += 1
                else
                  falseNum += 1
              if trueNum <= 0
                $submitBtn.disabled = false
              else
                $submitBtn.disabled = true
          )(i)
          # this is a closed scope will be caused by your function maybe so do this
          input_arr[i].onkeyup = ((i) ->
            ->
              validatedBol = validate(input_arr[i].id, input_arr[i].type)
              # status of JSON to be changed with the input value change
              validateJSON[i] = validatedBol
              flag = false
              for j of validateJSON
                if validateJSON[j] # when there is a wrong input then flag is true, meanning btn is disabled
                  flag = true
                  break
              if !flag
                $submitBtn.disabled = false
              else
                $submitBtn.disabled = true
          )(i)
          # if the dom node is select, then bind onchange event
          if input_arr[i].tagName == 'SELECT'
            # bind onchangeEvent for every select in this 'demo' form
            input_arr[i].onchange = ((i) ->
              ->
                validatedBol = validate(input_arr[i].id, input_arr[i].type)
                if validatedBol
                  showErrorField input_arr[i]
                else
                  hideErrorField input_arr[i]
                # status of JSON to be changed with the input value change
                validateJSON[i] = validatedBol
                flag = false
                for j of validateJSON
                  if validateJSON[j] # when there is a wrong input then flag is true, meanning btn is disabled
                    flag = true
                    break
                if !flag
                  $submitBtn.disabled = false
                else
                  $submitBtn.disabled = true
            )(i)
          # destroy element avoid the memory leak
          input_arr[i] = null
        i++
    return

  # API
  window.inputValidate = inputValidate
  return

###
# 使用方式：
# 1 不通用。需要在验证的 input 框后面添加 验证 label
# 2 通过给 label 添加 active 来触发其错误信息显示样式
# 3 引用该 JS 后 直接在自己代码中写入 new inputValidate('form-id'); 即可
###