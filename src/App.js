import React from 'react'
import styled from 'styled-components'
import { FileProvider } from './FileContext'
import { About } from './About'
import { Trashcan } from './TrashCan'
import { Lena } from './Lena'
import { File } from './File'
import { Desktop } from './Desktop'
import { FileContainer } from './FileContainer'
import { VideoFile } from './VideoFile'
import { CanvasFile } from './CanvasFile'
import { motion as m } from 'framer-motion'
import './App.css'

const App = () => {
  return (
    <FileProvider>
      <Desktop />
      <TrashCanContainer>
        <Trashcan />
        <p>important files</p>
      </TrashCanContainer>
      <Page>
        <h1>clickbecause.net</h1>

        <File name="about.txt" openOnLoad={true} focusOnLoad={true}>
          <About />
        </File>

        <VideoFile name="audioreact.mov" openOnLoad={true} videoId={380100983} aspect={16 / 9} offset={200} />

        <CanvasFile name="lena.jpg" openOnLoad={true} offset={300} width="256px" height="256px" />
        <CanvasFile name="p555.js" offset={400} width="200px" height="200px" isP5={true} folder="sketches" />

        <CanvasFile name="threee.js" offset={400} width="200px" height="200px" folder="sketches" />

        <VideoFile name="two_phones.mov" videoId={380071795} aspect={1} width={'50%'} folder="videos" />
        <VideoFile name="500.mov" videoId={380068801} aspect={1} width={'50%'} folder="videos" />
        <VideoFile name="skittles.mov" videoId={327851438} aspect={16 / 9} width={'70%'} folder="videos" />

        <File name="videos">
          <FileContainer name="videos" />
        </File>

        <File name="sketches">
          <FileContainer name="sketches" />
        </File>
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

const Page = styled.div`
  position: relative;
  margin: 8px;
  max-width: 800px;
`

export default App
