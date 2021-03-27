class SoundPostPlaylistsController < ApplicationController

  def new
    set_playlists
    @sound_post = SoundPost.find(params[:sound_post_id])
  end

  def create
    # sound_post = playlist.sound_posts.build(sound_post_params)
    sound_post_playlist = SoundPostPlaylist.new(
      playlist_id: params[:playlist_id],
      sound_post_id: params[:sound_post_id]
    )

    if sound_post_playlist.save
      redirect_to root_path
    else
      render :new
    end

  end

  private

  def set_playlists
    @playlists = current_user.playlists
  end

  def sound_post_params
    params.require(:sound_post).permit(:title, :description)
  end
end
