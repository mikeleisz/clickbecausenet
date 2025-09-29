import React, { useContext, useRef } from 'react'
import styled from 'styled-components'
import { FileContext } from './FileContext'
import { Folder } from './Folder'
import { iconForFile } from './icons'
import { useIsMobile } from './utils/mobile'

const Desktop = () => {
  const { files } = useContext(FileContext)
  const isMobile = useIsMobile()

  const boundsRef = useRef()
  return (
    <DesktopContainer ref={boundsRef} id="desktop">
      {files
        .filter(f => f.folder === 'desktop')
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
