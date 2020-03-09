$(document).ready ->
  $cdnPackagePage = $('.events-page-cdn_package')
  $cdnPackagePageProgressContainer = $('.events-page-cdn_package .new-cdn-package-page .CND-Progress-bar .pro')
  # $cdnPackageEventEndModal = $('.events-page-cdn_package .modal.cdnpackage-modal')

  # if $cdnPackagePage.length > 0 && $cdnPackageEventEndModal.length > 0
  #   $cdnPackageEventEndModal.modal 'show'

  # 新上 cdn 闲时包活动
  # https://jira.qiniu.io/browse/BO-8284

  # 渲染进度条
  if $cdnPackagePage.length > 0 && $cdnPackagePageProgressContainer.length > 0
    progress = new commonProgress({
      width: 90, # 进度条宽度
      height: 0.22, # 进度条高度
      bgColor: '#FFF', # 背景颜色
      proColor: '', # 前景颜色
      fontColor: '#FFF', # 显示字体颜色
      val: 10, # 默认值
      text: '', # 显示文字信息
      showPresent: true
    })

    $cdnPackagePageProgressContainer.append(progress.getBody())
    now = new Date()
    hour = now.getHours()

    if hour < 1
      progress.update(10)
    else if hour < 2
      progress.update(11)
    else if hour < 3
      progress.update(12)
    else if hour < 4
      progress.update(13)
    else if hour < 5
      progress.update(14)
    else if hour < 6
      progress.update(15)
    else if hour < 7
      progress.update(16)
    else if hour < 8
      progress.update(17)
    else if hour < 9
      progress.update(20)
    else if hour < 10
      progress.update(25)
    else if hour < 11
      progress.update(30)
    else if hour < 12
      progress.update(40)
    else if hour < 13
      progress.update(50)
    else if hour < 14
      progress.update(70)
    else if hour < 15
      progress.update(75)
    else if hour < 16
      progress.update(80)
    else if hour < 17
      progress.update(85)
    else if hour < 18
      progress.update(90)
    else if hour < 19
      progress.update(95)
    else if hour < 20
      progress.update(96)
    else if hour < 21
      progress.update(97)
    else if hour < 23
      progress.update(98)
    else
      progress.update(99)
