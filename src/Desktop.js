import React, { useContext, useRef } from 'react'
import styled from 'styled-components'
import { FileContext } from './FileContext'
import { Folder } from './Folder'
import { iconForFile } from './icons'

const Desktop = () => {
  const { files } = useContext(FileContext)

  const boundsRef = useRef()
  return (
    <DesktopContainer ref={boundsRef} id="desktop">
      {files
        .filter(f => f.folder === 'desktop')
        .map(file => (
          <Folder
            key={file.name}
            boundsRef={boundsRef}
            name={file.name}
            onClick={() => file.setClosed(false)}
            icon={iconForFile(file)}
          />
        ))}
    </DesktopContainer>
  )
}

const DesktopContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding-top: 80px;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

export { Desktop }
