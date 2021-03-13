class SoundPostsController < ApplicationController

  def new
    @sound_post = SoundPost.new
  end

  def index
    @sound_posts = SoundPost.all
  end

  private

  def sound_post_params
    params.require(:sound_post).permit(:title, :discription, :sound_source)
  end

end
