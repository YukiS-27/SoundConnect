import consumer from "./consumer"

const appRoom = consumer.subscriptions.create("RoomChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    const Messages = document.getElementById('messages');
    Messages.insertAdjacentHTML('beforeend', data['message']);
    console.log('message_test')
  },

  speak: function(message, room_id) {
    return this.perform('speak', {message: message, room_id: room_id});
  }
});

// チャットルームかどうかを判定
if(/rooms/.test(location.pathname)) {
  // エンターキーを押したときに発火
  // $(document).on('keydown', '.room__message-form_textarea', (e) => {
  //   if (e.key === 'Enter') {
  //     const room_id = $('textarea').data('room_id');
  //     appRoom.speak(e.target.value, room_id);    // speakアクションを実行
  //     e.target.value = '';
  //     e.preventDefault();
  //   }
  // });

  // 送信ボタンが押されたときに発火
  $(document).on('click', '#message-button', (e) => {
    const room_id = $('#message-input').data('room_id');
    appRoom.speak($('#message-input').val(), room_id);
    $('#message-input').val('');
    e.preventDefault()
  });
}
