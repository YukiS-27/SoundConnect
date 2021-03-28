class PlaylistsController < ApplicationController

  def index
    set_playlists
  end

  def show
    @playlist = Playlist.find(params[:id])
  end

  def new
    # @psound_post_playlist = @sound_post.playlists.build
    @playlist = Playlist.new
  end

  def create
    playlist = Playlist.new(create_playlist_params)
    playlist.user_id = current_user.id
    # sound_post_playlist = sound_post.playlists.build(sound_post.id)

    if playlist.save
      redirect_to new_sound_post_playlist_path
    else
      render :new
    end
  end

  def edit
    @playlist = Playlist.find(params[:id])
  end

  def update
    # playlist.assign_attributes(configure_playlist_update_params)

    playlist = Playlist.find(params[:id])
    # playlist.title = params[:title]
    if playlist.update(playlist_update_params)
      redirect_to playlists_path
    else
      render :edit
    end
  end

  def destroy
    playlist = Playlist.find(params[:id])
    playlist.destroy if playlist.present?

    if playlist.destroyed?
      redirect_to playlists_path
    else
      render :edit
    end
  end

  private

  def set_playlists
    @playlists = current_user.playlists
  end

  def create_playlist_params
    # params[:playlist][:title] の形で渡ってくる
    params.require(:playlist).permit(:title, { sound_post_playlists: [] })
  end

  def playlist_update_params
    params.permit(:title)
  end

end
