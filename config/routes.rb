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
    get '/products/kodo',                          to: 'products#kodo'
    get '/products/kodo/goglobal',                 to: 'products#kodo_goglobal'
    get '/products/pili',                          to: 'products#pili'
    get '/products/sdk',                           to: 'products#sdk'
    get '/products/rtn',                           to: 'products#rtn'
    get '/products/pandora',                       to: 'products#pandora'
    get '/products/insight',                       to: 'products#insight'
    get '/products/express',                       to: 'products#express'
    get '/products/censor',                        to: 'products#censor'
    get '/products/fusion',                        to: 'products#fusion'
    get '/products/dora',                          to: 'products#dora'
    get '/products/kirk',                          to: 'products#kirk'
    get '/products/vance',                         to: 'products#vance'
    get '/products/atlab',                         to: 'products#atlab'
    get '/products/plsv',                          to: 'products#plsv'
    get '/products/vcs',                           to: 'products#vcs'
    get '/products/player',                        to: 'products#player'
    get '/products/newmedia',                      to: 'products#newmedia'
    get '/products/newmedia/playout',              to: 'products#playout'
    get '/products/newmedia/mam',                  to: 'products#mam'
    get '/products/newmedia/convergence',          to: 'products#convergence'
    get '/products/newmedia/cms',                  to: 'products#cms'
    get '/products/newmedia/operation',            to: 'products#operation'
    get '/products/newmedia/live',                 to: 'products#live'
    # 超级分辨率下线，去掉路由
    # https://jira.qiniu.io/browse/BO-7148
    # get '/products/newmedia/resolution',           to: 'products#resolution'
    get '/products/newmedia/demolition',           to: 'products#demolition'
    # 业务微服务引擎下线，去掉路由
    # https://jira.qiniu.io/browse/BO-7148
    # get '/products/newmedia/microservices',        to: 'products#microservices'
    get '/products/newmedia/editor',               to: 'products#editor'
    # 数据可视化下线，去掉路由
    # https://jira.qiniu.io/browse/BO-7148
    # get '/products/newmedia/visualization',        to: 'products#visualization'
    get '/products/newmedia/interact',             to: 'products#interact'
    get '/products/newmedia/auditor',              to: 'products#auditor'
    get '/products/newmedia/copyright',            to: 'products#copyright'
    get '/products/pili/livequiz',                 to: 'products#livequiz'
    get '/products/qavs',                          to: 'products#qavs'
    get '/products/qvm',                           to: 'products#qvm'
    get '/products/qvm/partner',                   to: 'products#qvm_partner'
    get '/products/qvm-company',                   to: 'products#qvm_company'
    get '/products/edu',                           to: 'products#edu'
    get '/products/ess',                           to: 'products#ess'
    get '/products/snow',                          to: 'products#snow'
    get '/products/ecs',                           to: 'products#ecs'
    get '/products/private-cloud-kodo',            to: 'products#kodoprivate'
    get '/products/private-cloud-kodo/company',    to: 'products#kodoprivate_company'
    get '/products/linking',                       to: 'products#linking'
    get '/products/sms',                           to: 'products#sms'

    # 推广结束，屏蔽 qvmfeeds 和 censorfeeds 的路由
    # https://jira.qiniu.io/browse/BO-5919
    # qvm 广告推广页
    # get '/products/qvmfeeds',       to: 'products#qvmfeeds'
    # censor 广告推广页
    # get '/products/censorfeeds',    to: 'products#censorfeeds'

    # censor 新增的两个页面，用于关键词排名，只增加路由不新增入口
    # https://jira.qiniu.io/browse/BO-5767
    get '/products/censor/photo',   to: 'products#censor_photo'
    get '/products/censor/video',   to: 'products#censor_video'

    get '/contact',                to: 'welcome#contact'
    get '/solutions',              to: 'welcome#solution'
    get '/news',                   to: 'welcome#news'
    get '/product_news',           to: 'welcome#product_news'
    get '/welfares',               to: 'welcome#welfares'
    get '/company',                to: 'welcome#company'
    get '/case',                   to: 'welcome#case'
    get '/user-agreement',         to: 'welcome#user_agreement'
    get '/sdk-agreement',          to: 'welcome#sdk_agreement'
    get '/sla-kodo',               to: 'welcome#sla_kodo'
    get '/sla-kodo-old',           to: 'welcome#sla_kodo_old'
    get '/sla-kodo-new',           to: 'welcome#sla_kodo_new'
    get '/sla-fusion',             to: 'welcome#sla_fusion'
    get '/sla-fusion-old',         to: 'welcome#sla_fusion_old'
    get '/sla-fusion-new',         to: 'welcome#sla_fusion_new'
    get '/sla-pili',               to: 'welcome#sla_pili'
    get '/sla-dora',               to: 'welcome#sla_dora'
    get '/sla-sms',                to: 'welcome#sla_sms'
    get '/privacy-right',          to: 'welcome#privacy_right'
    # get '/goglobal',               to: 'welcome#goglobal'
    # get '/alaccelerator',          to: 'welcome#alaccelerator'
    get '/cdnprice2018',           to: 'welcome#cdnprice2018'
    get '/invite',                 to: 'welcome#invite'
    get '/ssl',                    to: 'welcome#ssl'
    get '/partner',                to: 'welcome#partner'

    get '/solutions/kodoe',                        to: 'solutions#kodoe'

    resources :resources, only: [] do
      collection do
        get 'plup'
      end
    end

    # userinfo
    get '/userinfo', to: 'userinfo#userinfo'

    resources 'events', only: [:index] do
      collection do
        get 'tech_online', 'ecug', 'niushow', 'arch', 'ecugcon', 'free', 'qvm1rmb', 'qvm0rmb', 'double11', 'qvm2for3', 'activity'
      end
    end

    # 1024 活动页定位到 events#event1024
    get '/events/1024event', to: 'events#event1024'
    # 限时 cdn 流量包活动页面路由
    get '/events/cdn-package', to: 'events#cdn_package'
    # cdn + 短视频活动页面路由
    get '/events/fusion-package', to: 'events#fusion_package'
    # qvm 燃情一夏活动
    get '/events/qvmsumsale', to: 'events#qvmsumsale'
    # dora 促销活动
    get '/events/dora-avsmart', to: 'events#dora_avsmart'
    # qvmsumsale 10 点开抢限制
    get '/events/qvmsumsale/is_start', to: 'events#qvmsumsale_is_start'
    # 2019 年 618 活动
    # https://jira.qiniu.io/browse/BO-7519
    get '/events/2019618', to: 'events#big_promotion'
    # 2019 年 618 活动是否结束
    get '/events/2019618/is_end', to: 'events#is_big_promotion_end'
    # 2019 年 1024 活动
    # https://jira.qiniu.io/browse/BO-9137
    get '/events/20191024', to: 'events#zelda'
    # 2019 年 1024 活动是否结束
    get '/events/20191024/is_end', to: 'events#is_zelda_end'
    # 2019 年 1111 活动
    get '/events/20191111', to: 'events#double11_2019'
    # 2019 年 1111 活动是否结束
    get '/events/20191111/is_end', to: 'events#is_double11_2019_end'
    # 2019 年 1111 活动 dora 领券
    post '/events/20191111/dora/voucher', to: 'events#double11_2019_dora_voucher'
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

    # 根据 jobID 获取视频审核结果
    post '/video_censor_result', to: 'products#video_censor_result'

    # 获取 censor 产品页 今日审核总量 和 今日已封禁违规内容 数据
    get '/censor_quantity_data', to: 'products#censor_quantity_data'

    # qvm
    post "/qvm/user/action", to: 'products#report_user_action'

    # get_heat
    get '/get_heat', to: 'events#get_heat'

    resources 'prices', only: [:index]
    # https://jira.qiniu.io/browse/BO-6267
    # caculator 路由改为 calculator, caculator_qvm 路由改为 calculator_qvm
    # 为了防止现有的路由 404，因此不关闭现有路由
    get '/caculator', to: 'prices#caculator'
    get '/caculator_qvm', to: 'prices#caculator_qvm'
    get '/calculator', to: 'prices#caculator'
    get '/calculator_qvm', to: 'prices#caculator_qvm'

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

    resources :download, only: []
    get '/download/snow-white-paper',    to: 'download#snow_white_paper'
    get '/download/plsv-white-paper',    to: 'download#plsv_white_paper'
    get '/download/kodo-white-paper',    to: 'download#kodo_white_paper'
    get '/download/atlab-white-paper',   to: 'download#atlab_white_paper'
    get '/download/rtn-white-paper',     to: 'download#rtn_white_paper'
    get '/download/kodoe-white-paper',   to: 'download#kodoe_white_paper'
    get '/download/pili-white-paper',    to: 'download#pili_white_paper'
    get '/download/qavs-white-paper',    to: 'download#qavs_white_paper'

    get "robots.txt" => "welcome#robots"

    match "/404", :to => "errors#not_found", :via => :all
    match "/500", :to => "errors#internal_server_error", :via => :all
  end

end
