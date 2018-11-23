# qvm1rmb 和 qvm0rmb 这两个页面的逻辑都在这里判断

$(document).ready ->
  # 企业优惠部分
  $progressBarEnterprise = $('.qvm1rmb-progress-row .qvm1rmb-progress-bar.enterprise-bar .progress-bar')
  $progressTitleEnterprise = $('.qvm1rmb-progress-row .qvm1rmb-progress-title.enterprise-title')
  $progressTipEnterprise = $('.qvm1rmb-progress-row .qvm1rmb-progress-tip.enterprise-tip')
  $activityTimeEnterprise = $('.features-qvm1rmb-rule .activity-time.enterprise')
  # 企业优惠所有跳转按钮
  $jumpBtnsEnterprise = $('.qvm-evnets-enterprise .btn.btn-qvm0rmb')

  # 个人优惠部分
  $progressBarPerson = $('.qvm1rmb-progress-row .qvm1rmb-progress-bar.person-bar .progress-bar')
  $progressTitlePerson = $('.qvm1rmb-progress-row .qvm1rmb-progress-title.person-title')
  $progressTipPerson = $('.qvm1rmb-progress-row .qvm1rmb-progress-tip.person-tip')
  $activityTimePerson = $('.features-qvm1rmb-rule .activity-time.person')
  # 个人优惠所有跳转按钮
  $jumpBtnsPerson = $('.qvm-evnets-person .btn.btn-qvm1rmb')

  # qvm1rmb 页面改版
  # https://jira.qiniu.io/browse/BO-5681
  # 个人活动开始时间 2018年11月23日00:00:00
  personStartTime = new Date(2018, 10, 23, 0, 0, 0)
  # 个人活动开始时间 2018年12月31日23:59:59
  personEndTime = new Date(2018, 11, 31, 23, 59, 59)
  # 个人活动刷新间隔为3个月
  personInterval = 3

  # 企业活动开始时间 2018年10月1日00:00:00
  enterpriseStartTime = new Date(2018, 9, 1, 0, 0, 0)
  # 企业活动刷新间隔为1个月
  enterpriseInterval = 1

  # 获取当前时间（精确到天）
  date = new Date()
  currentTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)

  # 循环判断当前时间属于哪个时间段
  timeLoop = (startYear, startMonth, startDate, type) ->
    timeInterval = 0
    if type == 'person'
      timeInterval = personInterval
    else
      timeInterval = enterpriseInterval
    endYear = startYear
    endMonth = startMonth + timeInterval
    endDate = startDate
    if endMonth > 11
      endYear = endYear + 1
      endMonth = endMonth - 12
    startTime = new Date(startYear, startMonth, startDate, 0, 0, 0)
    endTime = new Date(endYear, endMonth, endDate, 23, 59, 59)
    if currentTime.getTime() >= startTime.getTime() && currentTime.getTime() <= endTime.getTime()
      timeDuration =
        startTime: startTime
        endTime: endTime
      return timeDuration
    else
      return timeLoop endYear, endMonth, endDate, type

  # 处理时间
  handleDuration = (timeDuration) ->
    if !timeDuration
      return
    startTime = timeDuration.startTime
    endTime = timeDuration.endTime
    if !startTime || !endTime
      return
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
      $jumpBtnsPerson.html('活动未开始')
      $jumpBtnsPerson.addClass('disabled')
    else if leftTime <= 0
      $progressBarPerson.attr('aria-valuenow', 100)
      $progressBarPerson.css('width', '100%')
      $progressTitlePerson.html('活动已结束')
      $progressTipPerson.hide()
      $jumpBtnsPerson.html('活动已结束')
      $jumpBtnsPerson.addClass('disabled')
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
      $progressTipPerson.html(leftDay + '天')

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
      $jumpBtnsEnterprise.html('活动未开始')
      $jumpBtnsEnterprise.addClass('disabled')
    else if leftTime <= 0
      $progressBarEnterprise.attr('aria-valuenow', 100)
      $progressBarEnterprise.css('width', '100%')
      $progressTitleEnterprise.html('活动已结束')
      $progressTipEnterprise.hide()
      $jumpBtnsEnterprise.html('活动已结束')
      $jumpBtnsEnterprise.addClass('disabled')
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
      $progressTipEnterprise.html(leftDay + '天')

  # 重置 tip 的位置
  rePositionTip = () ->
    $progressTipEnterprise.css('left', $progressBarEnterprise.width() - 5)
    $progressTipPerson.css('left', $progressBarPerson.width() - 5)

  # 设置活动规则里面的活动时间（个人）
  resetActivityTimePerson = (timeDurationPerson) ->
    if !timeDurationPerson
      return
    # 个人
    startTimePerson = timeDurationPerson.startTime
    endTimePerson = timeDurationPerson.endTime
    activityTimePerson = startTimePerson.getFullYear() + ' 年 ' + (startTimePerson.getMonth() + 1) + ' 月 ' + startTimePerson.getDate() + ' 日 - ' + endTimePerson.getFullYear() + ' 年 ' + (endTimePerson.getMonth() + 1) + ' 月 ' + endTimePerson.getDate() + ' 日'
    $activityTimePerson.html(activityTimePerson)

  # 设置活动规则里面的活动时间（企业）
  resetActivityTimeEnterprise = (timeDurationEnterprise) ->
    if !timeDurationEnterprise
      return
    # 企业
    startTimeEnterprise = timeDurationEnterprise.startTime
    endTimeEnterprise = timeDurationEnterprise.endTime
    activityTimeEnterprise = startTimeEnterprise.getFullYear() + ' 年 ' + (startTimeEnterprise.getMonth() + 1) + ' 月 ' + startTimeEnterprise.getDate() + ' 日 - ' + endTimeEnterprise.getFullYear() + ' 年 ' + (endTimeEnterprise.getMonth() + 1) + ' 月 ' + endTimeEnterprise.getDate() + ' 日（每天限量 50 台）'
    $activityTimeEnterprise.html(activityTimeEnterprise)

  # qvm1rmb 页面改版
  # https://jira.qiniu.io/browse/BO-5681
  if currentTime.getTime() < personStartTime.getTime()
    # 如果当前时间活动没有开始
    timeObjPerson =
      durationTime: 0
      passTime: -1
      leftTime: 0
    handleProgressPerson timeObjPerson
  else
    # timeDurationPerson = timeLoop personStartTime.getFullYear(), personStartTime.getMonth(), personStartTime.getDate(), 'person'
    # qvm1rmb 活动时间为 2018 年 11 月 23 日 - 2018 年 12 月 31 日
    timeDurationPerson =
      startTime: personStartTime,
      endTime: personEndTime
    timeObjPerson = handleDuration timeDurationPerson
    handleProgressPerson timeObjPerson
    resetActivityTimePerson timeDurationPerson

  if currentTime.getTime() < enterpriseStartTime.getTime()
    # 如果当前时间活动没有开始
    timeObjEnterprise =
      durationTime: 0
      passTime: -1
      leftTime: 0
    handleProgressEnterprise timeObjEnterprise
  else
    timeDurationEnterprise = timeLoop enterpriseStartTime.getFullYear(), enterpriseStartTime.getMonth(), enterpriseStartTime.getDate(), 'enterprise'
    timeObjEnterprise = handleDuration timeDurationEnterprise
    handleProgressEnterprise timeObjEnterprise
    resetActivityTimeEnterprise timeDurationEnterprise

  rePositionTip()

  # 改变窗口大小重置 tip 的位置
  $(window).resize ->
    rePositionTip()

  $('.features-qvm1rmb-nav .nav-qvm1rmb li').click ->
    if $(this).hasClass 'active'
      return false