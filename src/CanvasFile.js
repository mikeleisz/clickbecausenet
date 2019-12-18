import React, { useRef, useEffect, useState } from 'react'
import { motion as m } from 'framer-motion'
import styled from 'styled-components'
import { File } from './File'
import * as sketch from './sketches'

const CanvasFile = ({ name, folder, openOnLoad, width, height, offset, isP5 }) => {
  const w = width || '500px'
  const h = height || '500px'

  const sketchName = name.split('.')[0].toLowerCase()

  const [waitingForP5, setWaitingForP5] = useState(true)

  const canvasRef = useRef()
  const timeoutRef = useRef()
  const closedRef = useRef()

  const p5WaitTime = 3000

  useEffect(() => {
    const sketchContext = {
      name: sketchName,
      canvas: canvasRef.current,
      width: parseInt(w),
      height: parseInt(h),
      closed: closedRef
    }
    if (isP5) {
      setWaitingForP5(true)
      timeoutRef.current = setTimeout(() => {
        sketch[sketchName](sketchContext)
        setWaitingForP5(false)
      }, p5WaitTime)
    } else {
      sketch[sketchName](sketchContext)
    }

    return () => timeoutRef.current && clearTimeout(timeoutRef.current)
  }, [])

  return (
    <File
      name={name}
      style={{ padding: 0, marginTop: '32px', width: w, height: h }}
      folder={folder}
      openOnLoad={openOnLoad}
      offset={offset}
      onChangeClose={close => (closedRef.current = close)}
    >
      {isP5 ? (
        <P5Container style={{ width: w, height: h }} id={sketchName}>
          {waitingForP5 && (
            <Loader>
              <Progress initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: p5WaitTime * 0.001 }} />
            </Loader>
          )}
        </P5Container>
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
