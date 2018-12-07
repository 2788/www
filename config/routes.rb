require 'domain_constraint'
Rails.application.routes.draw do

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  constraints DomainConstraint.new('career', 'career-source', 'career-dev') do
    root to: 'career#index'
    get '/social',         to: 'career#social'
    get '/school',         to: 'career#school'
    get '/position/:id',   to: 'career#position', as: :position
  end

  constraints DomainConstraint.new('blog', 'blog-source', 'blog-dev') do
    root to: 'blog#index'
    get '/archives/all',                to: 'blog#all'
    get '/archives/:id',                to: 'blog#archives', as: :archives
    get '/archives/author/:author',     to: 'blog#author',   as: :archives_author
    get '/archives/category/:category', to: 'blog#category', as: :archives_category
  end

  scope "(:locale)", locale: /en/ do
    root to: 'welcome#index'
    get '/products/kodo',                  to: 'products#kodo'
    get '/products/pili',                  to: 'products#pili'
    get '/products/sdk',                   to: 'products#sdk'
    get '/products/rtn',                   to: 'products#rtn'
    get '/products/pandora',               to: 'products#pandora'
    get '/products/insight',               to: 'products#insight'
    get '/products/censor',                to: 'products#censor'
    get '/products/fusion',                to: 'products#fusion'
    get '/products/dora',                  to: 'products#dora'
    get '/products/kirk',                  to: 'products#kirk'
    get '/products/vance',                 to: 'products#vance'
    get '/products/atlab',                 to: 'products#atlab'
    get '/products/plsv',                  to: 'products#plsv'
    get '/products/vcs',                   to: 'products#vcs'
    get '/products/player',                to: 'products#player'
    get '/products/newmedia',              to: 'products#newmedia'
    get '/products/pili/livequiz',         to: 'products#livequiz'
    get '/products/qavs',                  to: 'products#qavs'
    get '/products/qvm',                   to: 'products#qvm'
    get '/products/edu',                   to: 'products#edu'
    get '/products/ess',                   to: 'products#ess'
    get '/products/snow',                  to: 'products#snow'
    get '/products/ecs',                   to: 'products#ecs'
    get '/products/private-cloud-kodo',    to: 'products#kodoprivate'
    # qvm 广告推广页
    get '/products/qvmfeeds',       to: 'products#qvmfeeds'
    # censor 广告推广页
    get '/products/censorfeeds',    to: 'products#censorfeeds'

    # censor 新增的两个页面，用于关键词排名，只增加路由不新增入口
    # https://jira.qiniu.io/browse/BO-5767
    get '/products/censor/photo',   to: 'products#censor_photo'
    get '/products/censor/video',   to: 'products#censor_video'

    get '/contact',        to: 'welcome#contact'
    get '/solutions',      to: 'welcome#solution'
    get '/news',           to: 'welcome#news'
    get '/product_news',   to: 'welcome#product_news'
    get '/welfares',       to: 'welcome#welfares'
    get '/company',        to: 'welcome#company'
    get '/case',           to: 'welcome#case'
    get '/user-agreement', to: 'welcome#user_agreement'
    get '/sla-kodo',       to: 'welcome#sla_kodo'
    get '/sla-fusion',     to: 'welcome#sla_fusion'
    get '/sla-pili',       to: 'welcome#sla_pili'
    get '/sla-dora',       to: 'welcome#sla_dora'
    get '/goglobal',       to: 'welcome#goglobal'
    get '/alaccelerator',  to: 'welcome#alaccelerator'
    get '/cdnprice2018',   to: 'welcome#cdnprice2018'
    get '/invite',         to: 'welcome#invite'
    get '/ssl',            to: 'welcome#ssl'
    get '/partner',        to: 'welcome#partner'

    resources :resources, only: [] do
      collection do
        get 'plup'
      end
    end

    # userinfo
    get '/userinfo', to: 'userinfo#userinfo'
    
    resources 'events', only: [:index] do
      collection do
        get 'tech_online', 'ecug', 'niushow', 'arch', 'ecugcon', 'free', 'qvm1rmb', 'qvm0rmb', 'double11'
      end
    end

    # 1024 活动页定位到 events#event1024
    get '/events/1024event', to: 'events#event1024'
    # 获取分享链接
    get '/get_share_link', to: 'events#get_share_link'
    # 获取用户邀请信息
    get '/get_invited_info', to: 'events#get_invited_info'
    # 获取 1024 活动是否过期
    get '/get_expired', to: 'events#get_expired'
    # 创建 1024 活动抽奖资格
    post '/event1024_create_award', to: 'events#event1024_create_award'

    # img_censor
    post '/img_censor', to: 'products#img_censor'

    # video_censor
    post '/video_censor', to: 'products#video_censor'

    # get_heat
    get '/get_heat', to: 'events#get_heat'

    resources 'prices', only: [:index]
    get '/caculator', to: 'prices#caculator'

    resources :feedbacks, only: [:new, :create]

    resources 'niudays', only: [:index]
    get '/niudays/hangzhou', to: 'niudays#view'
    get '/niudays/xian', to: 'niudays#xian'
    get '/niudays/shenzhen', to: 'niudays#shenzhen'
    get '/niudays/xiamen', to: 'niudays#xiamen'
    get '/niudays/chengdu', to: 'niudays#chengdu'
    get '/niudays/beijing', to: 'niudays#beijing'

    resources :recommendations, only: [:new, :create]

    resources :cooperations, only: [:index] do
      collection do
        post 'create_channel', 'create_developer'
      end
    end

    get "robots.txt" => "welcome#robots"

    match "/404", :to => "errors#not_found", :via => :all
    match "/500", :to => "errors#internal_server_error", :via => :all
  end

end
