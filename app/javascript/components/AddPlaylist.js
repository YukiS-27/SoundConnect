import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import {
  Button, Checkbox,
  List, ListItem, ListItemIcon, ListItemText,
  FormControl, FormGroup, FormControlLabel,
} from '@material-ui/core'
import axios from 'axios'
import { PlaylistPlay } from '@material-ui/icons'

toast.configure()

function AddPlaylist(props) {

  const { sound_post, playlists, checks } = props
  const [ checkList, setCheckList ] = useState(checks)

  // チェックボックスをクリックしたとき、
  // チェックを付ける＝該当のcheckListが false から true -> postリクエスト（create）
  // チェックをはずす＝該当のcheckListが true から false -> deleteリクエスト（destroy）
  const handleReplaceCheckbox = (playlist) => () => {

    console.log(playlist)

    // checkListを更新するための新しい配列を作成
    const newCheckList = new Set(checkList)
    const sendParams = {
            sound_post_id: sound_post.id,
            playlist_id: playlist.id
          }

      if (newCheckList.has(playlist.id)) {
        // playlistから削除するAPI叩く
        axios.post('/api/v1/sound_post_playlists/delete', sendParams)
        .then(res => {
          removeCheckNotify(playlist.title)
          console.log('deleted!!')
        })
        .catch(e => {
          console.log(e)
        })
        // チェックを削除
        newCheckList.delete(playlist.id)

      } else {
        // playlistに追加するAPI叩く
        axios.post('/api/v1/sound_post_playlists', sendParams)
        .then(res => {
          addCheckNotify(playlist.title)
        })
        .catch(e => {
          console.log(e)
        })
        // チェックを追加
        newCheckList.add(playlist.id)
      }
      setCheckList([...newCheckList])
    }

  const addCheckNotify = (playlistTitle) => {
    toast.success(`${playlistTitle}に追加しました`, {
      position: 'bottom-center',
      hideProgressBar: true
    })
  }

  const removeCheckNotify = (playlistTitle) => {
    toast.error(`${playlistTitle}から削除しました`, {
      position: 'bottom-center',
      hideProgressBar: true
    })
  }

  return (
    <List>
      {playlists.map((playlist) => {
        return (
          <ListItem key={playlist.id} role={undefined} dense button onClick={handleReplaceCheckbox(playlist)}>
            <ListItemIcon>
              <Checkbox
                checked={checkList.indexOf(playlist.id) !== -1}
                color="primary"
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>

            <ListItemText primary={playlist.title} />

          </ListItem>
        )
      })}
    </List>
  )
}

export default AddPlaylist
