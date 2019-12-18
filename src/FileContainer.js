import React, { useContext, useRef } from 'react'
import styled from 'styled-components'
import { FileContext } from './FileContext'
import { Folder } from './Folder'

const FileContainer = ({ name }) => {
  const { files } = useContext(FileContext)
  const containerRef = useRef()

  return (
    <Container ref={containerRef}>
      {files
        .filter(f => f.folder === name)
        .map(file => (
          <Folder key={file.name} name={file.name} onClick={() => file.setClosed(false)} boundsRef={containerRef} />
        ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  padding: 32px;
`

export { FileContainer }
