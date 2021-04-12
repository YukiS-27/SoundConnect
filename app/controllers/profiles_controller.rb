class ProfilesController < ApplicationController
  before_action :authenticate_user!, only: %i[edit update]

  def index
    @users = User.all
  end

  def show
    # URLからユーザーIDを取得
    @user = User.find(params[:id])
    @profile = Profile.find_by(user_id: params[:id])
  end

  def edit
    # @user = current_user
    @profile = Profile.find_by(user_id: params[:id])
  end

  def update
    profile = Profile.find(params[:id])
    profile.assign_attributes(configure_profile_update_params)

    if profile.save
      redirect_to user_profile_path(current_user)
    else
      render :edit
    end
  end

  private

  def configure_profile_update_params
    params.require(:profile).permit(:name, :introduction, :avatar, :avatar_cache)
  end

end
