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
    get '/products/kodo',           to: 'welcome#kodo'
    get '/products/pili',           to: 'welcome#pili'
    get '/products/pandora',        to: 'welcome#pandora'
    get '/products/fusion',         to: 'welcome#fusion'
    get '/products/dora',           to: 'welcome#dora'
    get '/products/kirk',           to: 'welcome#kirk'
    get '/products/vance',          to: 'welcome#vance'
    get '/products/atlab',          to: 'welcome#atlab'
    get '/products/plsv',           to: 'welcome#plsv'
    get '/products/player',         to: 'welcome#player'
    get '/products/newmedia',       to: 'welcome#newmedia'
    get '/products/pili/livequiz',  to: 'welcome#livequiz'

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
    get '/invitation',     to: 'welcome#invitation'
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
        get 'tech_online', 'ecug', 'niushow', 'arch', 'ecugcon'
      end
    end

    resources 'prices', only: [:index]
    get '/caculator', to: 'prices#caculator'

    resources :feedbacks, only: [:new, :create]

    resources 'niudays', only: [:index]
    get '/view', to: 'niudays#view'

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
