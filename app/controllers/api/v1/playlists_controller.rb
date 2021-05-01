class Api::V1::PlaylistsController < ApplicationController
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token

  def index
    playlists = current_user.playlists.order(updated_at: :desc)
    render json: playlists
  end

  def create
    playlist = Playlist.new(playlist_params)
    if playlist.save
      render json: playlist
    else
      render json: playlist.errors, status: 422
    end
  end

  def update
    todo = Todo.find(params[:id])
    if todo.update(todo_params)
      render json: todo
    else
      render json: todo.errors, status: 422
    end
  end

  def destroy
    if Todo.destroy(params[:id])
      head :no_content
    else
      render json: { error: "Failed to destroy" }, status: 422
    end
  end

  private
  def playlist_params
    binding.pry
    params.require(:playlist).permit(:title, :user_id).merge(user_id: current_user.id)
  end
end
