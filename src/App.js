import React, { useState } from 'react'
import styled from 'styled-components'
import { About } from './About'
import { Video } from './Video'
import { Folder } from './Folder'
import { Trashcan } from './TrashCan'
import './App.css'
import { motion as m } from 'framer-motion'

const App = () => {
  const [showVideo, setShowVideo] = useState(true)
  const [showAbout, setShowAbout] = useState(true)

  return (
    <Page>
      <h1>clickbecause.net</h1>
      <TrashCanContainer drag dragMomentum={false}>
        <Trashcan />
        <p>important files</p>
      </TrashCanContainer>
      <FolderContainer>
        <Folder name={'reel'} onClick={() => setShowVideo(true)} />
        <Folder name={'about'} onClick={() => setShowAbout(true)} />
      </FolderContainer>
      {showAbout && <About onClose={() => setShowAbout(false)} />}
      {showVideo && <Video onClose={() => setShowVideo(false)} />}
    </Page>
  )
}

const TrashCanContainer = styled(m.button)`
  position: absolute;
  bottom: 10vh;
  right: 0;
  text-align: center;
  font-family: sans-serif;
  background: transparent;
  border: none;
`

const FolderContainer = styled.div`
  position: absolute;
  top: 64px;
  right: 0;
`
const Page = styled.div`
  margin: 8px;
  max-width: 800px;
`

export default App
