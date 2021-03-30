class SoundPostLikesController < ApplicationController
  def create
    SoundPostLike.create(
      user_id: current_user.id,
      sound_post_id: params[:sound_post_id]
    )
    # 一旦トップページへ
    redirect_to root_path
  end

  def destroy
    sound_post_like = SoundPostLike.find_by(
      user_id: current_user.id,
      sound_post_id: params[:id]
    )
    sound_post_like.destroy if sound_post_like.present?
    redirect_to root_path
  end
end
