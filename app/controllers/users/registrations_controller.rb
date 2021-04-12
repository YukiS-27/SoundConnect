# ユーザー登録時
# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  before_action :configure_sign_up_params, only: [:create]
  before_action :configure_account_update_params, only: [:update]

  # GET /resource/sign_up
  def new
    @user_registration_form = UserRegistrationForm.new

    # super do |user|
    #   # フォームにprofileの要素を表示するためにbuild
    #   user.build_profile
    # end
  end

  # POST /resource
  # def create
  #   super
  # end

  # GET /resource/edit
  # def edit
  #   super
  # end

  # PUT /resource
  # def update
  #   super
  # end

  def edit_profile
    @user = current_user
  end

  def update_profile
    current_user.assign_attributes(configure_profile_update_params)
    # binding.pry

    if params.has_key?(:user)
      # current_user.avatar = params[:user][:avatar]
      current_user.avatar = avatar_params[:avatar]
    end

    # @user = current_user
    # @user.name = params[:name]
    # @user.introduction = params[:introduction]

    if current_user.save
      redirect_to detail_user_path(current_user)
    else
      render :edit_profile
    end
  end

  # DELETE /resource
  # def destroy
  #   super
  # end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  private

    def configure_profile_update_params
      params.permit(:name, :introduction)
    end

    def avatar_params
      params.require(:user).permit(:avatar)
    end

    # If you have extra params to permit, append them to the sanitizer.
    def configure_sign_up_params
      devise_parameter_sanitizer.permit(:sign_up) do |user|
        user.permit(
          *Devise::ParameterSanitizer::DEFAULT_PERMITTED_ATTRIBUTES[:sign_up], :email, :password,
          profile_attributes: [:id, :name]
        )
      end
    end

    # If you have extra params to permit, append them to the sanitizer.
    # def configure_account_update_params
    #   devise_parameter_sanitizer.permit(:account_update, keys: [])
    # end

  # The path used after sign up.
  # def after_sign_up_path_for(resource)
  #   super(resource)
  # end

  # The path used after sign up for inactive accounts.
  def after_inactive_sign_up_path_for(resource)
    detail_user_path(resource)
  end
end
