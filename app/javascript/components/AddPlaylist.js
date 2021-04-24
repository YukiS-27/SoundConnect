import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
  Button, Checkbox,
  FormGroup, FormControlLabel,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@material-ui/core'
import axios from 'axios'


function AddPlaylist(props) {

  const [playlists, setPlaylists] = useState([])
  const [check, setCheck] = useState()
  const { sound_post, onClose, open } = props

  useEffect(()  => {
    axios.get('/api/v1/playlists')
    .then(res => {
      console.log(res.data);
      setPlaylists(res.data);
    })
    .catch(e => {
      console.log(e)
    })
  }, [])

  const handleChange = (index, val) => {
    var data = {
      id: val.id,
      name: val.name,
      is_checked: !val.is_checked
    }
  }

  const handleClose = () => {
    onClose()
  }

  const updateIsChecked = () => {

  }


  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle id="playlist-dialog-title">追加するプレイリスト</DialogTitle>

      <FormGroup>
        {playlists.map((playlist, key) => {
          <FormControlLabel
            control={
              <Checkbox
                onClick={() => updateIsChecked(key, playlist)}
              />
            }
          />
        })}
      </FormGroup>

    </Dialog>
  )
}

export default AddPlaylist
