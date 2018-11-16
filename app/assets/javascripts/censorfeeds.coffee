$(document).ready ->
  # 隐藏 helper
  if $('.hero.hero-censorfeeds').length > 0
    $('.helper').hide()
  # demo 标题
  $demoTitle = $('.features-censorfeeds-demo .demo-title')
  # 大图
  $mainImage = $('.features-censorfeeds-demo .image-censorfeeds-main')
  # 结果图标
  $resultIconZhengchang = $('.features-censorfeeds-demo .icon-zhengchang')
  $resultIconXinggan = $('.features-censorfeeds-demo .icon-xinggan')
  $resultIconWeigui = $('.features-censorfeeds-demo .icon-weigui')
  # 三个切换图标
  $selectImages = $('.features-censorfeeds-demo .image-censorfeeds-select')
  # url 输入框
  $imageURLInput = $('.features-censorfeeds-demo .input-censorfeeds')
  # 检测按钮
  $detectionBtn = $('.features-censorfeeds-demo .btn-detection')
  # 文案
  demoTitleText = 'AI 鉴黄体验区'
  detectingText = '检测中，请稍后...'
  detectionSuccessText = '检测成功'
  detectionFailText = '检测失败'
  inputImageUrlText = '请输入图片 URL 地址'
  inputCorrectUrlText = '请输入正确的图片 URL 地址'

  # 重置检测结果图片
  resetResultIcon = (result) ->
    if !result
      $resultIconZhengchang.hide()
      $resultIconXinggan.hide()
      $resultIconWeigui.hide()
    else if result == 'normal'
      $resultIconZhengchang.show()
      $resultIconXinggan.hide()
      $resultIconWeigui.hide()
    else if result == 'sexy'
      $resultIconZhengchang.hide()
      $resultIconXinggan.show()
      $resultIconWeigui.hide()
    else if result == 'illegal'
      $resultIconZhengchang.hide()
      $resultIconXinggan.hide()
      $resultIconWeigui.show()

  # 加锁
  addLock = () ->
    $selectImages.addClass 'disabled'
    $imageURLInput.prop 'disabled', true
    $detectionBtn.addClass 'disabled'

  # 解锁
  removeLock = () ->
    $selectImages.removeClass 'disabled'
    $imageURLInput.prop 'disabled', false
    $detectionBtn.removeClass 'disabled'

  # 处理审核返回结果
  handleAuditResult = (details) ->
    for item in details
      switch item.type
        when 'pulp'
          if item.label == 0
            # 色情
            resetResultIcon 'illegal'
          else if item.label == 1
            # 性感
            resetResultIcon 'sexy'
          else
            # 正常
            resetResultIcon 'normal'

  # 图片审核
  imgAudit = (path, type, callback) ->
    addLock()
    resetResultIcon()
    $demoTitle.html detectingText
    $.ajax
      method: 'POST',
      url: '/img_censor',
      data:
        path: path,
        type: type
      success: (res) ->
        if res && res.result && res.result.code == 0
          callback res.result.result.details || false
        else
          callback false
      error: (err) ->
        callback false

  # 绑定三个小图标切换事件
  $selectImages.bind 'click', (e) ->
    if $(this).hasClass('selected') || $(this).hasClass('disabled')
      return
    # 消除所有 selected 样式
    $selectImages.removeClass 'selected'
    # 为选中项添加 selected 样式
    $(this).addClass 'selected'
    # 替换当前图片
    imgMark = $(this).attr 'id'
    $mainImage.css 'background-image', 'url(https://mars-assets.qnssl.com/' + imgMark + '.jpg)'
    # 图片审核
    imgAudit imgMark + '.jpg', 'slide', (details) ->
      removeLock()
      $demoTitle.html demoTitleText
      if details
        handleAuditResult details
        showPop $mainImage, detectionSuccessText, 'top'
      else
        showPop $mainImage, detectionFailText, 'top'

  # 绑定检测按钮单击事件
  $detectionBtn.bind 'click', (e) ->
    if $(this).hasClass 'disabled'
      return
    inputUrl = $imageURLInput.val().trim()
    if !inputUrl
      showPop $imageURLInput, inputImageUrlText, 'top'
      return
    # 校验图片地址是否有效
    imgObj = new Image
    imgObj.onload = () ->
      $mainImage.css 'background-image', 'url(' + inputUrl + ')'
      $selectImages.removeClass 'selected'
      imgAudit inputUrl, 'url', (details) ->
        removeLock()
        $demoTitle.html demoTitleText
        if details
          handleAuditResult details
          showPop $detectionBtn, detectionSuccessText, 'top'
        else
          showPop $detectionBtn, detectionFailText, 'top'
    imgObj.onerror = () ->
      showPop $imageURLInput, inputCorrectUrlText, 'top'
    imgObj.src = inputUrl

  # 显示popover
  showPop = (dom, content, position) ->
    paras =
      content: content
      trigger: 'manual'
      placement: position
    dom.popover paras
    dom.popover 'show'
    timeOut = setTimeout ->
      dom.popover 'destroy'
      clearTimeout timeOut
    , 1500
