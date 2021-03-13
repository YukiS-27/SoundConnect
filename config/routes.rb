Rails.application.routes.draw do
  get 'home/index'
  get 'home/show'
  # トップページを音源投稿一覧ページへ
  # root to: "home#index"
  root to: "sound_posts#index"

  # deviseのコントローラーを継承
  devise_for :users, :controllers => {
    :confirmations => 'users/confirmations',
    :registrations => 'users/registrations',
    :sessions => 'users/sessions',
    :passwords => 'users/passwords'
  }

  devise_scope :user do
    get "sign_in", :to => "users/sessions#new"
    get "sign_out", :to => "users/sessions#destroy"
  end

  resources :sound_posts
  
end
