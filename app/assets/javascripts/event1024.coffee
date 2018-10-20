$(document).ready ->
  $hero1024Event = $('.hero-event1024')
  # 进度条部分
  $event1024ProgressBar = $('.features-event1024-progress .event1024-progress-bar .progress-bar')
  # 金牛部分
  $gettingStatus = $('.features-event1024-join .col-jinniu .getting-status')
  $signinToGet = $('.features-event1024-join .col-jinniu .signin-to-get')
  $canGet = $('.features-event1024-join .col-jinniu .can-get')
  $canGetBtn = $('.features-event1024-join .col-jinniu .can-get .btn')
  $canNotGet = $('.features-event1024-join .col-jinniu .can-not-get')
  $getSuccessModal = $('#success-modal-jinniu')
  canNotGetStatusCode = 0
  canGetStatusCode = 1
  # 推荐好友部分
  $achievementTip = $('.features-event1024-recommend .recommend-container .achievement-tip')
  $recommendUnSignin = $('.features-event1024-recommend .recommend-container .recommend-unsignin')
  $recommendSignin = $('.features-event1024-recommend .recommend-container .recommend-signin')
  $recommendCopyBtn = $('.features-event1024-recommend .recommend-container .copy-btn')
  $weiboShareIcon = $('.features-event1024-recommend .recommend-container .icon-weibo')

  userID = 0
  heatNodeList = [0, 33.33, 66.66, 100]
  weiboShareTitle = encodeURIComponent '七牛云 1024 采购狂欢节进行时，不撸代码，快来撸牛毛，抽万元锦牛豪礼（https://www.qiniu.com/events/1024event）@七牛云'
  unlockText = '已解锁'
  copyLinkText = '复制链接'
  copySuccessText = '复制成功'
  getLinkFailText = '获取链接失败'
  getInvitedInfoFailText = '获取荐成果失败'
  getUserStatusFailText = '获取用户信息失败'
  jinniuGetBtnText = '立即领取'
  jinniuGettingText = '领取中...'
  jinniuGetFailText = '领取失败'

  uuid = generateUUID()
  timestamp = new Date().getTime()

  # 显示 popover
  showPopover = (dom, message, position) ->
    paras =
      content: message
      trigger: 'manual'
      placement: position
    dom.popover paras
    dom.popover 'show'
    timeOut = setTimeout ->
      dom.popover 'hide'
      clearTimeout timeOut
    , 1000

  # 金牛部分立即领取单击事件
  $canGetBtn.on 'click', () ->
    if $canGetBtn.hasClass 'disabled'
      return
    # 加锁
    $canGetBtn.addClass 'disabled'
    $canGetBtn.html jinniuGettingText
    create_award()

  # 复制链接按钮单击事件
  $recommendCopyBtn.on 'click', () ->
    if $(this).hasClass 'disabled'
      return
    showPopover $recommendCopyBtn, copySuccessText, 'top'

  # 根据热度更新宝箱上面的解锁文案
  resetAwardBox = (heat) ->
    heat100 = heat * 100
    activeIndexList = []
    for nodeValue, index in heatNodeList
      if heat100 >= nodeValue
        activeIndexList.push index
    for activeIndex in activeIndexList
      $('.features-event1024-progress .event1024-progress-row .award-box-' + activeIndex + ' .change-words').html unlockText
  
  # 更新进度条
  updateProgress = (heat) ->
    heat100 = heat * 100
    $event1024ProgressBar.attr 'aria-valuenow', heat100
    $event1024ProgressBar.css 'width', heat100 + '%'
    resetAwardBox heat

  # 创建按钮的复制功能
  # copyContent: 要复制的内容
  createCopyBtn = (copyContent) ->
    paras =
      text: () ->
        return copyContent
    new ClipboardJS '.features-event1024-recommend .recommend-container .copy-btn', paras
  
  # 创建微博 icon 的分享功能
  # shareContent: 要分享的内容
  createWeiboShare = (shareContent) ->
    $weiboShareIcon.on 'click', () ->
      window.open 'http://service.weibo.com/share/share.php?url=' + shareContent + '&type=button&ralateUid=2651079901&language=zh_cn&appkey=3084908017&title=' + weiboShareTitle + '&searchPic=false&style=simple', '_blank'

  # 更新金牛部分的 UI
  # status: 用户状态
  updateJinNiuUI = (status) ->
    if status == canGetStatusCode
      $gettingStatus.remove()
      $signinToGet.remove()
      $canGet.show()
      $canNotGet.hide()
    else if status == canNotGetStatusCode
      $gettingStatus.remove()
      $signinToGet.remove()
      $canGet.remove()
      $canNotGet.show()
    else
      $gettingStatus.html getUserStatusFailText
      $signinToGet.remove()
      $canGet.remove()
      $canNotGet.remove()

  # 获取分享链接
  getShareURL = () ->
    $.ajax
      method: 'GET',
      url: '/get_share_link/' + userID,
      success: (res) ->
        if !res.is_valid
          # 获取链接失败
          $recommendCopyBtn.html getLinkFailText
        else
          # 获取链接成功
          createCopyBtn res.link
          $recommendCopyBtn.removeClass 'disabled'
          $recommendCopyBtn.html copyLinkText
          shareLink = encodeURIComponent res.link
          createWeiboShare shareLink
          $weiboShareIcon.show()
      error: (err) ->
        # error
        $recommendCopyBtn.html getLinkFailText
  
  # 获取用户邀请情况
  getInvitedInfo = () ->
    $.ajax
      method: 'GET',
      url: '/get_invited_info/' + userID,
      success: (res) ->
        if !res.is_valid
          # 邀请信息获取失败
          # 更新金牛部分
          $gettingStatus.html getUserStatusFailText
          $signinToGet.remove()
          $canGet.remove()
          $canNotGet.remove()
          # 更新邀请成果部分
          $achievementTip.html getInvitedInfoFailText
        else
          # 邀请信息获取成功
          invitedInfo = res.invited_info || {}
          invitedCount = invitedInfo.invited_count || 0
          money = invitedInfo.money || 0
          # 更新邀请成果
          $achievementTip.html '通过您的推荐，已经有 ' + invitedCount + ' 个好友成功下单，累计下单金额 ' + money + ' 元（每满 500 送 100），再接再厉，千元天猫券等你拿。'
          # 更新金牛部分
          updateJinNiuUI invitedInfo.status

      error: (err) ->
        # error
        # 更新金牛部分
        $gettingStatus.html getUserStatusFailText
        $signinToGet.remove()
        $canGet.remove()
        $canNotGet.remove()
        # 更新邀请成果部分
        $achievementTip.html getInvitedInfoFailText

  # 创建抽奖资格
  create_award = () ->
    # 获取当前热度
    $.ajax
      method: 'POST',
      url: '/event1024_create_award',
      data:
        uid: userID
      success: (res) ->
        if !res.is_success
          # 创建抽奖资格失败
          $canGetBtn.removeClass 'disabled'
          $canGetBtn.html jinniuGetBtnText
          showPopover $canGetBtn, jinniuGetFailText, 'top'
        else
          # 创建抽奖资格成功
          $getSuccessModal.modal 'show'
          $gettingStatus.remove()
          $signinToGet.remove()
          $canGet.remove()
          $canNotGet.show()
      error: (err) ->
        # error
        $canGetBtn.removeClass 'disabled'
        $canGetBtn.html jinniuGetBtnText
        showPopover $canGetBtn, jinniuGetFailText, 'top'

  if $hero1024Event.length != 0
    # 获取当前热度
    $.ajax
      method: 'GET',
      url: '/get_heat',
      success: (res) ->
        if res.is_valid
          updateProgress res.value
      error: (err) ->
        # error
  
  if $hero1024Event.length != 0
    # 获取用户信息，判断是否登录
    $.ajax
      method: 'GET',
      url: '/userinfo?u=' + uuid + '&t=' + timestamp,
      success: (res) ->
        if !res.is_signin
          # 未登录
          # 金牛部分
          $gettingStatus.remove()
          $signinToGet.show()
          $canGet.remove()
          $canNotGet.remove()
          # 推荐部分
          $recommendUnSignin.show()
          $achievementTip.remove()
          $recommendSignin.remove()
          $recommendCopyBtn.remove()
          $weiboShareIcon.remove()
        else
          # 登录
          # 金牛部分
          $gettingStatus.show()
          $signinToGet.hide()
          $canGet.hide()
          $canNotGet.hide()
          # 推荐部分
          $recommendUnSignin.remove()
          $achievementTip.show()
          $recommendSignin.show()
          $recommendCopyBtn.show()
          if res.uid
            userID = res.uid
            # 获取邀请信息
            getInvitedInfo()
            # 获取好友分享链接
            getShareURL()

      error: (err) ->
        # error
        # 金牛部分
        $gettingStatus.remove()
        $signinToGet.show()
        $canGet.remove()
        $canNotGet.remove()
        # 推荐部分
        $recommendUnSignin.show()
        $achievementTip.remove()
        $recommendSignin.remove()
        $recommendCopyBtn.remove()
        $weiboShareIcon.remove()