import React, { useState, useEffect} from "react"
import { Switch, Route, Link } from 'react-router-dom'
import { Button } from '@material-ui/core'

import AddPlaylist from './AddPlaylist'

const open = false;

class Playlists extends React.Component {
  constructor() {
    super()
    this.state = {
      open: false
    }
  }

  handleClick = () => {
    this.setState({ open: !this.state.open });
  }

  render() {
    return (
      <>
        <Button color="primary" onClick={this.handleClick}>
          プレイリスト
        </Button>
        {this.props.sound_post.title}

        <AddPlaylist
          open={this.state.open}
          onClose={this.handleClick}
          sound_post={this.props.sound_post}
          />
      </>
    );
  }
}

export default Playlists
