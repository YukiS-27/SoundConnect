import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
  Button, Checkbox,
  List, ListItem,
  FormGroup, FormControlLabel,
} from '@material-ui/core'
import axios from 'axios'


function AddPlaylist(props) {

  const { sound_post, playlists, sound_post_playlists, checks } = props

  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <FormGroup>
      {playlists.map((playlist, key) => {
        return (
          <FormControlLabel
            key={key}
            control={<Checkbox checked={true} onChange={handleChange} name={playlist.title} color="primary"/>}
            label={playlist.title}
          />
        )
      })}
    </FormGroup>
  )
}

export default AddPlaylist
