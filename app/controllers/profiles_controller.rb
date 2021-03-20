class ProfilesController < ApplicationController
  def index
    @users = User.all
  end

  def show
    # URLからユーザーIDを取得
    @user = User.find(params[:id])
    # ユーザーの投稿を取得
    @sound_posts = SoundPost.where(user_id: params[:id])
  end
end
