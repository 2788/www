$(document).ready ->
  $productsPageKodoprivate = $('.products-page-kodoprivate')
  $kodoPrivatePageDownloadBtn = $productsPageKodoprivate.find('.hero-kodo-private .actions .btn-download')

  if $productsPageKodoprivate.length > 0

    uuid = generateUUID()
    timestamp = new Date().getTime()

    $.ajax
      method: 'GET',
      url: '/userinfo?u=' + uuid + '&t=' + timestamp,
      success: (res) ->
        if res.is_signin
          # 登录状态下改变私有云存储落地页顶部下载试用按钮的行为
          modifyKodoPrivatePageDownloadBtn res.email, res.name

    modifyKodoPrivatePageDownloadBtn = (email, name) ->
      if $kodoPrivatePageDownloadBtn.length > 0
        # 改变 href
        $kodoPrivatePageDownloadBtn.attr 'href', 'https://developer.qiniu.com/kodoe/manual/5867/a-free-trial'
        # 单击后向后台推一个反馈表单
        $kodoPrivatePageDownloadBtn.on 'click', (e) ->

          feedbackEmail = if email then email else 'marketing@qiniu.com'
          feedbackName = if name then name else '市场部'

          feedbackData = new FormData()
          feedbackData.append 'feedback[email]', feedbackEmail
          feedbackData.append 'feedback[content]', '私有云存储产品页下载试用'
          feedbackData.append 'feedback[phone]', '00000000000'
          feedbackData.append 'feedback[province]', '上海市'
          feedbackData.append 'feedback[name]', feedbackName

          uuid = generateUUID()
          timestamp = new Date().getTime()

          $.ajax
            method: 'POST',
            url: '/feedbacks?t=' + uuid + '-' + timestamp,
            data: feedbackData,
            processData: false,
            contentType: false