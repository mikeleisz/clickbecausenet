import React, { useContext } from 'react'
import styled from 'styled-components'
import { FileContext } from './FileContext'
import { Folder } from './Folder'

const Desktop = () => {
  const { files } = useContext(FileContext)

  return (
    <DesktopContainer>
      {files
        .filter(f => f.folder === 'desktop')
        .map(file => (
          <Folder key={file.name} name={file.name} onClick={() => file.setClosed(false)} />
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

  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

export { Desktop }
