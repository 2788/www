$(document).ready ->
  $productsPageDora = $('.products-page-dora')
  $doraFuncContainer = $('.products-page-dora .features-dora-func')

  if $productsPageDora.length > 0
    $callFormLink = $doraFuncContainer.find '.tab-content section .tab-content-form'
    $callFormLink.on 'click', () ->
      flag = $(this).attr 'id'
      if flag != ''
        location = window.location
        window.history.pushState {}, 0, location.origin + location.pathname + '?flag=' + flag