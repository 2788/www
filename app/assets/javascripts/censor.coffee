$(document).ready ->

  $uploadImageBtn = $('#upload-image-btn')
  $uploadImageInput = $('#upload-image-input')
  $imageResultContainer = $('.image-result-container')
  $imageOverlay = $('.image-overlay')
  $imageScan = $('.image-scan')
  $imagePass = $('.image-pass')
  $imageViolate = $('.image-violate')

  $uploadVideoBtn = $('#upload-video-btn')
  $uploadVideoInput = $('#upload-video-input')
  $videoResultContainer = $('.video-result-container')
  $videoOverlay = $('.video-overlay')
  $videoScan = $('.video-scan')
  $videoPass = $('.video-pass')
  $videoViolate = $('.video-violate')

  # 图片审核
  imgAudit = (path, type) ->
    $imageOverlay.show()
    $imageScan.addClass('active')
    $.ajax
      method: 'POST',
      url: '/img_censor',
      data:
        path: path,
        type: type
      success: (res) ->
        $imageOverlay.hide()
        $imageScan.removeClass('active')
        if res && res.result
          updateImgUI(res.result)
        else
          showPop($uploadImageBtn, '审核失败', 'top')
      error: (err) ->
        $imageOverlay.hide()
        $imageScan.removeClass('active')

  # 视频审核
  videoAudit = (path, type) ->
    $videoOverlay.show()
    $videoScan.addClass('active')
    $.ajax
      method: 'POST',
      url: '/video_censor',
      data:
        path: path,
        type: type
      success: (res) ->
        $videoOverlay.hide()
        $videoScan.removeClass('active')
        if res && res.result
          updateVideoUI(res.result)
        else
          showPop($uploadVideoBtn, '审核失败', 'top')
      error: (err) ->
        $videoOverlay.hide()
        $videoScan.removeClass('active')

  # 重置图片审核UI
  resetImgUI = () ->
    $imageResultContainer.children('p').removeClass('text-error')
    $imageResultContainer.children('p').children('.result-word').html('正常')
    $imageResultContainer.hide()
    $imagePass.hide()
    $imageViolate.hide()

  # 重置视频审核UI
  resetVideoUI = () ->
    $videoResultContainer.children('p').removeClass('text-error')
    $videoResultContainer.children('p').children('.result-word').html('正常')
    $videoResultContainer.hide()
    $videoPass.hide()
    $videoViolate.hide()

  # 更新图片审核UI
  updateImgUI = (result) ->
    aduitRes = result.result
    # 显示是否违规
    if aduitRes.label == 1
      $imageViolate.show()
    else
      # 修改审核图标的图片
      $imagePass.removeClass('image-pass-xinggan')
      $imagePass.show()
    # 判断渲染违规项
    for item in aduitRes.details
      switch item.type
        when 'pulp'
          if item.label == 0
            $('#image-pulp').addClass('text-error')
            $('#image-pulp').find('.result-word').html('色情')
          else if item.label == 1
            $('#image-pulp').addClass('text-error')
            $('#image-pulp').find('.result-word').html('性感')
            # 修改审核图标的图片
            $imagePass.addClass('image-pass-xinggan')
        when 'terror'
          if item.label == 1
            $('#image-terror').addClass('text-error')
            $('#image-terror').find('.result-word').html('暴恐')
        when 'politician'
          if item.label == 1
            $('#image-politician').addClass('text-error')
            $('#image-politician').find('.result-word').html('涉政')
    $imageResultContainer.show()

  # 更新视频审核UI
  updateVideoUI = (result) ->
    isViolate = false
    # 对pulp内容进行判断
    pulpRes = result['pulp']
    pulpLabels = if pulpRes.labels then pulpRes.labels else []
    pulpList = []
    for item in pulpLabels
      if item.label == '0' && pulpList.indexOf('色情') == -1
        pulpList.push('色情')
        isViolate = true
      else if item.label == '1' && pulpList.indexOf('性感') == -1
        pulpList.push('性感')
    if pulpList.length != 0
      $('#video-pulp').addClass('text-error')
      $('#video-pulp').find('.result-word').html(pulpList.join('，'))
    # 对terror内容进行判断
    terrorRes = result['terror']
    terrorLabels = if terrorRes.labels then terrorRes.labels else []
    terrorList = []
    for item in terrorLabels
      if item.label == '1' && terrorList.indexOf('暴恐') == -1
        terrorList.push('暴恐')
        isViolate = true
    if terrorList.length != 0
      $('#video-terror').addClass('text-error')
      $('#video-terror').find('.result-word').html(terrorList.join(','))
    # 对politician内容进行判断
    politicianRes = result['politician']
    politicianLabels = if politicianRes.labels then politicianRes.labels else []
    politicianList = []
    for item in politicianLabels
      if item.label != '0' && politicianList.indexOf('涉政') == -1
        politicianList.push('涉政')
        isViolate = true
    if politicianList.length != 0
      $('#video-politician').addClass('text-error')
      $('#video-politician').find('.result-word').html(politicianList.join(','))
    $videoResultContainer.show()
    # 显示是否违规
    if isViolate
      $videoViolate.show()
    else
      $videoPass.show()

  # image部分
  # 激活img的slide
  $('.image-upload .slide-container .slide-item').bind 'click', (e) ->
    if $(this).hasClass('active')
      return
    # 消除所有slide的active样式
    $('.image-upload .slide-container .slide-item').removeClass('active')
    # 为选中项添加active样式
    $(this).addClass('active')
    # 清空upload-image-input的值
    $uploadImageInput.val('')
    # 替换当前图片
    imgSrc = $(this).children('img')[0].src
    key = $(this).children('img').attr('key')
    $('#upload-image-show').css 'background-image', 'url("' + imgSrc + '")'
    resetImgUI()
    imgAudit(key, 'slide')

  # 图片url按钮
  $uploadImageBtn.bind 'click', (e) ->
    imageURL = $uploadImageInput.val().trim()
    if !imageURL
      showPop($uploadImageBtn, '请输入图片 URL 地址', 'top')
      return
    $('.image-upload .slide-container .slide-item').removeClass('active')
    # 校验图片是否可用
    verifyImage = new Image()
    verifyImage.crossOrigin = 'anonymous'
    verifyImage.onload = () =>
      $('#upload-image-show').css 'background-image', 'url("' + imageURL + '")'
    verifyImage.onerror = () =>
      firstSlideImageURL = $('.image-upload .slide-container .slide-item img')[0].src
      $('#upload-image-show').css 'background-image', 'url("' + firstSlideImageURL + '")'
    verifyImage.src = imageURL
    verifyImage = null
    resetImgUI()
    imgAudit(imageURL, 'url')

  # video部分
  # 激活video的slide
  $('.video-upload .slide-container .slide-item').bind 'click', (e) ->
    e.preventDefault()
    if $(this).hasClass('active')
      return
    # 消除所有slide的active样式
    $('.video-upload .slide-container .slide-item').removeClass('active')
    # 替换当前图片
    videoSrc = $(this).children('video')[0].src
    key = $(this).children('video').attr('key')
    $('#upload-video-show')[0].src = videoSrc
    $('#upload-video-show').one 'error', () =>
      $('#upload-video-show')[0].src = $('.video-upload .slide-container .slide-item video')[0].src
    # 播放视频
    $('#upload-video-show')[0].play()
    # 为选中项添加active样式
    $(this).addClass('active')
    # 清空upload-video-input的值
    $uploadVideoInput.val('')
    resetVideoUI()
    videoAudit(key, 'slide')

  # 输入网络视频URL
  $uploadVideoBtn.bind 'click', (e) ->
    videoURL = $uploadVideoInput.val().trim()
    if !videoURL
      showPop($uploadVideoBtn, '请输入视频 URL 地址', 'top')
      return
    $('.video-upload .slide-container .slide-item').removeClass('active')
    $('#upload-video-show')[0].src = videoURL
    $('#upload-video-show')[0].play()
    resetVideoUI()
    videoAudit(videoURL, 'url')

  # 公用部分
  # 切换tab页暂停视频播放
  $('.censor-demo .nav-tabs li').bind 'click', (e) ->
    video = $('#upload-video-show')[0]
    if $(this).hasClass('image-tab-li')
      if video.currentSrc
        video.pause()
    else
      if video.currentSrc
        video.play()

  # 显示popover
  showPop = (dom, message, position) ->
    paras =
      content: message
      trigger: 'manual'
      placement: position
    dom.popover(paras)
    dom.popover('show')
    timeOut = setTimeout ->
      dom.popover('destroy')
      clearTimeout(timeOut)
    , 1500