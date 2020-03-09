$(document).ready ->

  $uploadImageBtn = $('#upload-image-btn')
  $uploadImageInput = $('#upload-image-input')
  $imageResultContainer = $('.image-result-container')
  $imageOverlay = $('.image-overlay')
  $imageScan = $('.image-scan')
  $imageBlock = $('.image-block')
  $imageReview = $('.image-review')
  $imagePass = $('.image-pass')

  $uploadVideoBtn = $('#upload-video-btn')
  $uploadVideoInput = $('#upload-video-input')
  $videoResultContainer = $('.video-result-container')
  $videoOverlay = $('.video-overlay')
  $videoScan = $('.video-scan')
  $videoBlock = $('.video-block')
  $videoReview = $('.video-review')
  $videoPass = $('.video-pass')

  imageRequestBody = {'Method': 'POST /v3/image/censor HTTP/1.1', 'Host': 'ai.qiniuapi.com', 'Content-Type': 'application/json', 'Authorization': 'Qiniu <AccessKey>:<Sign>', 'body': {'data': {'uri': 'https://dn-mars-assets.qbox.me/Flm400wajEHohD2sFZgyLpc7fbCD'}, 'params': {'scenes': ['pulp', 'terror', 'politician']}}}
  defaultImageResponseBody = {'suggestion': 'review', 'scenes': {'ads': {'suggestion': 'pass'}, 'politician': {'suggestion': 'pass'}, 'pulp': {'suggestion': 'review', 'details': [{'suggestion': 'review', 'label': 'sexy', 'score': 0.63456}]}, 'terror': {'suggestion': 'pass', 'details': [{'suggestion': 'pass', 'label': 'normal', 'score': 0.931}]}}}
  videoRequestBody = {'Method': 'POST /v3/video/censor HTTP/1.1', 'Host': 'ai.qiniuapi.com', 'Content-Type': 'application/json', 'Authorization': 'Qiniu <AccessKey>:<Sign>', 'body': {'data': {'uri': 'https://dn-mars-assets.qbox.me/Fi1UC6waXtXYCpnTGHa8XxIziGNk'}, 'params': {'scenes': ['pulp', 'terror', 'politician']}}}
  defaultVideoResponseBody = {'suggestion': 'review', 'scenes': {'ads': {'cuts': [{"offset": 500, "suggestion": "pass"}, {"offset": 5505, "suggestion": "pass"}, {"offset": 10510, "suggestion": "pass"}], 'suggestion': 'pass'}, 'politician': {'cuts': [{'offset': 500, 'suggestion': 'pass'}, {'offset': 5505, 'suggestion': 'pass'}, {'offset': 10510, 'suggestion': 'pass'}], 'suggestion': 'pass'}, 'pulp': {'cuts': [{'details': [{'label': 'normal', 'score': 0.74941, 'suggestion': 'pass'}], 'offset': 500, 'suggestion': 'pass'}, {'details': [{'label': 'normal', 'score': 0.64107, 'suggestion': 'pass'}], 'offset': 5505, 'suggestion': 'pass'}, {'details': [{'label': 'sexy', 'score': 0.6379033, 'suggestion': 'review'}], 'offset': 10510, 'suggestion': 'review'}], 'suggestion': 'review'}, 'terror': {'cuts': [{'details': [{'label': 'normal', 'score': 0.87464666, 'suggestion': 'pass'}], 'offset': 500, 'suggestion': 'pass'}, {'details': [{'label': 'normal', 'score': 0.8754, 'suggestion': 'pass'}], 'offset': 5505, 'suggestion': 'pass'}, {'details': [{'label': 'normal', 'score': 0.93217665, 'suggestion': 'pass'}], 'offset': 10510, 'suggestion': 'pass'}], 'suggestion': 'pass'}}}

  $imageRequestView = $('.image-request-container .image-request-view')
  $imageResponseView = $('.image-response-container .image-response-view')
  $videoRequestView = $('.video-request-container .video-request-view')
  $videoResponseView = $('.video-response-container .video-response-view')

  $censorProtectContainer = $('.features-censor-protect')
  $platformNumberContainer = $('.features-censor-protect #censor-protect-platform')
  $totalVideoNumberContainer = $('.features-censor-protect #censor-total-video')
  $totalImageNumberContainer = $('.features-censor-protect #censor-total-image')
  $totalTextNumberContainer = $('.features-censor-protect #censor-total-text')
  $forbidSexyNumberContainer = $('.features-censor-protect #censor-forbid-sexy')
  $forbidViolenceNumberContainer = $('.features-censor-protect #censor-forbid-violence')
  $forbidPoliticalNumberContainer = $('.features-censor-protect #censor-forbid-political')
  $forbidVulgarNumberContainer = $('.features-censor-protect #censor-forbid-vulgar')
  $forbidADSNumberContainer = $('.features-censor-protect #censor-forbid-ads')

  if $imageRequestView.length > 0
    $imageRequestView.JSONView(imageRequestBody)
  if $imageResponseView.length > 0
    $imageResponseView.JSONView(defaultImageResponseBody).JSONView('collapse', [3])
  if $videoRequestView.length > 0
    $videoRequestView.JSONView(videoRequestBody)
  if $videoResponseView.length > 0
    $videoResponseView.JSONView(defaultVideoResponseBody).JSONView('collapse', [3])

  platformAnimNumber = null
  totalVideoAnimNumber = null
  totalImageAnimNumber = null
  totalTextAnimNumber = null
  forbidSexyAnimNumber = null
  forbidViolenceAnimNumber = null
  forbidPoliticalAnimNumber = null
  forbidVulgarAnimNumber = null
  forbidADSAnimNumber = null

  # 部署方式部分 slider
  $('.censor-deploy-slider').slick
    dots: true
    autoplay: true
    autoplaySpeed: 4000
    arrows: false
    slidesToShow: 1
    slidesToScroll: 1

  getCensorQuantityData = () ->
    $.ajax
      method: 'GET',
      url: '/censor_quantity_data',
      success: (res) ->
        if res && res.is_success
          startOrUpdateAnimNumber res.data
          # 每隔 10 秒获取一次审核数量数据
          timeOut = setTimeout ->
            getCensorQuantityData()
            clearTimeout(timeOut)
          , 10000
        else
          startOrUpdateAnimNumber null
      error: () ->
        startOrUpdateAnimNumber null

  if $censorProtectContainer.length > 0
    getCensorQuantityData()

  startOrUpdateAnimNumber = (data) ->
    if data
      # 保护平台数
      if platformAnimNumber
        platformAnimNumber.update data.protect_platform
      else
        platformAnimNumber = new CountUp('censor-protect-platform', 0, data.protect_platform)
        if !platformAnimNumber.error
          platformAnimNumber.start()
      # 今日审核总量 - 视频
      if totalVideoAnimNumber
        totalVideoAnimNumber.update data.total_video
      else
        totalVideoAnimNumber = new CountUp('censor-total-video', 0, data.total_video)
        if !totalVideoAnimNumber.error
          totalVideoAnimNumber.start()
      # 今日审核总量 - 图片
      if totalImageAnimNumber
        totalImageAnimNumber.update data.total_image
      else
        totalImageAnimNumber = new CountUp('censor-total-image', 0, data.total_image)
        if !totalImageAnimNumber.error
          totalImageAnimNumber.start()
      # 今日审核总量 - 文本
      if totalTextAnimNumber
        totalTextAnimNumber.update data.total_text
      else
        totalTextAnimNumber = new CountUp('censor-total-text', 0, data.total_text)
        if !totalTextAnimNumber.error
          totalTextAnimNumber.start()
      # 今日已封禁违规内容 - 色情
      if forbidSexyAnimNumber
        forbidSexyAnimNumber.update data.forbid_sexy
      else
        forbidSexyAnimNumber = new CountUp('censor-forbid-sexy', 0, data.forbid_sexy)
        if !forbidSexyAnimNumber.error
          forbidSexyAnimNumber.start()
      # 今日已封禁违规内容 - 暴恐
      if forbidViolenceAnimNumber
        forbidViolenceAnimNumber.update data.forbid_violence
      else
        forbidViolenceAnimNumber = new CountUp('censor-forbid-violence', 0, data.forbid_violence)
        if !forbidViolenceAnimNumber.error
          forbidViolenceAnimNumber.start()
      # 今日已封禁违规内容 - 政治敏感
      if forbidPoliticalAnimNumber
        forbidPoliticalAnimNumber.update data.forbid_political
      else
        forbidPoliticalAnimNumber = new CountUp('censor-forbid-political', 0, data.forbid_political)
        if !forbidPoliticalAnimNumber.error
          forbidPoliticalAnimNumber.start()
      # 今日已封禁违规内容 - 低俗
      if forbidVulgarAnimNumber
        forbidVulgarAnimNumber.update data.forbid_vulgar
      else
        forbidVulgarAnimNumber = new CountUp('censor-forbid-vulgar', 0, data.forbid_vulgar)
        if !forbidVulgarAnimNumber.error
          forbidVulgarAnimNumber.start()
      if forbidADSAnimNumber
        forbidADSAnimNumber.update data.forbid_ads
      else
        forbidADSAnimNumber = new CountUp('censor-forbid-ads', 0, data.forbid_ads)
        if !forbidADSAnimNumber.error
          forbidADSAnimNumber.start()
    else
      # 所有数字重置为 0
      $platformNumberContainer.html '0'
      $totalVideoNumberContainer.html '0'
      $totalImageNumberContainer.html '0'
      $totalTextNumberContainer.html '0'
      $forbidSexyNumberContainer.html '0'
      $forbidViolenceNumberContainer.html '0'
      $forbidPoliticalNumberContainer.html '0'
      $forbidVulgarNumberContainer.html '0'
      $forbidADSNumberContainer.html '0'
      # CountUp 对象重置为 null
      platformAnimNumber = null
      totalVideoAnimNumber = null
      totalImageAnimNumber = null
      totalTextAnimNumber = null
      forbidSexyAnimNumber = null
      forbidViolenceAnimNumber = null
      forbidPoliticalAnimNumber = null
      forbidVulgarAnimNumber = null
      forbidADSAnimNumber = null

  # 图片审核
  imgAudit = (path, type) ->
    $imageOverlay.show()
    $imageScan.addClass('active')
    if type == 'slide'
      imageRequestBody.body.data.uri = 'https://dn-mars-assets.qbox.me/' + path
    else if type == 'url'
      imageRequestBody.body.data.uri = path
    $imageRequestView.JSONView(imageRequestBody)
    $imageResponseView.html('<span class="tip-success">审核中...</span>')
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
          $imageResponseView.html('<span class="tip-error">审核失败...</span>')
      error: (err) ->
        $imageOverlay.hide()
        $imageScan.removeClass('active')
        showPop($uploadImageBtn, '审核失败', 'top')
        $imageResponseView.html('<span class="tip-error">审核失败...</span>')
  
  getVideoAuidtResult = (jobID) ->
    $.ajax
      method: 'POST',
      url: '/video_censor_result',
      data:
        jobID: jobID
      success: (res) ->
        if res && res.is_success
          resData = res.data
          if resData && resData.status == 'FINISHED'
            $videoOverlay.hide()
            $videoScan.removeClass('active')
            updateVideoUI(resData.result)
          else if resData && resData.status == 'FAILED'
            $videoOverlay.hide()
            $videoScan.removeClass('active')
            showPop($uploadVideoBtn, '审核失败', 'top')
          else
            # 视频还在审核中 循环获取结果 间隔 2s
            timeOut = setTimeout ->
              getVideoAuidtResult jobID
              clearTimeout(timeOut)
            , 2000
        else
          $videoOverlay.hide()
          $videoScan.removeClass('active')
          showPop($uploadVideoBtn, '审核失败', 'top')
      error: (err) ->
        $videoOverlay.hide()
        $videoScan.removeClass('active')
        showPop($uploadVideoBtn, '审核失败', 'top')

  # 视频审核
  videoAudit = (path, type) ->
    $videoOverlay.show()
    $videoScan.addClass('active')
    if type == 'slide'
      videoRequestBody.body.data.uri = 'https://dn-mars-assets.qbox.me/' + path
    else if type == 'url'
      videoRequestBody.body.data.uri = path
    $videoRequestView.JSONView(videoRequestBody)
    $videoResponseView.html('<span class="tip-success">审核中...</span>')
    $.ajax
      method: 'POST',
      url: '/video_censor',
      data:
        path: path,
        type: type
      success: (res) ->
        if res && res.is_success
          # 2s 后获取视频审核结果
          timeOut = setTimeout ->
            getVideoAuidtResult res.job_id
            clearTimeout(timeOut)
          , 2000
        else
          $videoOverlay.hide()
          $videoScan.removeClass('active')
          showPop($uploadVideoBtn, '审核失败', 'top')
          $videoResponseView.html('<span class="tip-error">审核失败...</span>')
      error: (err) ->
        $videoOverlay.hide()
        $videoScan.removeClass('active')
        showPop($uploadVideoBtn, '审核失败', 'top')
        $videoResponseView.html('<span class="tip-error">审核失败...</span>')

  # 重置图片审核 UI
  resetImgUI = () ->
    $imageResultContainer.children('p').removeClass('text-error')
    $imageResultContainer.children('p').children('.result-word').html('正常')
    $imageResultContainer.hide()
    $imageBlock.hide()
    $imageReview.hide()
    $imagePass.hide()

  # 重置视频审核 UI
  resetVideoUI = () ->
    $videoResultContainer.children('p').removeClass('text-error')
    $videoResultContainer.children('p').children('.result-word').html('正常')
    $videoResultContainer.hide()
    $videoBlock.hide()
    $videoReview.hide()
    $videoPass.hide()

  # 更新图片审核 UI
  updateImgUI = (result) ->
    if result.code != 200
      showPop($uploadImageBtn, '审核失败', 'top')
      $imageResponseView.html('<span class="tip-error">审核失败...</span>')
      return
    aduitRes = result.result
    # 显示是否违规
    if aduitRes.suggestion == 'block'
      $imageBlock.show()
      $imageReview.hide()
      $imagePass.hide()
    else if aduitRes.suggestion == 'review'
      $imageReview.show()
      $imageBlock.hide()
      $imagePass.hide()
    else
      $imagePass.show()
      $imageReview.hide()
      $imageBlock.hide()
    # 判断渲染违规项
    aduitScenes = aduitRes.scenes || {}
    for key, info of aduitScenes
      switch key
        when 'pulp'
          if info.suggestion == 'review'
            $('#image-pulp').addClass('text-error')
            $('#image-pulp').find('.result-word').html('疑似')
          else if info.suggestion == 'block'
            $('#image-pulp').addClass('text-error')
            $('#image-pulp').find('.result-word').html('违规')
        when 'terror'
          if info.suggestion == 'review'
            $('#image-terror').addClass('text-error')
            $('#image-terror').find('.result-word').html('疑似')
          else if info.suggestion == 'block'
            $('#image-terror').addClass('text-error')
            $('#image-terror').find('.result-word').html('违规')
        when 'politician'
          if info.suggestion == 'review'
            $('#image-politician').addClass('text-error')
            $('#image-politician').find('.result-word').html('疑似')
          else if info.suggestion == 'block'
            $('#image-politician').addClass('text-error')
            $('#image-politician').find('.result-word').html('违规')
        when 'ads'
          if info.suggestion == 'review'
            $('#image-ads').addClass('text-error')
            $('#image-ads').find('.result-word').html('疑似')
          else if info.suggestion == 'block'
            $('#image-ads').addClass('text-error')
            $('#image-ads').find('.result-word').html('违规')
    $imageResultContainer.show()
    $imageResponseView.JSONView(aduitRes).JSONView('collapse', [3])

  # 更新视频审核 UI
  updateVideoUI = (result) ->
    if result.code != 200
      showPop($uploadVideoBtn, '审核失败', 'top')
      $videoResponseView.html('<span class="tip-error">审核失败...</span>')
      return
    aduitRes = result.result
    # 显示是否违规
    if aduitRes.suggestion == 'block'
      $videoBlock.show()
      $videoReview.hide()
      $videoPass.hide()
    else if aduitRes.suggestion == 'review'
      $videoReview.show()
      $videoBlock.hide()
      $videoPass.hide()
    else
      $videoPass.show()
      $videoReview.hide()
      $videoBlock.hide()
    # 判断渲染违规项
    aduitScenes = aduitRes.scenes || {}
    for key, info of aduitScenes
      switch key
        when 'pulp'
          if info.suggestion == 'review'
            $('#video-pulp').addClass('text-error')
            $('#video-pulp').find('.result-word').html('疑似')
          else if info.suggestion == 'block'
            $('#video-pulp').addClass('text-error')
            $('#video-pulp').find('.result-word').html('违规')
        when 'terror'
          if info.suggestion == 'review'
            $('#video-terror').addClass('text-error')
            $('#video-terror').find('.result-word').html('疑似')
          else if info.suggestion == 'block'
            $('#video-terror').addClass('text-error')
            $('#video-terror').find('.result-word').html('违规')
        when 'politician'
          if info.suggestion == 'review'
            $('#video-politician').addClass('text-error')
            $('#video-politician').find('.result-word').html('疑似')
          else if info.suggestion == 'block'
            $('#video-politician').addClass('text-error')
            $('#video-politician').find('.result-word').html('违规')
        when 'ads'
          if info.suggestion == 'review'
            $('#video-ads').addClass('text-error')
            $('#video-ads').find('.result-word').html('疑似')
          else if info.suggestion == 'block'
            $('#video-ads').addClass('text-error')
            $('#video-ads').find('.result-word').html('违规')
    $videoResultContainer.show()
    $videoResponseView.JSONView(aduitRes).JSONView('collapse', [3])

  # image 部分
  # 激活 img 的 slide
  $('.image-upload .slide-container .slide-item').bind 'click', (e) ->
    if $(this).hasClass('active')
      return
    # 消除所有 slide 的 active 样式
    $('.image-upload .slide-container .slide-item').removeClass('active')
    # 为选中项添加 active 样式
    $(this).addClass('active')
    # 清空 upload-image-input 的值
    $uploadImageInput.val('')
    # 替换当前图片
    imgSrc = $(this).children('img')[0].src
    key = $(this).children('img').attr('key')
    $('#upload-image-show').css 'background-image', 'url("' + imgSrc + '")'
    resetImgUI()
    imgAudit(key, 'slide')

  # 图片 url 按钮
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

  # video 部分
  # 激活 video 的 slide
  $('.video-upload .slide-container .slide-item').bind 'click', (e) ->
    e.preventDefault()
    if $(this).hasClass('active')
      return
    # 消除所有 slide 的 active 样式
    $('.video-upload .slide-container .slide-item').removeClass('active')
    # 替换当前图片
    videoSrc = $(this).children('video')[0].src
    key = $(this).children('video').attr('key')
    $('#upload-video-show')[0].src = videoSrc
    $('#upload-video-show').one 'error', () =>
      $('#upload-video-show')[0].src = $('.video-upload .slide-container .slide-item video')[0].src
    # 播放视频
    $('#upload-video-show')[0].play()
    # 为选中项添加 active 样式
    $(this).addClass('active')
    # 清空 upload-video-input 的值
    $uploadVideoInput.val('')
    resetVideoUI()
    videoAudit(key, 'slide')

  # 输入网络视频 URL
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
  # 切换 tab 页暂停视频播放
  $('.censor-demo .nav-tabs li').bind 'click', (e) ->
    video = $('#upload-video-show')[0]
    if $(this).hasClass('image-tab-li')
      if video.currentSrc
        video.pause()
    else
      if video.currentSrc
        video.play()

  # 显示 popover
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