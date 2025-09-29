import React, { useContext, useState, useEffect, useRef } from 'react'
import { FileContext } from './FileContext'
import { Window } from './Window'
import { ResponsiveWrapper } from './components/ResponsiveWrapper'

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
  openOrder,
  visibleOnMobile = true
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
    addFile({ name, setClosed, folder: folder || 'desktop', visibleOnMobile })
    return () => removeFile(name)
  }, [])

  return (
    <ResponsiveWrapper visibleOnMobile={visibleOnMobile}>
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
    </ResponsiveWrapper>
  )
}

export { File }
