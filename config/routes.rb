Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy]
    
    resources :accounts, only: [:show, :index, :create, :destroy, :update]
    
    resources :transactions, except: [:new, :edit] do
      get 'search', on: :collection
    end 
    
    resources :investments, except: [:new, :edit] do
      get 'search', on: :collection
    end 
    
    resources :stocks, only: [:index]
  end

  root "static_pages#root"
end
