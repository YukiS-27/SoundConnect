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
    @sound_post = SoundPost.find(params[:sound_post_id]) if params[:sound_post_id].present?
  end

  def create
    # ▼音源の投稿からプレイリストを作成する場合 = sound_post_idが存在するとき
    if params[:sound_post_id].present?
      # playlist = Playlist.new(title: params[:playlist][:title])
      playlist = Playlist.new(create_playlist_params)
      playlist.user_id = current_user.id
      sound_post = SoundPost.find(params[:sound_post_id])

      if playlist.save
        # redirect_to new_sound_post_playlist_path
        redirect_to controller: :sound_post_playlists, action: :new, sound_post_id: params[:sound_post_id]
      else
        render :new
      end

    # ▼プレイリストを直接作成する場合
    else
      playlist = Playlist.new(create_playlist_params)
      playlist.user_id = current_user.id

      if playlist.save
        # redirect_to new_sound_post_playlist_path
        redirect_to playlists_path
      else
        render :new
      end
    end
  end

  def edit
    @playlist = Playlist.find(params[:id])
  end

  def update
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
      flash[:success] = "プレイリストを削除しました"
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
