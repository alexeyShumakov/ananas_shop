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
    get 'addresses', to: 'cabinet#addresses'
  end

  namespace :admin do
    root to: 'dashboard#index'
    get 'dashboard/index'
    resources :products, only: [:index, :show]
    resources :banner_items, only: [:index]
    resources :categories
    resources :users
    resources :orders
    resources :orders_statuses
  end

  namespace :api do
    namespace :v1 do
      resources :addresses, only: [:create, :update, :destroy]
      resources :banner_items, only: [:index, :create, :destroy]
      resources :carts, only: [:show]
      resources :categories, only: [:index, :show]
      resources :fields, only: [:index, :create]
      resources :fields_values, only: [:create]
      resources :filters, only: [:index]
      resources :line_items, only: [:create, :destroy, :update]
      resources :orders, only: [:show, :update, :create] do
        get 'confirm', on: :member
        get 'notify', on: :member
      end
      resources :orders_statuses, only: [:index, :create, :update, :destroy]
      resources :pictures, only: [:create, :update, :destroy]
      resources :products, only: [:index, :create, :show, :update] do
        get 'last_seen', on: :collection
      end
      resources :products_fields, only: [:create, :update, :destroy]
      resources :users do
        get 'my_profile', on: :collection
        get 'roles', on: :collection
        put 'my_profile', to: 'users#update_profile', on: :collection
      end
    end
  end
end
