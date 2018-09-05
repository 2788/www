$(document).ready ->

  $progressBar = $('.qvm1rmb-progress-row .qvm1rmb-progress-bar .progress-bar')
  $progressTitle = $('.qvm1rmb-progress-row .qvm1rmb-progress-title')
  $progressTip = $('.qvm1rmb-progress-row .qvm1rmb-progress-tip')

  # 处理时间
  handleTime = () ->
    date = new Date()
    # 获取当前时间（精确到天）
    currentTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0).getTime()
    # 设置活动开始时间：2018年9月5日00:00:00
    startTime = new Date(2018, 8, 5, 0, 0, 0).getTime()
    # 设置活动结束时间：2018年12月5日00:00:00
    endTime = new Date(2018, 11, 5, 0, 0, 0).getTime()
    # 活动持续时间
    durationTime = endTime - startTime
    # 经过的时间
    passTime = currentTime - startTime
    # 剩余的时间
    leftTime = endTime - currentTime
    if passTime < 0
      # 设置进度条
      $progressBar.attr('aria-valuenow', 0)
      $progressBar.css('width', 0)
      $progressTitle.html('活动未开始')
      $progressTip.hide()
    else if leftTime <= 0
      $progressBar.attr('aria-valuenow', 100)
      $progressBar.css('width', '100%')
      $progressTitle.html('活动已结束')
      $progressTip.hide()
    else
      $progressTitle.html('距离活动结束还有')
      $progressTip.show()
      # 经过时间的比例
      ratio = (passTime / durationTime).toFixed(2) * 100
      # 设置进度条
      $progressBar.attr('aria-valuenow', ratio)
      $progressBar.css('width', ratio + '%')
      # 计算剩余天数
      leftDay = leftTime / (1000 * 60 * 60 * 24)
      $progressTip.html(leftDay+'天')

  # 重置tip的位置
  rePositionTip = () ->
    $progressTip.css('left', $progressBar.width() - 5)

  handleTime()

  rePositionTip()

  $(window).resize ->
    rePositionTip()