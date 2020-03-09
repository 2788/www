$(document).ready ->
  # page
  $fightingNcovEventPage = $('.events-page-fighting_ncov')
  # apply button
  $fightingNcovApplyBtn = $fightingNcovEventPage.find('.features-fighting-ncov .row .col-apply .btn-apply')

  fightingNcovApplyJinshujuURL = 'https://jinshuju.net/f/1JOE1G?x_field_1='

  enableFightingNcovApplyBtn = () ->
    if $fightingNcovApplyBtn.length > 0
      $fightingNcovApplyBtn.removeClass 'disabled'

  changeFightingNcovApplyBtnURL = (uid) ->
    if $fightingNcovApplyBtn.length > 0
      $fightingNcovApplyBtn.attr 'href', fightingNcovApplyJinshujuURL + uid

  fightingNcovGetUserInfo = () ->
    uuid = generateUUID()
    timestamp = new Date().getTime()
    $.ajax
      method: 'GET',
      url: '/userinfo?u=' + uuid + '&t=' + timestamp,
      success: (res) ->
        if res && res.is_signin && res.uid
          changeFightingNcovApplyBtnURL res.uid
        enableFightingNcovApplyBtn()
      error: (err) ->
        enableFightingNcovApplyBtn()

  # start
  if $fightingNcovEventPage.length > 0
    fightingNcovGetUserInfo()
