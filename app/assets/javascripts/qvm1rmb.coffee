# qvm1rmb 和 qvm0rmb 这两个页面的逻辑都在这里判断

$(document).ready ->
  # 企业优惠部分
  $progressBarEnterprise = $('.qvm1rmb-progress-row .qvm1rmb-progress-bar.enterprise-bar .progress-bar')
  $progressTitleEnterprise = $('.qvm1rmb-progress-row .qvm1rmb-progress-title.enterprise-title')
  $progressTipEnterprise = $('.qvm1rmb-progress-row .qvm1rmb-progress-tip.enterprise-tip')
  # 个人优惠部分
  $progressBarPerson = $('.qvm1rmb-progress-row .qvm1rmb-progress-bar.person-bar .progress-bar')
  $progressTitlePerson = $('.qvm1rmb-progress-row .qvm1rmb-progress-title.person-title')
  $progressTipPerson = $('.qvm1rmb-progress-row .qvm1rmb-progress-tip.person-tip')

  # 处理时间
  handleTime = (type) ->
    date = new Date()
    # 获取当前时间（精确到天）
    currentTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0).getTime()
    if type == 'enterprise'
      # 企业优惠活动
      # 设置活动开始时间：2018年9月18日00:00:00
      startTime = new Date(2018, 8, 18, 0, 0, 0).getTime()
      # 设置活动结束时间：2018年10月17日23:59:59
      endTime = new Date(2018, 9, 17, 23, 59, 59).getTime()
    else if type == 'person'
      # 企业优惠活动
      # 设置活动开始时间：2018年9月5日00:00:00
      startTime = new Date(2018, 8, 5, 0, 0, 0).getTime()
      # 设置活动结束时间：2018年12月5日23:59:59
      endTime = new Date(2018, 11, 5, 23, 59, 59).getTime()
    # 活动持续时间
    durationTime = endTime - startTime
    # 经过的时间
    passTime = currentTime - startTime
    # 剩余的时间
    leftTime = endTime - currentTime
    timeObj =
      durationTime: durationTime
      passTime: passTime
      leftTime: leftTime
    return timeObj
  
  # 处理企业优惠 tab 页的进度条
  handleProgressEnterprise = (timeObj) ->
    durationTime = timeObj.durationTime
    passTime = timeObj.passTime
    leftTime = timeObj.leftTime
    if passTime < 0
      # 设置进度条
      $progressBarEnterprise.attr('aria-valuenow', 0)
      $progressBarEnterprise.css('width', 0)
      $progressTitleEnterprise.html('活动未开始')
      $progressTipEnterprise.hide()
    else if leftTime <= 0
      $progressBarEnterprise.attr('aria-valuenow', 100)
      $progressBarEnterprise.css('width', '100%')
      $progressTitleEnterprise.html('活动已结束')
      $progressTipEnterprise.hide()
    else
      $progressTitleEnterprise.html('距离活动结束还有')
      $progressTipEnterprise.show()
      # 经过时间的比例
      ratio = (passTime / durationTime).toFixed(2) * 100
      # 设置进度条
      $progressBarEnterprise.attr('aria-valuenow', ratio)
      $progressBarEnterprise.css('width', ratio + '%')
      # 计算剩余天数
      # 向上取整
      leftDay = Math.ceil leftTime / (1000 * 60 * 60 * 24)
      $progressTipEnterprise.html(leftDay+'天')

  # 处理个人优惠 tab 页的进度条
  handleProgressPerson = (timeObj) ->
    durationTime = timeObj.durationTime
    passTime = timeObj.passTime
    leftTime = timeObj.leftTime
    if passTime < 0
      # 设置进度条
      $progressBarPerson.attr('aria-valuenow', 0)
      $progressBarPerson.css('width', 0)
      $progressTitlePerson.html('活动未开始')
      $progressTipPerson.hide()
    else if leftTime <= 0
      $progressBarPerson.attr('aria-valuenow', 100)
      $progressBarPerson.css('width', '100%')
      $progressTitlePerson.html('活动已结束')
      $progressTipPerson.hide()
    else
      $progressTitlePerson.html('距离活动结束还有')
      $progressTipPerson.show()
      # 经过时间的比例
      ratio = (passTime / durationTime).toFixed(2) * 100
      # 设置进度条
      $progressBarPerson.attr('aria-valuenow', ratio)
      $progressBarPerson.css('width', ratio + '%')
      # 计算剩余天数
      # 向上取整
      leftDay = Math.ceil leftTime / (1000 * 60 * 60 * 24)
      $progressTipPerson.html(leftDay+'天')

  # 重置tip的位置
  rePositionTip = () ->
    $progressTipEnterprise.css('left', $progressBarEnterprise.width() - 5)
    $progressTipPerson.css('left', $progressBarPerson.width() - 5)
  
  timeObjEnterprise = handleTime('enterprise')
  timeObjPerson = handleTime('person')

  handleProgressEnterprise(timeObjEnterprise)
  handleProgressPerson(timeObjPerson)

  rePositionTip()

  # 改变窗口大小重置 tip 的位置
  $(window).resize ->
    rePositionTip()

  $('.features-qvm1rmb-nav .nav-qvm1rmb li').click ->
    if $(this).hasClass 'active'
      return false
