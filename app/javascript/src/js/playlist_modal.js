// $(function() {
//   var modalMask = document.getElementById('modal-mask');
//   var playlistModal = document.getElementById('add-in-playlist__modal');
//   var addPlaylist = document.getElementById('add-playlist');
//
//   addPlaylist.addEventListener('click', () => {
//     // hiddenクラスを消してモーダルウィンドウとマスクを表示
//     playlistModal.classList.remove('hidden');
//     modalMask.classList.remove('hidden');
//     console.log('test');
//     // モーダルウィンドウの中身を置き換え
//     playlistModal.innerHTML = "<%= escape_javascript(render partial: 'sound_post_playlists/new', locals: { sound_post: @sound_post, playlists: @playlists }) %>";
//   });
//
//   // モーダルの外側（マスク）をクリックしたらモーダルとマスクを再び非表示
//   modalMask.addEventListener('click', () => {
//     playlistModal.classList.add('hidden');
//     modalMask.classList.add('hidden');
//   });
//
// });
