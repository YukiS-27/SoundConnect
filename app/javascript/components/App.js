import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import styled from 'styled-components'

import AddPlaylist from './AddPlaylist'
import SoundPosts from './SoundPosts'
import AddPlaylist from './AddPlaylist'
import CreatePlaylist from './CreatePlaylist'

const Navvar = styled.nav`
  background: #dbfffe;
  min-height: 8vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
`
const Logo = styled.div`
  font-weight: bold;
  font-size: 23px;
  letter-spacing: 3px;
`
const NavItems = styled.ul`
  display: flex;
  width: 400px;
  max-width: 40%;
  justify-content: space-around;
  list-style: none;
`

const NavItem = styled.li`
  font-size: 19px;
  font-weight: bold;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`

const Wrapper = styled.div`
  width: 700px;
  max-width: 85%;
  margin: 20px auto;
`


function App() {
  return (
    <Wrapper>
      <Switch>
        <Route exact path="/sound_posts" component={SoundPosts} />
        <Route exact path="/sound_posts/new" component={AddTodo} />
        <Route path="/sound_posts/:id/edit" component={EditTodo} />
      </Switch>
    </Wrapper>
  )
}

export default App
