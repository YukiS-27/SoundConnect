import consumer from "./consumer"

document.addEventListener('turbolinks:load', () => {

  window.messageContainer = document.getElementById('message-container');

  // 以下のプログラムが他のページで動作しないようにしておく
  if (messageContainer === null) {
    return
  }

  const appRoom = consumer.subscriptions.create("RoomChannel", {
    connected() {
      // Called when the subscription is ready for use on the server
    },

    disconnected() {
      // Called when the subscription has been terminated by the server
    },

    received(data) {
      messageContainer.insertAdjacentHTML('beforeend', data['message']);
      scrollToBottom();
      button_activation();
    },

    speak: function(message, room_id) {
      return this.perform('speak', {message: message, room_id: room_id});
    }
  });

  // チャットルームかどうかを判定
  if(/rooms/.test(location.pathname)) {

    const documentElement = document.documentElement;
    const messageButton = document.getElementById('message_button');
    const messageContent = document.getElementById('message_content');
    const room_id = messageContent.dataset.room_id;

    // Control (Command) + Enter を押したときに発火
    $(document).on('keydown', '#message_content', (e) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'Enter') {
          appRoom.speak(messageContent.value, room_id); // speakアクションを実行
          messageContent.value = '';
          e.preventDefault();
        }
      }
    });

    // 送信ボタンが押されたときに発火
    $(document).on('click', '#message_button', (e) => {
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

    window.button_activation = () => {
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

    let oldestMessageId
    // メッセージの追加読み込みの可否を決定する変数
    window.showAdditionally = true

    window.addEventListener('scroll', () => {
        if (documentElement.scrollTop === 0 && showAdditionally) {
            showAdditionally = false
            // 表示済みのメッセージの内，最も古いidを取得
            oldestMessageId = document.getElementsByClassName('message')[0].id.replace(/[^0-9]/g, '')
            // Ajax を利用してメッセージの追加読み込みリクエストを送る。最も古いメッセージidも送信しておく。
            $.ajax({
                type: 'GET',
                url: '/show_additionally',
                cache: false,
                data: {oldest_message_id: oldestMessageId, remote: true}
            })
        }
    }, {passive: true});

  }
});
