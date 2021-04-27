import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
  Button, Checkbox,
  List, ListItem, ListItemIcon, ListItemText,
  FormControl, FormGroup, FormControlLabel,
} from '@material-ui/core'

function AddPlaylist(props) {

  const { sound_post, playlists, checks } = props
  const [ checkList, setCheckList ] = useState(checks)

  // チェックボックスをクリックしたとき、
  // チェックを付ける＝該当のcheckListが false から true -> postリクエスト（create）
  // チェックをはずす＝該当のcheckListが true から false -> deleteリクエスト（destroy）
  const handleReplaceCheckbox = (playlistId) => () => {

    console.log(playlistId)

    // checkListを更新するための新しい配列を作成
    const newCheckList = new Set(checkList)

    if (newCheckList.has(playlistId)) {
      // TODO playlistから削除するAPI叩く
      newCheckList.delete(playlistId)
    } else {
      // TODO playlistに追加するAPI叩く
      newCheckList.add(playlistId)
    }

    setCheckList([...newCheckList])
  }

  return (
    <List>
      {playlists.map((playlist) => {
        return (
          <ListItem key={playlist.id} role={undefined} dense button onClick={handleReplaceCheckbox(playlist.id)}>
            <ListItemIcon>
              <Checkbox key={playlist.id}
                // TODO: チェックボックスの初期状態が反映されない
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



//* ---------------------------------------------------------------- *//
// function AddPlaylist(props) {

//   const { sound_post, playlists, checks } = props
//   // const [ playlists, setPlaylists] = useState([])
//   const [ checkList, setCheckList ] = useState(checks)

//   console.log(checkList)

//   // const initializeClickList = (initClickList) => () => {
//   //   setCheckList([...initClickList])
//   // }


//   // チェックボックスをクリックしたとき、
//   // チェックを付ける＝該当のcheckListが false から true -> postリクエスト（create）
//   // チェックをはずす＝該当のcheckListが true から false -> deleteリクエスト（destroy）
//   const handleReplaceCheckbox = (playlistId) => () => {

//     console.log(playlistId)

//     const checkedSet = new Set(checkList)

//     if (checkedSet.has(playlistId)) {
//       // TODO playlistから削除するAPI叩く
//       checkedSet.delete(playlistId)
//     } else {
//       // TODO playlistに追加するAPI叩く
//       checkedSet.add(playlistId)
//     }

//     setCheckList([...checkedSet])
//   }

//   return (
//     <List>
//       {playlists.map((playlist) => {
//         return (
//           <ListItem key={playlist.id} role={undefined} dense button onClick={handleReplaceCheckbox(playlist.id)}>
//             <ListItemIcon>
//               <Checkbox key={playlist.id}
//                 // TODO: チェックボックスの初期状態が反映されない
//                 // checked={checkList.indexOf(playlist.id) !== -1}
//                 checked={typeof checkList.indexOf(playlist.id) === 'undefined' ? (
//                   checks.indexOf(playlist.id) !== -1
//                 ) : (
//                   checkList.indexOf(playlist.id) !== -1
//                 )}
//                 // checked={typeof checkList[playlist.id] === 'undefined' ? (
//                 //   checks[playlist.id]
//                 // ) : (
//                 //   checkList[playlist.id]
//                 // )}
//                 color="primary"
//                 tabIndex={-1}
//                 disableRipple
//               />
//             </ListItemIcon>

//             <ListItemText primary={playlist.title} />

//           </ListItem>
//         )
//       })}
//     </List>
//   )
// }

// export default AddPlaylist
