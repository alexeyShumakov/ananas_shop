Rails.application.routes.draw do

  resources 'orders', only: ['new', 'create']

  devise_for :users
  resources :products, only: [:show, :index] do
    get 'search', on: :collection
  end
  resources :categories, only: [:show]
  root to: 'products#index'

  get 'my_cart', to: 'carts#my_cart'

  namespace :api do
    namespace :v1 do
      resources :filters, only: [:index]
      resources :line_items, only: [:create, :destroy, :update]
      resources :carts, only: [:show]
      resources :products, only: [:index]
    end
  end
end
