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

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <FormGroup>
      {playlists.map((playlist, key) => {
        return (
          <FormControlLabel
            key={key}
            control={<Checkbox checked={checks[key]} onChange={handleChange} name={playlist.title} color="primary"/>}
            label={playlist.title}
          />
        )
      })}
    </FormGroup>
  )
}

export default AddPlaylist
