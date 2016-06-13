Rails.application.routes.draw do
  resources :categories, only: [:show]
  root to: 'visitors#index'
end
