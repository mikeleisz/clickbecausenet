import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { motion as m } from 'framer-motion'

const DummyLoader = ({ wait, setDone, visible }) => {
  const timeoutRef = useRef()
  useEffect(() => {
    timeoutRef.current = setTimeout(() => setDone && setDone(true), wait)
    return () => timeoutRef.current && clearTimeout(timeoutRef.current)
  }, [])
  return (
    <Loader style={{ visibility: visible ? 'visible' : 'hidden' }}>
      <Progress initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: wait * 0.001 }} />{' '}
    </Loader>
  )
}

const Loader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
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

export { DummyLoader }
