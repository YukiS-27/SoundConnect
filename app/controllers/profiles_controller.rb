class ProfilesController < ApplicationController
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

    # profile.avatar = avatar_params[:avatar]

    # if params.has_key?(:user)
      # current_user.avatar = params[:user][:avatar]
      # current_user.avatar = avatar_params[:avatar]
    # end

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

  # def avatar_params
  #   params.permit(:avatar)
  # end

end
