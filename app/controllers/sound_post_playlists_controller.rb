class SoundPostPlaylistsController < ApplicationController

  def new
    set_playlists
    @sound_post = SoundPost.find(params[:sound_post_id]) if params[:sound_post_id].present?
  end

  def create
    @sound_post = SoundPost.find(params[:sound_post][:sound_post_id])

    SoundPostPlaylist.transaction do
      params[:sound_post][:playlist_ids].each do |playlist_id|
        sound_post_playlist = SoundPostPlaylist.new(
          playlist_id: playlist_id,
          sound_post_id: params[:sound_post][:sound_post_id]
        )
        sound_post_playlist.save!
      end
    end

      flash[:success] = "プレイリストに追加しました"
      redirect_to root_path

    rescue => e
      flash[:danger] = "保存に失敗しました" + e.to_s
      render :new
  end

  private

  def set_playlists
    @playlists = current_user.playlists
  end

  def sound_post_params
    params.require(:sound_post).permit(:title, :description)
  end
end
