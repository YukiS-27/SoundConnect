class SoundPostsController < ApplicationController
  before_action :authenticate_user!, only: %i[new edit]
  before_action :posted_user?, only: %i[edit]
  before_action :set_instruments, only: %i[new edit]

  def index
    @sound_posts = SoundPost.all
  end

  def show
    @sound_post = SoundPost.find(params[:id])
  end

  def new
    @sound_post = SoundPost.new
  end

  def create
    sound_post = SoundPost.new(sound_post_params)
    sound_post.user_id = current_user.id

    if sound_post.save
      flash[:success] = "アップロードしました"
      redirect_to root_path
    else
      flash[:danger] = "アップロードに失敗しました"
      redirect_to new_sound_post_path
    end
  end

  def edit
    @instruments = Instrument.all
  end

  def update
    sound_post = SoundPost.find(params[:id])
    sound_post.assign_attributes(sound_post_params)

    if sound_post.save
      flash[:success] = "変更を保存しました"
      redirect_to sound_post_path, id: sound_post.id
    else
      render :edit
    end
  end

  def destroy
    @sound_post.destroy if @sound_post.present?

    if @sound_post.destroyed?
      flash[:success] = "投稿を削除しました"
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def sound_post_params
    params.require(:sound_post).permit(
      :title, :description, :sound_source, :instrument_id
    )
  end

  def set_instruments
    @instruments = Instrument.all
  end

  def posted_user?
    @sound_post = SoundPost.find(params[:id])

    # 自分以外の編集画面へのアクセス制限
    if current_user.id != @sound_post.user_id
      flash[:danger] = "アクセスできません。"
      redirect_back(fallback_location: root_path)
    end
  end

end
