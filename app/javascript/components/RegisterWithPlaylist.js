import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import {
  Button, Checkbox,
  Divider,
  List, ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core'

import AddPlaylist from './AddPlaylist'

toast.configure()

export default function RegisterWithPlaylist(props) {

  const { sound_post, playlists, checks } = props
  const [ checkList, setCheckList ] = useState(checks)
  // const [ createNewPlaylist, setCreateNewPlaylist ] = useState(true)

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
          // removeCheckNotify(playlist.title)
          console.log('deleted!!')
        })
        .catch(e => {
          console.log(e)
        })
        // チェックを削除
        newCheckList.delete(playlist.id)
        removeCheckNotify(playlist.title)

      } else {
        // playlistに追加するAPI叩く
        axios.post('/api/v1/sound_post_playlists', sendParams)
        .then(res => {
          // addCheckNotify(playlist.title)
        })
        .catch(e => {
          console.log(e)
        })
        // チェックを追加
        newCheckList.add(playlist.id)
        addCheckNotify(playlist.title)
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

  // const handleClickOpen = () => {
  //   setCreateNewPlaylist(!createNewPlaylist)
  // }

  return (
    <div>
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
      <Divider/>

      <AddPlaylist/>
    </div>

  )
}

// export default RegisterWithPlaylist
