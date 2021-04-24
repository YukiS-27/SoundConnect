import React, { useState, useEffect} from "react"
import { Switch, Route, Link } from 'react-router-dom'
import { Button } from '@material-ui/core'

import AddPlaylist from './AddPlaylist'

export default function Playlists() {
  return (
    <>
      <Button color="primary">
        プレイリスト
      </Button>
      <AddPlaylist/>
    </>
  );
}

// export default Playlists
