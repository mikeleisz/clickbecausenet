import React, { useState } from 'react'
import styled from 'styled-components'
import { About } from './About'

import { VideoReel } from './VideoReel'
import { Video } from './Video'

import { Folder } from './Folder'
import { Trashcan } from './TrashCan'
import { Lena } from './Lena'
import './App.css'
import { motion as m } from 'framer-motion'

const App = () => {
  const [aboutClosed, setAboutClosed] = useState(false)

  const [videoReelClosed, setVideoReelClosed] = useState(false)
  const [videoClosed, setVideoClosed] = useState(false)

  const [lenaClosed, setLenaClosed] = useState(false)


  return (
    <Page>
      <h1>clickbecause.net</h1>
      <TrashCanContainer drag dragMomentum={false}>
        <Trashcan />
        <p>important files</p>
      </TrashCanContainer>
      <FolderContainer>
        <Folder name={'about'} onClick={() => setAboutClosed(false)} />

        <Folder name={'audioreact.mov'} onClick={() => setVideoClosed(false)} />
        <Folder name={'inefcoupe.mov'} onClick={() => setVideoClosed(false)} />

        <Folder name={'lena.jpg'} onClick={() => setLenaClosed(false)} />
      </FolderContainer>


      <About close={aboutClosed} setClose={setAboutClosed}/>

      <VideoReel close={videoReelClosed} setClose={setVideoReelClosed} />
      <Video close={videoClosed} setClose={setVideoClosed} />

      <Lena close={lenaClosed} setClose={setLenaClosed} />
    </Page>
  )
}

const TrashCanContainer = styled(m.button)`
  position: absolute;
  bottom: 10vh;
  right: 32px;
  text-align: center;
  font-family: sans-serif;
  background: transparent;
  border: none;

  margin-right:8px;
`

const FolderContainer = styled.div`
  position: absolute;
  top: 64px;
  right: 32px;
`
const Page = styled.div`
  margin: 8px;
  max-width: 800px;
`

export default App
