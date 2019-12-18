import React, { useContext, useState, useEffect } from 'react'
import { FileContext } from './FileContext'
import { Window } from './Window'

const File = ({ children, name, style, containerStyle, folder, openOnLoad }) => {
  const [closed, setClosed] = useState(!openOnLoad)
  const { addFile, removeFile } = useContext(FileContext)

  useEffect(() => {
    addFile({ name, setClosed, folder: folder || 'desktop' })
    return () => removeFile(name)
  }, [])

  return (
    <Window close={closed} setClose={setClosed} title={name} style={style} containerStyle={containerStyle}>
      {children}
    </Window>
  )
}

export { File }
