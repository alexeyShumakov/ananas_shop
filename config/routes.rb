Rails.application.routes.draw do
  resources :products, only: [:show, :index]
  resources :categories, only: [:show]
  root to: 'products#index'
end
