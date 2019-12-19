import React, { useContext, useState, useEffect, useRef } from 'react'
import { FileContext } from './FileContext'
import { Window } from './Window'

const File = ({
  setHeight,
  randomOffset,
  children,
  name,
  style,
  containerStyle,
  folder,
  openOnLoad,
  offset,
  onChangeClose,
  openOrder
}) => {
  const [closed, setClosed] = useState(true)
  const { addFile, removeFile } = useContext(FileContext)

  const timeoutRef = useRef()

  useEffect(() => {
    if (onChangeClose) {
      onChangeClose(closed)
    }
  }, [closed])

  useEffect(() => {
    if (closed && openOnLoad) {
      timeoutRef.current = setTimeout(() => setClosed(false), openOrder * 100)
    }

    return () => timeoutRef.current && clearTimeout(timeoutRef.current)
  }, [])

  useEffect(() => {
    addFile({ name, setClosed, folder: folder || 'desktop' })
    return () => removeFile(name)
  }, [])

  return (
    <Window
      setHeight={setHeight}
      close={closed}
      setClose={setClosed}
      title={name}
      style={style}
      containerStyle={containerStyle}
      offset={offset}
      randomOffset={randomOffset}
    >
      {children}
    </Window>
  )
}

export { File }
