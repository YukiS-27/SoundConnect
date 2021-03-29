class SoundPostsController < ApplicationController

  def index
    @sound_posts = SoundPost.all
  end

  def show
    @sound_post = SoundPost.find(params[:id])
  end

  def new
    @sound_post = SoundPost.new
    @instruments = Instrument.all
  end

  def create
    sound_post = SoundPost.new(sound_post_params)
    sound_post.user_id = current_user.id

    # 仮データ挿入
    # @sound_post.instrument_id = Instrument.find(1)
    sound_post.sound_source_path = "sample.mp3"

    if sound_post.save
      redirect_to root_path
    else
      render :new
    end
  end

  def edit
    @sound_post = SoundPost.find(params[:id])

    # 自分以外の編集画面へのアクセス制限
    if current_user.id != @sound_post.user_id
      flash[:danger] = "アクセスできません。"
      redirect_back(fallback_location: root_path)
    end
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

  private

  def sound_post_params
    params.require(:sound_post).permit(
      :title, :description, :sound_source, :instrument_id
    )
  end

end
