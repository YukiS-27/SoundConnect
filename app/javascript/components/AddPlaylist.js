import React, { useState } from 'react'
import {
  Button, List, ListItem, TextField
} from '@material-ui/core'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import axios from 'axios'

export default function AddPlaylist() {

  const [ createPlaylist, setCreatePlaylist ] = useState(true)
  const [ title, setTitle ] = useState('')

  const handleClickOpen = () => {
    setCreatePlaylist(!createPlaylist)
  }

  const handleChange = (event) => {
    setTitle(() => event.target.value)
  }

  const handleCreatePlaylist = () => {
    console.log(title)
    const sendParams = {
      title: title
    }
    axios.post('/api/v1/playlists', sendParams)
    .then(res => {
      console.log(res.data)
      setCreatePlaylist(!createPlaylist)
    })
    .catch(e => {
      console.log(e)
    })
  }

  return (
    <div>
      {createPlaylist
        ? <ListItem>
            <Button color="primary" onClick={() => handleClickOpen()}>
              <AddRoundedIcon/> 新しいプレイリストを作成
            </Button>
          </ListItem>
        : <div>
            <ListItem style={{
              display: 'flex',
              justifyContent: 'center'
            }}>
              <TextField
                required
                id="standard-required"
                label="タイトル"
                placeholder="新規プレイリスト"
                style={{width: '80%'}}
                onChange={(event) => handleChange(event)}
              />
            </ListItem>
            <ListItem style={{
              display: 'flex',
              justifyContent: 'flex-end'
            }}>
              <Button color="primary" onClick={() => handleCreatePlaylist()}>作成する</Button>
            </ListItem>
          </div>
      }
    </div>
  )
}

// export default AddPlaylist
