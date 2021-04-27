import React from "react"
import {
  Button,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@material-ui/core'

import axios from "axios"
import AddPlaylist from './AddPlaylist'

const api = axios.create()

class Playlists extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sound_post: this.props.sound_post,
      playlists: [],
      checks: [],
      open: false
    }

    this.handleClose = this.handleClose.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.getPlaylists = this.getPlaylists.bind(this);
  }

  handleClose = () => {
    this.setState({ open: !this.state.open });
  }

  handleClickOpen = (sound_post) => {
    this.getPlaylists(sound_post)
  }

  // 自分のプレイリストと、選択した投稿を含む中間テーブルのデータを取得
  // また、すでにプレイリストに存在するかどうかのチェック
  getPlaylists = (sound_post) => {
    axios.all([
      api.get('/api/v1/playlists'),
      api.get('/api/v1/sound_post_playlists/check_belongs_to_playlist', {
        params: { sound_post_id: sound_post.id }
      })
    ])
    .then( axios.spread( (res1, res2) => {
      this.setState({
        playlists: res1.data,
        checks: res2.data,
        open: !this.state.open
      })
      // データが取得できているかconsoleに出力
      console.log(this.state.playlists)
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
          onClick={() => this.handleClickOpen(this.state.sound_post)}
          color="primary"
        >
          プレイリストに追加
        </Button>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle id="playlist-dialog-title">追加するプレイリスト</DialogTitle>
          {this.state.sound_post.title}

          <AddPlaylist
            sound_post={this.state.sound_post}
            playlists={this.state.playlists}
            checks={this.state.checks}
          />
        </Dialog>
      </>
    );
  }
}

export default Playlists
