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
      // sound_post_playlists: [],
      checks: {},
      // current_user: "",
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
    this.setState({
      open: !this.state.open
    });
    this.getPlaylists(sound_post)
  }

  // 自分のプレイリストと、選択した投稿を含む中間テーブルのデータを取得
  // また、すでにプレイリストに存在するかどうかのチェック
  getPlaylists = (sound_post) => {
    axios.all([
      api.get('/api/v1/playlists'),
      api.get('/api/v1/sound_post_playlists/index_belongs_to_playlist', {
        params: { sound_post_id: sound_post.id }
      }),
      api.get('/api/v1/sound_post_playlists/check_belongs_to_playlist', {
        params: { sound_post_id: sound_post.id }
      })
    ])
    .then( axios.spread( (res1, res2, res3) => {
      this.setState({
        playlists: res1.data,
        sound_post_playlists: res2.data,
        checks: res3.data
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
          onClick={() => this.handleClickOpen(this.props.sound_post)}
          color="primary"
        >
          プレイリストに追加
        </Button>
        {this.props.sound_post.title}
        {this.state.sound_post.title}

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle id="playlist-dialog-title">追加するプレイリスト</DialogTitle>
          {this.props.sound_post.title}

          {/* プレイリスト一覧を表示 */}
          <AddPlaylist
            sound_post={this.state.sound_post}
            playlists={this.state.playlists}
            // sound_post_playlists={this.state.sound_post_playlists}
            checks={this.state.checks}
          />

        </Dialog>

      </>
    );
  }
}

export default Playlists
