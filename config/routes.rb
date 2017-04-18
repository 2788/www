Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'welcome#index'

  constraints subdomain: 'career-source' do
    root to: 'career#index'
  end

  # constraints subdomain: 'blog' do
  #   resources :articles
  # end

end
