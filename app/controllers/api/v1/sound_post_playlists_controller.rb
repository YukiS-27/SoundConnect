class Api::V1::SoundPostPlaylistsController < ApplicationController
  protect_from_forgery with: :null_session
  # skip_before_action :verify_authenticity_token

  def test
    sound_post_playlist = SoundPostPlaylist.find_by(
      sound_post_id: params[:sound_post_id],
      playlist_id: params[:playlist_id]
    )
    render json: sound_post_playlist
  end


  def index_has_playlist_ids
    sound_post_playlists = SoundPostPlaylist
                            .eager_load(:playlist)
                            .where(playlist: {user_id: current_user})
                            .map(&:id)
    render json: sound_post_playlists
  end

  def check_contained_in_playlist
    # 選択した曲が既に存在するプレイリストのidを取得
    checks = current_user
              .playlists
              .eager_load(:sound_post_playlists)
              .where(sound_post_playlists: {sound_post_id: params[:sound_post_id]})
              .map(&:id)

    render json: checks
  end

  def create
    sound_post_playlist = SoundPostPlaylist.new(sound_post_playlist_params)
    if sound_post_playlist.save
      # render json: sound_post_playlist
      head :no_content
    else
      render json: sound_post_playlist.errors, status: 422
    end
  end

  def delete
    sound_post_playlist = SoundPostPlaylist.where(
      playlist_id: params[:playlist_id],
      sound_post_id: params[:sound_post_id]
    )

    if sound_post_playlist.delete_all
      head :no_content
    else
      render json: { error: "削除に失敗しました" }, status: 422
    end
  end

  private
  def sound_post_playlist_params
    params.require(:sound_post_playlist).permit(:sound_post_id, :playlist_id)
    # params.permit(:sound_post_id, :playlist_id)
  end

end
