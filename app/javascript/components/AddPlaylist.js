import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
  Button, Checkbox,
  List, ListItem, ListItemIcon, ListItemText,
  FormControl, FormGroup, FormControlLabel,
} from '@material-ui/core'

import axios from 'axios'
const api = axios.create()

function AddPlaylist(props) {

  // const { sound_post, playlists, sound_post_playlists, checks } = props
  const { sound_post, playlists, checks } = props
  // const [ playlists, setPlaylists] = useState([])
  const [ checkList, setCheckList ] = useState({})

  // 自分のプレイリストと、選択した投稿を含む中間テーブルのデータを取得
  // また、すでにプレイリストに存在するかどうかのチェック
  // const getPlaylists = (sound_post) => {
  //   axios.all([
  //     api.get('/api/v1/playlists'),
  //     // api.get('/api/v1/sound_post_playlists/check_belongs_to_playlist', {
  //     //   params: { sound_post_id: sound_post.id }
  //     // })
  //   ])
  //   .then( axios.spread( (res1) => {
  //     setPlaylists({ playlists: res1.data })
  //     // setCheckList({ checks: res2.data })

  //     // データが取得できているかconsoleに出力
  //     console.log(playlists)
  //     // console.log(checkList)
  //   }))
  //   .catch(e => {
  //     console.log(e)
  //   })
  // }

  useEffect((props) => {
    console.log(checks)
  //   axios.all([
  //     // api.get('/api/v1/playlists'),
  //     api.get('/api/v1/sound_post_playlists/check_belongs_to_playlist', {
  //       params: { sound_post_id: sound_post.id }
  //     })
  //   ])
  //   .then( axios.spread( (res2) => {
  //     // setPlaylists({ playlists: res1.data })
  //     setCheckList({ checks: res2.data })

  //     // データが取得できているかconsoleに出力
  //     // console.log(playlists)
  //     console.log(checkList)
  //   }))
  //   .catch(e => {
  //     console.log(e)
  //   })

  //   console.log('propsデータ確認')

  //   // getPlaylists(sound_post)
  //   console.log(sound_post)
  //   // console.log(props.playlists)

  //   console.log('チェックリスト更新！')
  //   // console.log(checkList)
  }, [])

  // チェックボックスをクリックしたとき、
  // チェックを付ける＝該当のcheckListが false から true -> postリクエスト（create）
  // チェックをはずす＝該当のcheckListが true から false -> deleteリクエスト（destroy）
  const handleReplaceCheckbox = (event) => {

    //var data
//
    //if () {
//
    //  axios.post('/api/v1/sound_post_playlists', data)
    //  .then(res => {
//
    //  })
    //  .catch(e => {
    //    console.log(e)
    //  })
    //} else {
    //  axios.delete('/api/v1/sound_post_playlists', data)
    //  .then(res => {
//
    //  })
    //  .catch(e => {
    //    console.log(e)
    //  })
    //}
    // console.log(checkList.indexOf(playlist.id))
    // console.log(event.target.name) // undefined
    console.log(event)

//
    //console.log({...checkList}) // {} 空のオブジェクトが返る
    //console.log(checks) // {} 空のオブジェクトが返る
    //console.log(event.target.checked) // undefined
    // const newCheckList = [ ...checkList ]
    // newCheckList[event.target.name] = !checkList[event.target.name]
    // setCheckList({ ...checkList, [event.target.name]: event.target.checked })

    // console.log(checks[event.target.name])
  }

  const getTest = (sound_post, playlists) => {
    axios.get('/api/v1/sound_post_playlists/check_belongs_to_playlist', {
      params: { sound_post_id: sound_post.id }
    })
    .then(res => {
      console.log(res.data)
      setCheckList(res.data)
    })
    .catch(e => {
      console.log(e)
    })

  //   console.log(val.target.name)  // undefined
  //   console.log(val.target.value) // undefined
  }

  return (
      <List>
        {playlists.map((playlist, index) => {
          return (
            <ListItem key={playlist.id}>
              <ListItemIcon>
                <Checkbox key={playlist.id}
                  // checked={checkList indexOf(playlist.id)}
                  // checked={true}
                  checked={checks[playlist.id]}
                  // onClick={() => replaceCheckbox(playlist, index)}
                  onChange={handleReplaceCheckbox}
                  name={playlist.title}
                  value={playlist.title ? playlist.title : ''}
                  color="primary"
                />
              </ListItemIcon>

              <ListItemText primary={playlist.title} />

            </ListItem>
          )
        })}
        <Button onClick={() => getTest(sound_post, playlists)} name={"ボタン"}>
          <p>テスト</p>
        </Button>
      </List>
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
