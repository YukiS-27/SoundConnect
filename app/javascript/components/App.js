import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import styled from 'styled-components'

import AddSoundPost from './AddSoundPost'
import SoundPostIndex from './SoundPostIndex'
import EditSoundPost from './EditSoundPost'

const Wrapper = styled.div`
  width: 700px;
  max-width: 85%;
  margin: 20px auto;
`

function App() {
  return (
    <Wrapper>
      <Switch>
        <Route exact path="/" component={SoundPostIndex} />
        {/*
          <Route exact path="/sound_posts/new" component={AddSoundPost} />
          <Route path="/sound_posts/:id/edit" component={EditSoundPost} />
        */}
      </Switch>
    </Wrapper>
  )
}

export default App
