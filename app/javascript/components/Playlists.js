import React from "react"
import {
  Button,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@material-ui/core'

import axios from "axios"
import AddPlaylist from './AddPlaylist'

const api = axios.create()

class Playlists extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sound_post: this.props.sound_post,
      playlists: [],
      checks: [],
      // current_user: "",
      open: false
    }

    this.handleClose = this.handleClose.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.getPlaylists = this.getPlaylists.bind(this);

    // this.AddPlaylistRef = React.createRef();
  }

  handleClose = () => {
    this.setState({ open: !this.state.open });
  }

  handleClickOpen = (sound_post) => {
    this.getPlaylists(sound_post)
    this.setState({ open: !this.state.open });
  }

  // 自分のプレイリストと、選択した投稿を含む中間テーブルのデータを取得
  // また、すでにプレイリストに存在するかどうかのチェック
  getPlaylists = (sound_post) => {
    axios.all([
      api.get('/api/v1/playlists'),
      api.get('/api/v1/sound_post_playlists/check_belongs_to_playlist', {
        params: { sound_post_id: sound_post.id }
      })
    ])
    .then( axios.spread( (res1, res2) => {
      this.setState({
        playlists: res1.data,
        checks: res2.data
      })
      // this.AddPlaylistRef.current.initializeClickList(res2.data)
      // データが取得できているかconsoleに出力
      console.log(this.state.playlists)
      console.log(this.state.checks)
    }))
    .catch(e => {
      console.log(e)
    })
  }

  render() {
    return (
      <>
        <Button
          onClick={() => this.handleClickOpen(this.state.sound_post)}
          color="primary"
        >
          プレイリストに追加
        </Button>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle id="playlist-dialog-title">追加するプレイリスト</DialogTitle>
          {this.state.sound_post.title}

          <AddPlaylist
            // ref={this.AddPlaylistRef}
            sound_post={this.state.sound_post}
            playlists={this.state.playlists}
            checks={this.state.checks}
          />
        </Dialog>
      </>
    );
  }
}

export default Playlists



// function Playlists(props) {

//   const sound_post = props.sound_post
//   // const sound_post = props.sound_post
//   const [ playlists, setPlaylists ] = useState([])
//   const [ checks, setChecks ] = useState({})
//   const [ open, setOpen ] = useState(false)

//   useEffect((props) => {
//     console.log(props)
//     axios.all([
//       api.get('/api/v1/playlists'),
//       api.get('/api/v1/sound_post_playlists/check_belongs_to_playlist', {
//         params: { sound_post_id: sound_post.id }
//       })
//     ])
//     .then( axios.spread( (res1, res2) => {
//       setPlaylists({ playlists: res1.data }),
//       setChecks({ checks: res2.data })

//       // データが取得できているかconsoleに出力
//       console.log(playlists)
//       console.log(checks)
//     }))
//     .catch(e => {
//       console.log(e)
//     })
//   }, [])

//   const handleClose = () => {
//     setOpen({ open: !open });
//   }

//   const handleClickOpen = () => {
//     setOpen({
//       open: !open
//     });
//     // getPlaylists(sound_post)
//   }

//   return (
//     <>
//       <Button
//         onClick={() => handleClickOpen()}
//         color="primary"
//       >
//         プレイリストに追加
//       </Button>

//       <Dialog
//         open={open}
//         onClose={handleClose}
//       >
//         <DialogTitle id="playlist-dialog-title">追加するプレイリスト</DialogTitle>
//         {sound_post.title}

//         {/* プレイリスト一覧を表示 */}
//         <AddPlaylist
//           sound_post={sound_post}
//           playlists={playlists}
//           checks={checks}
//         />
//       </Dialog>

//     </>
//   );

// }

// export default Playlists
