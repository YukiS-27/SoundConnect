class SoundPostPlaylistsController < ApplicationController

  def new
    set_playlists
    @sound_post_playlist = SoundPostPlaylist.new
  end

  def create

  end

  def update
    sound_post_playlist = SoundPostPlaylist.new(playlist_id: playlist.id, sound_post_id: sound_post.id)

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
end
