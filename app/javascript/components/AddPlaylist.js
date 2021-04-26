import React, { useState } from 'react'
import styled from 'styled-components'
import {
  Button, Checkbox,
  List, ListItem, ListItemIcon, ListItemText,
  FormControl, FormGroup, FormControlLabel,
} from '@material-ui/core'
import axios from 'axios'
import { SettingsInputAntennaTwoTone } from '@material-ui/icons'

function AddPlaylist(props) {

  const { sound_post, playlists, sound_post_playlists, checks } = props

  const initialState = checks

  //const initialState = {
  //  checks.map(playlist => (
//
  //  ))
  //}

  const [ checkList, setCheckList ] = useState(initialState)

  const handleReplaceCheckbox = (event) => {



    console.log({...checkList})
    console.log(checkList[event.target.name])
    // const newCheckList = [ ...checkList ]
    // newCheckList[event.target.name] = !checkList[event.target.name]
    setCheckList({ ...checkList, [event.target.name]: event.target.checked })

    // console.log(checks[event.target.name])
  }

  const getTest = (val) => {
    console.log(checks)
    console.log(checkList)  // こいつが空の配列になる
    console.log(playlists[0].title)
    console.log(val[0].title)
    console.log(val.target.name)  // undefined
    console.log(val.target.value) // undefined

  }

  return (
      <FormGroup>
        {playlists.map((playlist, index) => {
          return (
            <FormControlLabel
              key={playlist.id}
              control={
                <Checkbox
                  checked={checks[playlist.title]}
                  // onClick={() => replaceCheckbox(playlist, index)}
                  onChange={handleReplaceCheckbox}
                  value={playlist.title ? playlist.title : ''}
                  color="primary"
                />
              }
              label={playlist.title}
            />
          )
        })}
        <Button onClick={() => getTest(playlists)} name={"ボタン"}>
          <p>テスト</p>
        </Button>
      </FormGroup>
  )
}

export default AddPlaylist


{/*
{playlists.map((playlist, index) => {
          return (
            <FormControlLabel
              key={playlist.id}
              control={
                <Checkbox
                  checked={checkList[playlist.title]}
                  // onClick={() => replaceCheckbox(playlist, index)}
                  onChange={handleReplaceCheckbox}
                  name={playlist.title}
                  color="primary"
                />
              }
              label={playlist.title}
            />
            )
        })}
*/}


{/*
<List>
        {playlists.map((playlist) => {
          const labelId = `checkbox-list-label-${playlist}`;
          return (
            <ListItem key={playlist.id} button dense onClick={() => handleReplaceCheckbox(playlist)} role={undefined}>
              <ListItemIcon>
                <Checkbox
                  checked={checkList[playlist.title]}
                  inputProps={{ "aria-labelledby": labelId }}
                  name={playlist.title}
                  color="primary"
                  label={playlist.title}
                />
              </ListItemIcon>
              <ListItemText primary={playlist.title} />

            </ListItem>
            )
        })}
      </List>
*/}
