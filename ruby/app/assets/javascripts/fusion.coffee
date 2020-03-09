$(document).ready ->
  $productsFusionBanner = $('.jumbotron.hero.hero-fusion')
  $productsFusionScene = $('.features-fusion.features-scene')
  $productsFusionSceneNavLi = $productsFusionScene.find('.tabs .nav.nav-tabs li')
  $productsFusionSceneTab = $productsFusionScene.find('.tabs .tab-content')

  showAssignTabOfFusionScene = (assignNav, assignTab) ->
    for navLi in $productsFusionSceneNavLi
      if $(navLi).hasClass assignNav
        # 去掉所有的 active 类
        $productsFusionSceneNavLi.removeClass 'active'
        $productsFusionSceneNavLi.find('a').attr 'aria-expanded', 'false'
        $productsFusionSceneTab.find('section').removeClass 'in active'
        # 给指定目标添加 active 类
        $(navLi).addClass 'active'
        $(navLi).find('a').attr 'aria-expanded', 'true'
        $productsFusionSceneTab.find('#' + assignTab).addClass 'in active'

  if $productsFusionBanner.length > 0
    # 解析到 url 里面的 hash 值
    # 如果等于 #products-fusion-scene（官网首页 banner 跳转）
    # 使用场景模块默认选中 动态加速 项
    urlHash = window.location.hash
    if urlHash == "#products-fusion-scene"
      showAssignTabOfFusionScene 'dynamic-accelerate', 'tab-usage-section-4'
