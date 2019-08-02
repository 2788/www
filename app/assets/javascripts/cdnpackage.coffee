$(document).ready ->
  $cdnPackagePage = $('.events-page-cdn_package')
  $cdnPackageEventEndModal = $('.events-page-cdn_package .modal.cdnpackage-modal')

  if $cdnPackagePage.length > 0 && $cdnPackageEventEndModal.length > 0
    $cdnPackageEventEndModal.modal 'show'
