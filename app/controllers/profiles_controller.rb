class ProfilesController < ApplicationController
  def index
    @users = User.all
  end

  def show
    # URLからユーザーIDを取得
    @user = User.find(params[:id])
  end

  # def edit
  #   @user = current_user
  # end
  #
  # def update
  #   current_user.assign_attributes(profile_params)
  #   # binding.pry
  #
  #   if params.has_key?(:user)
  #     # current_user.avatar = params[:user][:avatar]
  #     # current_user.avatar = avatar_params[:avatar]
  #   end
  #
  #   # @user = current_user
  #   # @user.name = params[:name]
  #   # @user.introduction = params[:introduction]
  #
  #   if current_user.save
  #     redirect_to detail_user_path(current_user)
  #   else
  #     render :edit_profile
  #   end
  # end
  #
  # private
  #
  # def configure_profile_update_params
  #   params.require(:user).permit(:name, :introduction, :avatar)
  # end

end
