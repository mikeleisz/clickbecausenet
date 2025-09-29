import React, { useContext, useRef } from 'react'
import styled from 'styled-components'
import { FileContext } from './FileContext'
import { Folder } from './Folder'
import { iconForFile } from './icons'
import { useIsMobile } from './utils/mobile'

const FileContainer = ({ name }) => {
  const { files } = useContext(FileContext)
  const isMobile = useIsMobile()
  const containerRef = useRef()

  return (
    <Container ref={containerRef}>
      {files
        .filter(f => f.folder === name)
        .filter(f => {
          // On mobile, filter out files that have visibleOnMobile === false
          if (isMobile && f.visibleOnMobile === false) {
            return false
          }
          return true
        })
        .map(file => (
          <Folder
            key={file.name}
            name={file.name}
            onClick={() => file.setClosed(false)}
            boundsRef={containerRef}
            icon={iconForFile(file)}
          />
        ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 32px;
  max-width: min(400px, 90vw);
  gap: 16px;
`

export { FileContainer }
