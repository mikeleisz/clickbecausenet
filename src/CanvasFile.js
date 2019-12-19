import React, { useRef, useEffect, useState } from 'react'
import { motion as m } from 'framer-motion'
import styled from 'styled-components'
import { File } from './File'
import * as sketch from './sketches'
import { DummyLoader } from './DummyLoader'

const CanvasFile = ({ name, folder, openOnLoad, width, height, offset, isP5, openOrder }) => {
  const w = width || '500px'
  const h = height || '500px'

  const sketchName = name.split('.')[0].toLowerCase()
  const [loaded, setLoaded] = useState(false)

  const canvasRef = useRef()
  const closedRef = useRef()

  useEffect(() => {
    const sketchContext = {
      name: sketchName,
      canvas: canvasRef.current,
      width: parseInt(w),
      height: parseInt(h),
      closed: closedRef
    }

    sketch[sketchName](sketchContext)
  }, [])

  return (
    <File
      openOrder={openOrder}
      name={name}
      style={{ padding: 0, marginTop: '32px', width: w, height: h }}
      folder={folder}
      openOnLoad={openOnLoad}
      offset={offset}
      onChangeClose={close => (closedRef.current = close)}
    >
      {isP5 ? (
        <P5Container style={{ width: w, height: h }} id={sketchName} />
      ) : (
        <canvas style={{ pointerEvents: 'all' }} ref={canvasRef} width={w} height={h} id={sketchName} />
      )}
    </File>
  )
}

const P5Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const Loader = styled.div`
  position: relative;
  width: 80%;
  height: 10px;
  border: 1px solid black;
`

const Progress = styled(m.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  transform-origin: left;
`

export { CanvasFile }
