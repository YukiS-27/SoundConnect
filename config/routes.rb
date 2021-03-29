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

    # プロフィール設定を追加
    get 'edit/profile', to: 'users/registrations#edit_profile', as: 'edit_profile'
    patch 'update/profile', to: 'users/registrations#update_profile', as: 'update_profile'
  end

  # プロフィール設定
  get 'users/index', to: 'profiles#index', as: 'users'
  get 'users/:id', to: 'profiles#show', as: 'detail_user'

  resources :sound_posts
  resources :playlists
  resources :sound_post_playlists, only: [:new, :create, :destroy]
  resources :sound_post_likes

end
