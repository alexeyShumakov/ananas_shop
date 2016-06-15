Rails.application.routes.draw do
  resources :products, only: [:show, :index]
  resources :categories, only: [:show]
  root to: 'products#index'

  namespace :api do
    namespace :v1 do
      resources :line_items, only: [:create, :destroy]
    end
  end
end
