import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
  Button, Checkbox,
  List, ListItem,
  FormGroup, FormControlLabel,
} from '@material-ui/core'
import axios from 'axios'


function AddPlaylist(props) {

  // const [playlists, setPlaylists] = useState([])
  const [check, setCheck] = useState()
  const { playlists, sound_post } = props

  return (
    <List>
      {playlists.map(playlist => (
        <ListItem key={playlist.id}>
          <p>{playlist.title}</p>
        </ListItem>
      ))}
    </List>
  )
}

export default AddPlaylist
