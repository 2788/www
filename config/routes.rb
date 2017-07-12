require 'domain_constraint'
Rails.application.routes.draw do

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  constraints DomainConstraint.new('career', 'career-source') do
    root to: 'career#index'
  end

  constraints DomainConstraint.new('blog', 'blog-source') do
    root to: 'articles#index'
  end

  root to: 'welcome#index'
  get '/products/kodo',        to: 'welcome#kodo'
  get '/products/pili',        to: 'welcome#pili'
  get '/products/pandora',     to: 'welcome#pandora'
  get '/products/fusion',      to: 'welcome#fusion'
  get '/products/dora',        to: 'welcome#dora'
  get '/products/kirk',        to: 'welcome#kirk'
  get '/products/vance',       to: 'welcome#vance'
  get '/products/atlib',       to: 'welcome#atlib'

  get '/contact',     to: 'welcome#contact'
  get '/solutions',   to: 'welcome#solution'
  get '/news',        to: 'welcome#news'
  get '/product_news',to: 'welcome#product_news'
  get '/welfares',    to: 'welcome#welfares'
  get '/company',     to: 'welcome#company'
  get '/case',        to: 'welcome#case'

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

end
