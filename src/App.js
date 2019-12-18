import React, { useState, useEffect } from 'react'
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
  const [aboutHeight, setAboutHeight] = useState()

  useEffect(() => {
    console.log('h', aboutHeight)
  }, [aboutHeight])
  return (
    <FileProvider>
      <Desktop />
      <TrashCanContainer>
        <Trashcan />
        <p>important files</p>
      </TrashCanContainer>
      <Page>
        <h1>clickbecause.net</h1>

        <File setHeight={setAboutHeight} name="about.txt" openOnLoad={true} randomOffset={0} openOrder={3}>
          <About />
        </File>

        <VideoFile
          openOrder={1}
          name="audioreact.mov"
          openOnLoad={true}
          videoId={380100983}
          aspect={16 / 9}
          offset={aboutHeight + 32}
          randomOffset={0}
        />

        <CanvasFile
          name="lena.jpg"
          openOnLoad={true}
          openOrder={2}
          offset={aboutHeight + 300}
          width="256px"
          height="256px"
        />
        <CanvasFile name="p555.js" width="200px" height="200px" isP5={true} folder="sketches" />

        <CanvasFile name="threee.js" width="200px" height="200px" folder="sketches" />

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
