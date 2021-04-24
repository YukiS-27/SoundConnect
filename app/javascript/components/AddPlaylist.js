import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core'
import axios from 'axios'


function AddPlaylist() {



  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle id="playlist-dialog-title">追加するプレイリスト</DialogTitle>

    </Dialog>
  )
}

export default AddPlaylist
