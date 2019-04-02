$(document).ready ->
  $hotPartDropdown = $('.features-qvm2for3-hot .content-dropdown .qvm2for3-hot-dropdown')
  $dbPartDropdown = $('.features-qvm2for3-db .content-dropdown .qvm2for3-db-dropdown')

  # 热卖机型部分下拉菜单事件
  if $hotPartDropdown.length > 0
    $hotPartDropdown.on 'change', (e) ->
      $container = $(this).parents('.content-container')
      $sections = $container.find('.content-section')
      for section in $sections
        if $(section).hasClass 'active'
          $(section).removeClass 'active'
          $(section).css 'display', 'none'
      $container.find('#' + e.target.value).fadeIn 300, () ->
        $(this).addClass 'active'
  
  # 云数据库部分下拉菜单事件
  if $dbPartDropdown.length > 0
    $dbPartDropdown.on 'change', (e) ->
      $container = $(this).parents('.content-container')
      $sections = $container.find('.content-section')
      for section in $sections
        if $(section).hasClass 'active'
          $(section).removeClass 'active'
          $(section).css 'display', 'none'
      $container.find('#' + e.target.value).fadeIn 300, () ->
        $(this).addClass 'active'