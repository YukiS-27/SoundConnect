class SoundPostsController < ApplicationController

  def new
    @sound_post = SoundPost.new
  end

  def index
    @sound_posts = SoundPost.all
  end
end
