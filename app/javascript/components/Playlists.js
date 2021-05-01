import React from "react"
import axios from "axios"
import {
  Button,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

import RegisterWithPlaylist from './RegisterWithPlaylist'
import { ContactsOutlined } from "@material-ui/icons";

const api = axios.create()

class Playlists extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sound_post: this.props.sound_post,
      playlists: [],
      checks: [],
      isOpen: false,
      createPlaylist: true
    }

    this.handleClose = this.handleClose.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.forceUpdate = this.forceUpdate.bind(this);
  }

  handleClose = () => {
    this.setState({ isOpen: !this.state.isOpen });
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
        isOpen: !this.state.isOpen,
        createPlaylist: true
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

  rerender = () => {
    console.log('called rerender')
    console.log(this.state.createPlaylist)
    this.forceUpdate()
  }

  forceUpdate = () => {
    console.log('called forceUpdate')
    api.get('/api/v1/playlists')
    .then(res => {
      this.setState({
        playlists: res.data,
        createPlaylist: false,
        isOpen: this.state.isOpen
      })
    })
    .catch(e => {
      console.log(e)
    })
    console.log(this.state.createPlaylist)
  }

  render() {
    return (
      <>
        <Button
          // onClick={() => this.handleClickOpen(this.state.sound_post)}
          onClick={() => this.handleClickOpen(this.state.sound_post)}
          color="primary"
        >
          <PlaylistAddIcon/>プレイリストに追加
        </Button>

        <Dialog
          open={this.state.isOpen}
          onClose={this.handleClose}
        >
          <DialogActions>
            <DialogTitle id="playlist-dialog-title">追加するプレイリスト</DialogTitle>

            <Button onClick={this.handleClose} color="primary"><CloseIcon /></Button>
          </DialogActions>

          <RegisterWithPlaylist
            sound_post={this.state.sound_post}
            playlists={this.state.playlists}
            sound_post_playlists={this.state.sound_post_playlists}
            checks={this.state.checks}
            createPlaylist={this.state.createPlaylist}
            rerender={this.rerender}
          />
        </Dialog>
      </>
    );
  }
}

export default Playlists
