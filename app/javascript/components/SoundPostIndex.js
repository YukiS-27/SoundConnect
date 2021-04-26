import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
const api = axios.create()

import SideSection from './SideSection'
import Playlists from './Playlists'

const TopPageWrapper = styled.div`
  background-color: #f2f2f2;
  display: flex;
  height: 100%;
`

const MainWrapper = styled.div`
background-color: #fff;
  display: flex;
  height: 100%;
  width: 100%;
`

const FlexWrapper = styled.div`
  flex-basis: 28%;
  margin-right: 80px;
`

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const PostItem = styled.div`
  padding: 10px 10px;
`

function SoundPostIndex() {
  const [ soundPosts, setSoundPosts ] = useState([])
  const [ playlists, setPlaylists ] = useState([])
  const [ onen, setOpen ] = useState(false)

  useEffect(() => {

    axios.get('/api/v1/sound_posts.json')
      // api.get('/api/v1/playlists.json')
    .then( res1 => {
      setSoundPosts(res1.data);
      // setPlaylists(res2.data);

      console.log(soundPosts)
      // console.log(playlists)
    })
    .catch(e => {
      console.log(e);
    })
  }, [])

  return (
    <TopPageWrapper>
      {/* サイドセクション */}
      <FlexWrapper>
        <SideSection />
      </FlexWrapper>

      {/* メインコンテンツ */}
      <MainWrapper>
        <PostList>
          {soundPosts.map(soundPost => (
            <PostItem key={soundPost.id}>
              ▼【ユーザー名】が投稿
              {soundPost.title}<br/>
              <audio src={soundPost.sound_source} controls=""></audio>
            </PostItem>

          ))}
        </PostList>

        <div className="container">
        </div>
      </MainWrapper>
    </TopPageWrapper>
  )
}

export default SoundPostIndex
