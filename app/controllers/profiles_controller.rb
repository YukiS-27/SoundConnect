class ProfilesController < ApplicationController
  def index
    @users = User.all
  end

  def show
    # URLからユーザーIDを取得
    @user = User.find(params[:id])
  end
end
