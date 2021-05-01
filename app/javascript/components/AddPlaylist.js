import React, { useState } from 'react'
import {
  Button, List, ListItem, TextField
} from '@material-ui/core'
import AddRoundedIcon from '@material-ui/icons/AddRounded'

export default function AddPlaylist() {

  const [ createNewPlaylist, setCreateNewPlaylist ] = useState(true)

  const handleClickOpen = () => {
    setCreateNewPlaylist(!createNewPlaylist)
  }

  return (
    <div>
      {createNewPlaylist
        ? <ListItem>
            <Button color="primary" onClick={() => handleClickOpen()}>
              <AddRoundedIcon/> 新しいプレイリストを作成
            </Button>
          </ListItem>
        : <div>
            <ListItem style={{textAlign: 'center'}}>
              <TextField
                required
                id="standard-required"
                label="タイトル"
                placeholder="新規プレイリスト"
                style={{width: '86%'}}
                />
            </ListItem>
            <ListItem style={{
              display: 'flex',
              justifyContent: 'flex-end'
            }}>
              <Button color="primary">
                Primary
              </Button>
            </ListItem>
          </div>
      }
    </div>
  )
}

// export default AddPlaylist
