class ProfilesController < ApplicationController
  def show
    # URLからユーザーIDを取得
    @user = User.find(params[:id])
  end
end
