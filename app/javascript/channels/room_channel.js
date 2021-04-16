import consumer from "./consumer"

const appRoom = consumer.subscriptions.create("RoomChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    return alert(data['message']);
  },

  speak: function(message, room_id) {
    return this.perform('speak', {message: message, room_id: room_id});
  }
});

// チャットルームかどうかを判定
if(/rooms/.test(location.pathname)) {
  $(document).on("keydown", ".room__message-form_textarea", function(e) {
    if (e.key === "Enter") {
      const room_id = $('textarea').data('room_id')
      appRoom.speak(e.target.value, room_id);    // speakアクションを実行
      e.target.value = '';
      e.preventDefault();
    }
  })
}
