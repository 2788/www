require 'domain_constraint'
Rails.application.routes.draw do

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  constraints DomainConstraint.new('career', 'career-source', 'career-dev') do
    root to: 'career#index'
    get '/social',         to: 'career#social'
    get '/positions',      to: 'career#positions'
    get '/school',         to: 'career#school'
  end

  constraints DomainConstraint.new('blog', 'blog-source', 'blog-dev') do
    root to: 'blog#index'
    get '/archives/:id',                to: 'blog#archives', as: :archives
    get '/archives/author/:author',     to: 'blog#author',   as: :archives_author
    get '/archives/category/:category', to: 'blog#category', as: :archives_category
  end

  root to: 'welcome#index'
  get '/products/kodo',        to: 'welcome#kodo'
  get '/products/pili',        to: 'welcome#pili'
  get '/products/pandora',     to: 'welcome#pandora'
  get '/products/fusion',      to: 'welcome#fusion'
  get '/products/dora',        to: 'welcome#dora'
  get '/products/kirk',        to: 'welcome#kirk'
  get '/products/vance',       to: 'welcome#vance'
  get '/products/atlab',       to: 'welcome#atlab'
  get '/products/plsv',        to: 'welcome#plsv'

  get '/contact',      to: 'welcome#contact'
  get '/solutions',    to: 'welcome#solution'
  get '/news',         to: 'welcome#news'
  get '/product_news', to: 'welcome#product_news'
  get '/welfares',     to: 'welcome#welfares'
  get '/company',      to: 'welcome#company'
  get '/case',         to: 'welcome#case'
  get '/user-agreement',to: 'welcome#user_agreement'
  get '/sla-kodo',      to: 'welcome#sla_kodo'
  get '/sla-fusion',    to: 'welcome#sla_fusion'
  get '/sla-pili',      to: 'welcome#sla_pili'
  get '/sla-dora',      to: 'welcome#sla_dora'
  get '/goglobal',      to: 'welcome#goglobal'
  get '/newmedia',         to: 'welcome#newmedia'

  # userinfo
  get '/userinfo', to: 'userinfo#userinfo'

  resources 'events', only: [:index] do
    collection do
      get 'tech_online', 'ecug', 'niushow'
    end
  end

  resources 'prices', only: [:index]
  get '/caculator', to: 'prices#caculator'

  resources :feedbacks, only: [:new, :create]

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
