class Api::V1::SoundPostPlaylistsController < ApplicationController
  protect_from_forgery with: :null_session

  # 指定のsound_post_idを含むプレイリストを取得
  def index_belongs_to_playlist
    sound_post_playlists = SoundPostPlaylist.where(sound_post_id: params[:sound_post_id])
    render json: sound_post_playlists
  end

  def check_belongs_to_playlist
    sound_post_playlists = SoundPostPlaylist.where(sound_post_id: params[:sound_post_id])
    playlists = current_user.playlists
    check_array = []

    # 作成したプレイリストの中に中間テーブルのレコードが存在するか確認
    # 存在する場合 => true
    # 存在しない場合 => false
    playlists.each do |playlist|
      check_hash = {}
      checkFlag = sound_post_playlists.find_by(playlist_id: playlist.id).present?
      check_hash[playlist.title] = checkFlag
      # check_hash = { playlist.title: checkFlag }
      # checks.store(playlist.title, checkFlag)
      check_array << check_hash
    end
    render json: check_array
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
