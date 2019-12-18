import React, { useState } from 'react'
import styled from 'styled-components'
import { FileProvider } from './FileContext'
import { About } from './About'
import { Video } from './Video'
import { Folder } from './Folder'
import { Trashcan } from './TrashCan'
import { Lena } from './Lena'
import { File } from './File'
import { Desktop } from './Desktop'
import { FileContainer } from './FileContainer'
import { VideoFile } from './VideoFile'
import './App.css'
import { motion as m } from 'framer-motion'

const App = () => {
  return (
    <FileProvider>
      <Desktop />
      <Page>
        <h1>clickbecause.net</h1>
        <File name="about.txt" openOnLoad={true}>
          <About />
        </File>

        <VideoFile name="audioreact.mov" openOnLoad={true} videoId={380100983} aspect={16 / 9} />

        <VideoFile name="two_phones.mov" videoId={380071795} aspect={1} width={'50%'} />
      </Page>
    </FileProvider>
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

  margin-right: 8px;
`

const FolderContainer = styled.div`
  position: absolute;
  top: 64px;
  right: 32px;
`
const Page = styled.div`
  position: relative;
  margin: 8px;
  max-width: 800px;
`

export default App
