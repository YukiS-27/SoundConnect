class SoundPostPlaylistsController < ApplicationController

  def new
    set_playlists
    @sound_post = SoundPost.find(params[:sound_post_id]) if params[:sound_post_id].present?
    respond_to do |format|
      format.html
      # link_toメソッドをremote: trueに設定したのでリクエストはjs形式で行われる（詳しくは参照記事をご覧ください）
      format.js
    end
  end

  def create
    # チェックされているかを判定
    # if params[:sound_post][:playlist_ids].nil?
      # flash[:danger] = "プレイリストを選択してください"
      # render :new
    # end
      @sound_post = SoundPost.find(params[:sound_post][:sound_post_id])

      # チェックされた数だけ中間テーブルのレコードを生成
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

  def destroy
    sound_post_playlist = SoundPostPlaylist.find_by(
      playlist_id: params[:playlist_id],
      sound_post_id: params[:sound_post_id]
    )

    sound_post_playlist.destroy if sound_post_playlist.present?

    if sound_post_playlist.destroyed?
      flash[:success] = "プレイリストから削除しました"
      redirect_to controller: :playlists, action: :show, id: params[:playlist_id]
    else
      render template: "playlists/edit"
    end
  end

  private

  def set_playlists
    @playlists = current_user.playlists
  end

  # def sound_post_playlist_params
  #   params.permit(:playlist_id, :sound_post_id)
  # end
end
