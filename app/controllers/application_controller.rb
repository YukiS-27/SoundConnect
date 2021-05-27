class ApplicationController < ActionController::Base
  # deviseコントローラーを使う前に呼ばれるアクション
  # before_action :configure_permitted_parameters, if: :devise_controller?

  # private

  # def configure_permitted_parameters
  #   新規登録時にnameの取得を許可する
  #   devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  # end
end
