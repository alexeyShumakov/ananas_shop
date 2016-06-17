Rails.application.routes.draw do
  resources :products, only: [:show, :index]
  resources :categories, only: [:show]
  root to: 'products#index'

  get 'my_cart', to: 'carts#my_cart'

  namespace :api do
    namespace :v1 do
      resources :line_items, only: [:create, :destroy]
      resources :carts, only: [:show]
    end
  end
end
