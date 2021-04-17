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
    const messageButton = document.getElementById('message_button');
    // const messageContent = document.getElementById('message_content');
    const messageContent = document.getElementById('message_content');

    // 送信ボタンが押されたときに発火
    $(document).on('click', '#message_button', (e) => {
      const room_id = messageContent.dataset.room_id;
      appRoom.speak(messageContent.value, room_id);
      messageContent.value = '';
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

    // フォームに入力した際の動作
    messageContent.addEventListener('input', () => {
        button_activation()
        changeLineCheck()
    });

    // 送信ボタンが押された時にボタンを無効化
    messageButton.addEventListener('click', () => {
        messageButton.classList.add('disabled')
        changeLineCount(3)
    });

    // 入力フォームの最大行数
    const maxLineCount = 8

    // 入力フォームの行数を調べる関数
    const getLineCount = () => {
      return (messageContent.value + '\n').match(/\r?\n/g).length;
    }

    let lineCount = getLineCount()
    let newLineCount

    const changeLineCheck = () => {
      // 現在の入力行数を取得（最大の行数は maxLineCount）
      newLineCount = Math.min(getLineCount(), maxLineCount)
      // 以前の入力行数と異なる場合、かつ入力欄が3行より大きくなる場合は変更する
      if (newLineCount >= 3 && lineCount !== newLineCount) {
        changeLineCount(newLineCount)
      }
    }

    const messageFooter = document.getElementById('message-footer')
    let messageFooterHeight = messageFooter.scrollHeight
    let newMessageFooterHeight, messageFooterHeightDiff

    const changeLineCount = (newLineCount) => {
      // フォームの行数を変更
      messageContent.rows = lineCount = newLineCount
      // 新しいメッセージフッターの高さを取得し、違いを計算
      newMessageFooterHeight = messageFooter.scrollHeight
      messageFooterHeightDiff = newMessageFooterHeight - messageFooterHeight

      // 新しいメッセージフッターの高さをチャット欄の padding-bottom に反映し、スクロール
      if (messageFooterHeightDiff > 0) {
        messageContainer.style.paddingBottom = newMessageFooterHeight + 'px'
        window.scrollBy(0, messageFooterHeightDiff)
      } else {
        window.scrollBy(0, messageFooterHeightDiff)
        messageContainer.style.paddingBottom = newMessageFooterHeight + 'px'
      }
      messageFooterHeight = newMessageFooterHeight
    }

  }
});
