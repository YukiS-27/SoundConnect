import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
import Playlists from '../components/Playlists'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <BrowserRouter>
      <Playlists/>
    </BrowserRouter>,
    document.querySelector('#add-playlist'),
  );
});
