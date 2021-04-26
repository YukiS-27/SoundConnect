class Api::V1::PlaylistsController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    sound_posts = SoundPost.all.includes(:user)
    render json: sound_posts
  end

  def create
    sound_post = SoundPost.new(sound_post_params)
    if sound_post.save
      render json: sound_post
    else
      render json: sound_post.errors, status: 422
    end
  end

  def update
    sound_post = SoundPost.find(params[:id])
    if sound_post.update(sound_post_params)
      render json: sound_post
    else
      render json: sound_post.errors, status: 422
    end
  end

  def destroy
    if SoundPost.destroy(params[:id])
      head :no_content
    else
      render json: { error: "削除に失敗しました" }, status: 422
    end
  end

  private
  def sound_post_params
    params.require(:sound_post).permit(
      :title,
      :sound_source,
      :description,
      :instrument_id
    ).merge(user_id: current_user.id)
  end
end
