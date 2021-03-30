class SoundPostLikesController < ApplicationController
  # before_action :sound_post_params

  def create
    @sound_post = SoundPost.find(params[:sound_post_id])
    SoundPostLike.create(
      user_id: current_user.id,
      sound_post_id: params[:sound_post_id]
    )
  end

  def destroy
    @sound_post = SoundPost.find(params[:id])
    sound_post_like = SoundPostLike.find_by(
      user_id: current_user.id,
      sound_post_id: params[:id]
    )
    sound_post_like.destroy if sound_post_like.present?
  end

  private

  # def sound_post_params
  #   @sound_post = SoundPost.find(params[:id])
  # end
end
