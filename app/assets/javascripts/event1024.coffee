$(document).ready ->
  # 进度条部分
  $event1024ProgressBar = $('.features-event1024-progress .event1024-progress-bar .progress-bar')
  # 顶部微博 icon
  $weiboShareTop = $('.features-event1024-join .row .col-weibo')
  # 推荐好友部分
  $achievementTip = $('.features-event1024-recommend .recommend-container .achievement-tip')
  $recommendUnSignin = $('.features-event1024-recommend .recommend-container .recommend-unsignin')
  $recommendSignin = $('.features-event1024-recommend .recommend-container .recommend-signin')
  $recommendCopyBtn = $('.features-event1024-recommend .recommend-container .copy-btn')
  $weiboShareBottom = $('.features-event1024-recommend .recommend-container .icon-weibo')

  heatNodeList = [0, 33.33, 66.66, 100]
  weiboShareTopTitle = encodeURIComponent '七牛云 1024 采购狂欢节进行时，不撸代码，快来撸牛毛，抽万元锦牛豪礼（https://www.qiniu.com/events/1024event）微博关注@七牛云'

  uuid = generateUUID()
  timestamp = new Date().getTime()

  # paras =
  #   text: () ->
  #     return '123123'
  # new ClipboardJS '.features-event1024-recommend .recommend-container .copy-btn', paras

  # 页面顶部微博分享
  $weiboShareTop.on 'click', () ->
    window.open 'http://service.weibo.com/share/share.php?url=' + '' + '&type=button&ralateUid=2651079901&language=zh_cn&appkey=3084908017&title=' + weiboShareTopTitle + '&searchPic=false&style=simple', '_blank'

  $weiboShareBottom.on 'click', () ->
  
  # 显示 popover
  showPopover = (dom, message, position) ->
    paras =
      content: message
      trigger: 'manual'
      placement: position
    dom.popover(paras)
    dom.popover('show')
    timeOut = setTimeout ->
      dom.popover('hide')
      clearTimeout(timeOut)
    , 1000

  # 复制链接按钮单击事件
  $recommendCopyBtn.on 'click', () ->
    showPopover $recommendCopyBtn, '复制成功', 'top'

  # 根据热度更新宝箱上面的解锁文案
  resetAwardBox = (heat) ->
    heat100 = heat * 100
    activeIndexList = []
    for nodeValue, index in heatNodeList
      if heat100 >= nodeValue
        activeIndexList.push index
    for activeIndex in activeIndexList
      $('.features-event1024-progress .event1024-progress-row .award-box-' + activeIndex + ' .change-words').html '已解锁'
  
  # 更新进度条
  updateProgress = (heat) ->
    heat100 = heat * 100
    $event1024ProgressBar.attr 'aria-valuenow', heat100
    $event1024ProgressBar.css 'width', heat100 + '%'
    resetAwardBox heat

  # 获取当前热度
  $.ajax
    method: 'GET',
    url: '/calc_heat',
    success: (res) ->
      if res.isValid
        updateProgress res.value
    error: (err) ->
      # error

  # 获取用户信息，判断是否登录
  $.ajax
    method: 'GET',
    url: '/userinfo?u=' + uuid + '&t=' + timestamp,
    success: (res) ->
      if !res.is_signin
        # not signin
        $achievementTip.remove()
        $recommendSignin.remove()
      else
        # signin
        $recommendUnSignin.remove()
    error: (err) ->
      # error
      $achievementTip.remove()
      $recommendSignin.remove()
