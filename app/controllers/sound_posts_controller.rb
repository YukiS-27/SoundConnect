class SoundPostsController < ApplicationController

  def new
    @sound_post = SoundPost.new
  end

  def create
    @sound_post = SoundPost.new(sound_post_params)
    @sound_post.user_id = current_user.id
    
    # 仮
    @sound_post.instrument_id = 1
    @sound_post.sound_source_path = "sample.mp3"

    if @sound_post.save
      redirect_to sound_posts_path
    else
      render :new
    end


  end

  def index
    @sound_posts = SoundPost.all
  end

  private

  def sound_post_params
    params.require(:sound_post).permit(:title, :discription, :sound_source)
  end

end
