$(document).ready ->
  # 产品与服务项高度控制
  refreshHeight = ->
    # 云主机项图片的高度
    imgHH = $('.features-qvm-product .product-row .col-image-lg').height()
    # 其余项图片的高度
    imgH = $('.features-qvm-product .product-row .col-image').height()
    if imgH != 0
      $('.features-qvm-product .product-row .col-content').height(imgH - 80)
    if imgHH != 0
      $('.features-qvm-product .product-row .col-content-lg').height(imgHH - 40)
  refreshHeight()
  $(window).resize ->
    refreshHeight()