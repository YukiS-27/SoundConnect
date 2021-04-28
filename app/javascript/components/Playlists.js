import React from "react"
import {
  Button,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';

import axios from "axios"
import AddPlaylist from './AddPlaylist'

const api = axios.create()

class Playlists extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sound_post: this.props.sound_post,
      playlists: [],
      sound_post_playlists: [],
      checks: [],
      open: false
    }

    this.handleClose = this.handleClose.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
  }

  handleClose = () => {
    this.setState({ open: !this.state.open });
  }

  // 自分のプレイリストと、選択した投稿を含む中間テーブルのidを取得
  // また、すでにプレイリストに存在するかどうかのチェックリストも取得
  handleClickOpen = (sound_post) => {
    axios.all([
      api.get('/api/v1/playlists'),
      api.get('/api/v1/sound_post_playlists/index_has_playlist_ids', {
        params: { sound_post_id: sound_post.id }
      }),
      api.get('/api/v1/sound_post_playlists/check_contained_in_playlist', {
        params: { sound_post_id: sound_post.id }
      })
    ])
    .then( axios.spread( (res1, res2, res3) => {
      // stateの更新。このタイミングで子コンポーネントもレンダリングされる。
      this.setState({
        playlists: res1.data,
        sound_post_playlists: res2.data,
        checks: res3.data,
        open: !this.state.open
      })
      // データが取得できているかconsoleに出力
      console.log(this.state.playlists)
      console.log(this.state.sound_post_playlists)
      console.log(this.state.checks)
    }))
    .catch(e => {
      console.log(e)
    })
  }

  render() {
    return (
      <>
        <Button
          // onClick={() => this.handleClickOpen(this.state.sound_post)}
          onClick={() => this.handleClickOpen(this.state.sound_post)}
          color="primary"
        >
          プレイリストに追加
        </Button>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogActions>
            <DialogTitle id="playlist-dialog-title">追加するプレイリスト</DialogTitle>

            <Button onClick={this.handleClose} color="primary"><CloseIcon /></Button>
          </DialogActions>

          <AddPlaylist
            sound_post={this.state.sound_post}
            playlists={this.state.playlists}
            sound_post_playlists={this.state.sound_post_playlists}
            checks={this.state.checks}
          />
        </Dialog>
      </>
    );
  }
}

export default Playlists
