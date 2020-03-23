$(document).ready ->
  $invitePage = $('.welcome-page-invite .invite-page-container')
  $inviteBtns = $invitePage.find('.invite-btn')

  changeInviteBtnsHrefTOPortal = () ->
    if $inviteBtns.length > 0
      $inviteBtns.attr 'href', 'https://portal.qiniu.com/invitation'

  invitePageGetUserInfo = () ->
    uuid = generateUUID()
    timestamp = new Date().getTime()
    $.ajax
      method: 'GET',
      url: '/userinfo?u=' + uuid + '&t=' + timestamp,
      success: (res) ->
        if res && res.is_signin
          changeInviteBtnsHrefTOPortal()

  if $invitePage.length > 0
    invitePageGetUserInfo()
