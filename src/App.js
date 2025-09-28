import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FileProvider } from './FileContext'
import { About } from './About'
import { Trashcan } from './TrashCan'
import { Folder } from './Folder'
import { Lena } from './Lena'
import { File } from './File'
import { Desktop } from './Desktop'
import { FileContainer } from './FileContainer'
import { VideoFile } from './VideoFile'
import { CanvasFile } from './CanvasFile'
import { IframeFile } from './IframeFile'
import { motion as m } from 'framer-motion'
import './App.css'

const App = () => {
  const [aboutHeight, setAboutHeight] = useState()

  return (
    <FileProvider>
      <Desktop />
      <TrashCanContainer>
        <Folder name="important files" icon={<Trashcan />} />
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

        <IframeFile
          name="perfect-farmony.html"
          url="https://mikeleisz.github.io/perfect-farmony/"
          width="600px"
          height="600px"
        />

        <VideoFile name="2phones.mov" videoId={380071795} aspect={1} width={'50%'} folder="videos" />
        <VideoFile name="5K.mov" videoId={380068801} aspect={1} width={'50%'} folder="videos" />
        <VideoFile name="skittles.mov" videoId={327851438} aspect={16 / 9} width={'70%'} folder="videos" />

        <File name="videos">
        <FileContainer name="videos" />
        </File>

        {/* <CanvasFile name="p555.js" width="200px" height="200px" isP5={true} folder="sketches" /> */}
        {/*  */}
        {/* <CanvasFile name="threee.js" width="200px" height="200px" folder="sketches" /> */}
        {/*  */}
        {/* <VideoFile name="2phones.mov" videoId={380071795} aspect={1} width={'50%'} folder="videos" /> */}
        {/* <VideoFile name="5K.mov" videoId={380068801} aspect={1} width={'50%'} folder="videos" /> */}
        {/* <VideoFile name="skittles.mov" videoId={327851438} aspect={16 / 9} width={'70%'} folder="videos" /> */}
        {/*  */}
        {/* <File name="videos"> */}
        {/*   <FileContainer name="videos" /> */}
        {/* </File> */}
        {/*  */}
        {/* <File name="sketches"> */}
        {/*   <FileContainer name="sketches" /> */}
        {/* </File> */}
      </Page>
    </FileProvider>
  )
}

const TrashCanContainer = styled.div`
  position: absolute;
  bottom: 0vh;
  right: 32px;
  margin-right: 8px;
`

const Page = styled.div`
  position: relative;
  margin: 8px;
  max-width: 800px;
`

export default App
