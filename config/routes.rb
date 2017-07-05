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
  get '/kodo',        to: 'welcome#kodo'
  get '/pili',        to: 'welcome#pili'
  get '/pandora',     to: 'welcome#pandora'
  get '/contact',     to: 'welcome#contact'
  get '/fusion',      to: 'welcome#fusion'
  get '/dora',        to: 'welcome#dora'
  get '/kirk',        to: 'welcome#kirk'
  get '/vance',       to: 'welcome#vance'
  get '/solution',    to: 'welcome#solution'
  get '/about',       to: 'welcome#about'
  get '/company',     to: 'welcome#company'
  get '/cooperation', to: 'welcome#cooperation'
  get '/case',        to: 'welcome#case'
  get '/atlib',       to: 'welcome#atlib'

  resources 'events', only: [:index] do
    collection do
      ['tech', 'ecug', 'niurenxiu'].each do |r|
        get r, action: 'list', uni_data: r
      end
    end
  end

  resources 'prices', only: [:index]
  get '/caculator', to: 'prices#caculator'

  resources :feedbacks, only: [:new, :create]

  resources :recommendations, only: [:new, :create]

end
