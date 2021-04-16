class RoomsController < ApplicationController
  before_action :authenticate_user!

  def create
    current_user_rooms = RoomUser.where(user_id: current_user.id).map(&:room)
    room = RoomUser.where(room: current_user_rooms, user_id: params[:user_id]).map(&:room).first

    if room.blank?
      room = Room.create
      RoomUser.create(room: room, user_id: current_user.id)
      RoomUser.create(room: room, user_id: params[:user_id])
    end
    redirect_to action: :show, id: room.id
  end

  def show
      @room = Room.find(params[:id])
      # @roomにいる自分ではないユーザー（相手）の情報を取得
      @room_user = @room.room_users.where.not(user_id: current_user.id).first.user
      @messages = Message.where(room: @room)
  end
end
