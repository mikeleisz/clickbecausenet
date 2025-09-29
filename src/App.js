import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { FileProvider, FileContext } from './FileContext'
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
import { TextContent } from './TextContent'
import './App.css'

const TrashCanComponent = () => {
  const { files } = useContext(FileContext)

  const handleTrashCanClick = () => {
    const importantFilesFolder = files.find(f => f.name === 'important files')
    if (importantFilesFolder) {
      importantFilesFolder.setClosed(false)
    }
  }

  return (
    <TrashCanContainer>
      <Folder
        name="important files"
        icon={<Trashcan />}
        onClick={handleTrashCanClick}
      />
    </TrashCanContainer>
  )
}

const App = () => {
  const [aboutHeight, setAboutHeight] = useState()

  return (
    <FileProvider>
      <Desktop />
      <TrashCanComponent />
      <Page>
        <h1>clickbecause.net</h1>

        <VideoFile name="audioreact.mov" videoId={380100983} aspect={16 / 9} folder="videos" />
        <VideoFile name="5K.mov" videoId={380068801} aspect={1} width={'50%'} folder="videos" />
        <VideoFile name="inefXclickbecause.mov" videoId={318686868} aspect={16 / 9} folder="videos" />
        <VideoFile name="skittles.mov" videoId={327851438} aspect={16 / 9} width={'70%'} folder="videos" />
        <VideoFile name="old.mov" videoId={165778566} aspect={16 / 9} folder="videos" />
        <VideoFile name="2phones.mov" videoId={380071795} aspect={1} width={'50%'} folder="videos" />

        <File name="videos">
        <FileContainer name="videos" />
        </File>

        <IframeFile name="hellbreaker.exe" url="https://itch.io/embed-upload/13350113?color=000000" width="min(480px, 90vw)" height="min(452px, 80vh)" folder="games" />
        <IframeFile name="ormblok.exe" url="https://itch.io/embed-upload/14832480?color=100e29" width="min(480px, 90vw)" height="min(452px, 80vh)" folder="games" />
        <IframeFile name="ride_or_die.exe" url="https://itch.io/embed-upload/6127785?color=ffffff" width="min(512px, 90vw)" height="min(500px, 80vh)" folder="games" />
        <IframeFile name="taijitu.exe" url="https://itch.io/embed-upload/9314960?color=333333" width="min(600px, 90vw)" height="min(620px, 80vh)" folder="games" />

        <File name="games" visibleOnMobile={false}>
        <FileContainer name="games" />
        </File>

        <IframeFile
          name="perfect-farmony.html"
          url="https://mikeleisz.github.io/perfect-farmony/"
          width="min(800px, 90vw)"
          height="min(800px, 80vh)"
          visibleOnMobile={false}
        />

        <CanvasFile
          name="lena.jpg"
          openOnLoad={true}
          openOrder={2}
          offset={aboutHeight + 32}
          width="256px"
          height="256px"
        />

        <File setHeight={setAboutHeight} name="about.txt" openOnLoad={true} randomOffset={0} openOrder={3}>
          <About />
        </File>

        <IframeFile name="tumblr.html" url="https://clickbecause.tumblr.com" width="min(800px, 90vw)" height="min(800px, 80vh)" visibleOnMobile={false} folder="important files"/>
        
        <File name="to-do.txt" folder="important files">
        <TextContent content={`
            <p><s>demo <i>hell breaker</i> at gdc</s></p>
            <p><s>release <i>ormblok</i></s></p>
            <p><s>finish website</s></p>
          `} />
        </File>

        <File name="important files" folder="hidden" containerStyle={{ width: 'min(350px, 90vw)' }}>
        <FileContainer name="important files" />
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
  bottom: 20px;
  right: 32px;
  margin-right: 8px;
`

const Page = styled.div`
  position: relative;
  margin: 8px;
  max-width: 800px;
`

export default App
