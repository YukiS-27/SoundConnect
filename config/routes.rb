Rails.application.routes.draw do
  # トップページを音源投稿一覧ページへ
  # root to: "home#index"
  root to: 'sound_posts#index'
  get 'home/index'
  get 'home/show'

  # deviseのコントローラーを継承
  devise_for :users,
    :controllers => {
      :confirmations => 'users/confirmations',
      :registrations => 'users/registrations',
      :sessions => 'users/sessions',
      :passwords => 'users/passwords'
    },

    # URL名のカスタマイズ
    path_names: {
      sign_in: 'login', sign_out: 'logout',
      edit: 'edit/account'
    }

  devise_scope :user do
    get 'sign_in', :to => 'users/sessions#new'
    get 'sign_out', :to => 'users/sessions#destroy'
  end

  # プロフィール設定
  get 'users/index', to: 'profiles#index', as: 'users'
  get 'users/:id', to: 'profiles#show', as: 'user_profile'
  resources :profiles, only: [:edit, :update]
  # get 'edit/profile', to: 'users/registrations#edit_profile', as: 'edit_profile'
  # patch 'update/profile', to: 'users/registrations#update_profile', as: 'update_profile'

  namespace :api do
    namespace :v1 do
      resources :playlists, only: [:index, :create]
      resources :sound_post_playlists, only: [:create, :destroy]
    end
  end

  resources :sound_posts
  resources :playlists
  resources :sound_post_playlists, only: [:new, :create, :destroy]

  # 投稿に対するいいね
  resources :sound_post_likes, only: [:create, :destroy]

  # メッセージルーム
  resources :rooms, only: [:index, :show, :create]
  get '/show_additionally', to: 'rooms#show_additionally'

end
