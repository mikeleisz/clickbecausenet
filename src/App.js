import React, { useState } from 'react'
import styled from 'styled-components'
import { About } from './About'
import { Video } from './Video'
import { Folder } from './Folder'
import { Trashcan } from './TrashCan'
import { Lena } from './Lena'
import './App.css'
import { motion as m } from 'framer-motion'

const App = () => {


  const [aboutClosed, setAboutClosed] = useState(false)
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
        <Folder name={'reel'} onClick={() => setVideoClosed(false)} />
        <Folder name={'about'} onClick={() => setAboutClosed(false)} />
        <Folder name={'lena'} onClick={() => setLenaClosed(false)} />
      </FolderContainer>

      <About close={aboutClosed} setClose={setAboutClosed}/>
      <Video close={videoClosed} setClose={setVideoClosed} />
      <Lena close={lenaClosed} setClose={setLenaClosed} />

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
