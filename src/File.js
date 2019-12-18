import React, { useContext, useState, useEffect, useRef } from 'react'
import { FileContext } from './FileContext'
import { Window } from './Window'

const File = ({ children, name, style, containerStyle, folder, openOnLoad, offset }) => {
  const [closed, setClosed] = useState(true)
  const { addFile, removeFile } = useContext(FileContext)

  const timeoutRef = useRef()

  useEffect(() => {
    if (closed && openOnLoad) {
      timeoutRef.current = setTimeout(() => setClosed(false), 200 + Math.random() * 500)
    }

    return () => timeoutRef.current && clearTimeout(timeoutRef.current)
  }, [])

  useEffect(() => {
    addFile({ name, setClosed, folder: folder || 'desktop' })
    return () => removeFile(name)
  }, [])

  return (
    <Window
      close={closed}
      setClose={setClosed}
      title={name}
      style={style}
      containerStyle={containerStyle}
      offset={offset}
    >
      {children}
    </Window>
  )
}

export { File }
