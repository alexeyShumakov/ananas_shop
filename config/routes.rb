Rails.application.routes.draw do

  resources 'orders', only: ['new', 'create']

  devise_for :users
  resources :products, only: [:show, :index] do
    get 'search', on: :collection
  end
  resources :categories, only: [:show]
  root to: 'products#index'

  get 'my_cart', to: 'carts#my_cart'
  namespace :my_cabinet do
    root to: 'cabinet#my_cabinet'
    get 'orders', to: 'cabinet#orders'
  end

  namespace :admin do
    root to: 'dashboard#index'
    get 'dashboard/index'
    resources :products
    resources :banner_items
  end

  namespace :api do
    namespace :v1 do
      resources :addresses
      resources :categories
      resources :banner_items
      resources :pictures
      resources :filters, only: [:index]
      resources :line_items, only: [:create, :destroy, :update]
      resources :carts, only: [:show]
      resources :products, only: [:index, :create, :show, :update]
      resources :fields
      resources :fields_values
      resources :products_fields
      resources :users do
        get 'my_profile', on: :collection
        put 'my_profile', to: 'users#update_profile', on: :collection
      end
    end
  end
end
