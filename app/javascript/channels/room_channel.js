import consumer from "./consumer"

document.addEventListener('turbolinks:load', () => {

  const messageContainer = document.getElementById('message-container');

  const appRoom = consumer.subscriptions.create("RoomChannel", {
    connected() {
      // Called when the subscription is ready for use on the server
    },

    disconnected() {
      // Called when the subscription has been terminated by the server
    },

    received(data) {
      messageContainer.insertAdjacentHTML('beforeend', data['message']);
      scrollToBottom()
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

    const documentElement = document.documentElement;
    const messageButton = $('#message_button');
    const messageContent = $('#message_content');

    // 送信ボタンが押されたときに発火
    $(document).on('click', '#message_button', (e) => {
      const room_id = messageContent.data('room_id');
      appRoom.speak(messageContent.val(), room_id);
      messageContent.val('');
      e.preventDefault();
    });

    // 一番下まで移動する関数
    window.scrollToBottom = () => {
        window.scroll(0, documentElement.scrollHeight)
    }

    // 最初にページ一番下へ移動させる
    scrollToBottom()

    const button_activation = () => {
      if (messageContent.value === '') {
          messageButton.classList.add('disabled')
      } else {
          messageButton.classList.remove('disabled')
      }
    }

    // フォームに入力した際の動作（エラー）
    messageContent.addEventListener('input', () => {
        button_activation()
    })

    // 送信ボタンが押された時にボタンを無効化
    messageButton.addEventListener('click', () => {
        messageButton.classList.add('disabled')
    })


  }
});
