class Api::V1::SoundPostPlaylistsController < ApplicationController
  protect_from_forgery with: :null_session

  # 指定のsound_post_idを含むプレイリストを取得
  def index_belongs_to_playlist
    set_sound_post_playlists
    render json: sound_post_playlists
  end

  def check_belongs_to_playlist
    set_sound_post_playlists
    playlists = current_user.playlists
    checks = []

    # 作成したプレイリストの中に中間テーブルのレコードが存在するか確認
    # 存在する場合 => true
    # 存在しない場合 => false
    playlists.each.with_index do | playlist, i |
      checks[i] = sound_post_playlists.find_by(playlist_id: playlist.id).present?
    end
    render json: checks
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

  def set_sound_post_playlists
    sound_post_playlists = SoundPostPlaylist.where(sound_post_id: params[:sound_post_id])
  end
end
