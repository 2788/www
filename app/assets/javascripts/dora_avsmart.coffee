$(document).ready ->
  $doraAvsmartEventPage = $('.events-page-dora_avsmart')

  $doraAvsmartProgressContainer = $('.events-page-dora_avsmart .body.Transcoding .features-dora-avsmart-progress')
  $doraAvsmartProgress = $('.events-page-dora_avsmart .body.Transcoding .Transcoding-Progress #dora-avsmart-progress')

  $doraAvsmartApplyBtn = $('.events-page-dora_avsmart .body.Transcoding .Transcoding-participate .Transcoding-participate-a')

  $doraAvsmartDemoTabs = $('.events-page-dora_avsmart .body.Transcoding .Transcoding-wrap ul li.tab-item')
  $doraAvsmartDemoVideos = $('.events-page-dora_avsmart .body.Transcoding .Transcoding-wrap .product .main')

  doraAvsmartJinshujuURL = 'https://jinshuju.net/f/Wc7Vld?x_field_1='
  # 活动开始时间 2019 年 8 月 15 日
  doraAvsmartStartTime = new Date(2019, 7, 15, 0, 0, 0).getTime()
  # 活动结束时间 2019 年 9 月 15 日（9 月 16 日零点）
  doraAvsmartEndTime = new Date(2019, 8, 16, 0, 0, 0).getTime()

  # 获取用户登录信息
  getUserInfo = () ->
    uuid = generateUUID()
    timestamp = new Date().getTime()
    $.ajax
      method: 'GET',
      url: '/userinfo?u=' + uuid + '&t=' + timestamp,
      success: (res) ->
        if res.is_signin && $doraAvsmartApplyBtn.length > 0
          $doraAvsmartApplyBtn.attr 'href', doraAvsmartJinshujuURL + res.uid
          $doraAvsmartApplyBtn.attr 'target', '_blank'
          $doraAvsmartApplyBtn.attr 'data-toggle', ''
          $doraAvsmartApplyBtn.attr 'data-target', ''

  # 进度条 && 申请按钮
  if $doraAvsmartEventPage.length > 0
    currentTime = new Date().getTime()
    if currentTime < doraAvsmartStartTime || currentTime >= doraAvsmartEndTime
      btnText = ''
      if currentTime < doraAvsmartStartTime
        btnText = '活动未开始'
      if currentTime >= doraAvsmartEndTime
        btnText = '活动已结束'
      $doraAvsmartProgressContainer.remove()
      if $doraAvsmartApplyBtn.length > 0
        $doraAvsmartApplyBtn.html btnText
        $doraAvsmartApplyBtn.attr 'title', btnText
        $doraAvsmartApplyBtn.attr 'href', ''
        $doraAvsmartApplyBtn.attr 'target', ''
        $doraAvsmartApplyBtn.attr 'data-toggle', ''
        $doraAvsmartApplyBtn.attr 'data-target', ''
    else
      getUserInfo()
      if $doraAvsmartProgress.length > 0
        $doraAvsmartProgressContainer.removeClass('d-none')
        options =
          estilo: 'dora-avsmart-progress'
          tiempo: 3000,
          alto: '10px'
        $doraAvsmartProgress.doraProgressBar options

  # demo tab 切换事件
  if $doraAvsmartEventPage.length > 0
    if $doraAvsmartDemoTabs.length > 0 && $doraAvsmartDemoVideos.length > 0
      $doraAvsmartDemoTabs.on 'mouseenter', () ->
        $(this).addClass('active').siblings().removeClass('active')
        index = $(this).index()
        $doraAvsmartDemoVideos.eq(index).addClass('selected').siblings().removeClass('selected')
