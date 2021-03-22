class PlaylistsController < ApplicationController
  def new
    @playlist = Playlist.new
  end

  def index
    @playlists = Playlist.all
  end

  private

  def playlist_params
    params.require(:playlist).permit(:title, { sound_post_playlists: [] })
  end
end
