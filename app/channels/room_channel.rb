class RoomChannel < ApplicationCable::Channel
  def subscribed
    stream_from "room_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data)
    Messae.create!(
      content: data['message'],
      user_id: current_user.id,
      room_id: data['room_id']
    )
    # ActionCable.server.broadcast 'room_channel', message: data['message']
  end
end
