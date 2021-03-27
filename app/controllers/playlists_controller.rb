class PlaylistsController < ApplicationController

  def index
    set_playlists
  end

  def show
    @playlist = Playlist.find(params[:id])
    @sound_posts = SoundPost.where(playlists_id: @playlist.id)
    @user = current_user
  end

  def new
    @sound_post = SoundPost.find(params[:id])
    @psound_post_playlist = @sound_post.playlists.build
    set_playlists
  end

  def create
    playlist = Playlist.new(create_playlist_params)
    playlist.user_id = current_user.id
    sound_post_playlist = sound_post.playlists.build(sound_post.id)

    if playlist.save
      redirect_to root_path
    else
      render :new
    end
  end

  def update
    sound_post = SoundPost.find(params[:id])
    sound_post_playlist = SoundPostPlaylist.new(playlist_id: playlist.id, sound_post_id: sound_post.id)

    if sound_post_playlist.save
      redirect_to root_path
    else
      render :new
    end
  end

  private

  def create_playlist_params
    # params[:playlist][:title] の形で渡ってくる
    params.require(:playlist).permit(:title, { sound_post_playlists: [] })
  end

  def playlist_params
    params.re
  end

  def set_playlists
    @playlists = current_user.playlists
  end

end
