class Api::V1::SoundPostPlaylistsController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    sound_post_playlists = SoundPostPlaylist.all
    render json: sound_post_playlists
  end

  def create
    sound_post_playlist = SoundPostPlaylist.new(sound_post_playlist_params)
    if sound_post_playlist.save
      render json: sound_post_playlist
    else
      render json: sound_post_playlist.errors, status: 422
    end
  end

  def destroy
    sound_post_playlist = SoundPostPlaylist.find_by(
      playlist_id: params[:playlist_id],
      sound_post_id: params[:sound_post_id]
    )

    if sound_post_playlist.destroy
      head :no_content
    else
      render json: { error: "削除に失敗しました" }, status: 422
    end
  end

  private
  def sound_post_playlist_params
    params.require(:sound_post_playlist).permit(:sound_post_id, :playlist_id)
  end
end
