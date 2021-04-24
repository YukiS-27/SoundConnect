import React, { useState, useEffect} from "react"
import { Switch, Route, Link } from 'react-router-dom'
import {
  Button, Checkbox,
  List, ListItem,
  FormGroup, FormControlLabel,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@material-ui/core'

import axios from "axios"
import AddPlaylist from './AddPlaylist'

class Playlists extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playlists: [],
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

  handleClickOpen = () => {
    this.setState({ open: !this.state.open });
    this.getPlaylists()
  }

  getPlaylists = () => {
    axios.get('/api/v1/playlists')
    .then(res => {
      this.setState({ playlists: res.data })
      console.log(this.state.playlists)
    })
    .catch(e => {
      console.log(e)
    })
  }

  render() {
    return (
      <>
        <Button color="primary" onClick={this.handleClickOpen}>
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
            sound_post={this.props.sound_post}
          />

        </Dialog>

      </>
    );
  }
}

export default Playlists
