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
import './App.css'
import { motion as m } from 'framer-motion'

const App = () => {
  return (
    <FileProvider>
      <Desktop />
      <Page>
        <h1>clickbecause.net</h1>
        <File name="hello.txt" openOnLoad={true}>
          <p>Hello?</p>
        </File>

        <File name="rad.txt" folder="cool_stuff">
          <p>yupp?</p>
        </File>

        <File name="nah.txt" folder="cool_stuff">
          <p>nahhhh?</p>
        </File>

        <File name="cool_stuff">
          <FileContainer name="cool_stuff" />
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
