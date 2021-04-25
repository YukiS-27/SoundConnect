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
      playlists: [],
      sound_post_playlists: [],
      current_user: "",
      open: false
    }

    this.handleClose = this.handleClose.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.getPlaylists = this.getPlaylists.bind(this);
  }

  handleClose = () => {
    this.setState({ open: !this.state.open });
  }

  handleClickOpen = (data) => {
    this.setState({ open: !this.state.open });
    this.getPlaylists(data)
  }

  getPlaylists = (data) => {
    axios.all([
      api.get('/api/v1/playlists'),
      api.get('/api/v1/sound_post_playlists/index_belongs_to_playlist', {
        params: {
          sound_post_id: data.id
        }
      })
    ])
    .then( axios.spread( (res1, res2) => {
      this.setState({
        playlists: res1.data,
        sound_post_playlists: res2.data
      })
      console.log(this.state.playlists)
      console.log(this.state.sound_post_playlists)
    }))
    .catch(e => {
      console.log(e)
    })
  }

  render() {
    return (
      <>
        <Button color="primary" onClick={() => this.handleClickOpen(this.props.sound_post)}>
          プレイリストに追加
        </Button>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle id="playlist-dialog-title">追加するプレイリスト</DialogTitle>
          {this.props.sound_post.title}

          {/* プレイリスト一覧を表示 */}
          <AddPlaylist
            playlists={this.state.playlists}
            sound_post_playlists={this.state.sound_post_playlists}
            sound_post={this.props.sound_post}
          />

        </Dialog>

      </>
    );
  }
}

export default Playlists
