import React, { useState } from 'react'
import styled from 'styled-components'
import {
  Button, Checkbox,
  List, ListItem,
  FormGroup, FormControlLabel,
} from '@material-ui/core'
import axios from 'axios'

function AddPlaylist(props) {

  const { sound_post, playlists, sound_post_playlists, checks } = props

  const [ checkList, setCheckList] = useState(checks)

  const replaceCheckbox = (val, index) => {
    console.log(index)
    console.log(checkList[index])
    const newCheckList = [...checkList]
    newCheckList[index] = !checkList[index]
    setCheckList(newCheckList)

    console.log(val.title)
  }

  return (
    <FormGroup>
      {playlists.map((playlist, index) => {
        return (
          <FormControlLabel
            key={playlist.id}
            control={
              <Checkbox
                checked={checkList[index]}
                onClick={() => replaceCheckbox(playlist, index)}
                name={playlist.title}
                color="primary"
              />}
            label={playlist.title}
          />
        )
      })}
    </FormGroup>
  )
}

export default AddPlaylist
