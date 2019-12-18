import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Window } from './Window'
import { runLossy } from './sketches/lossy'

function Lena() {
  const canvas = useRef()
  useEffect(() => runLossy(canvas), [])
  return <Canvas width="256px" height="256px" ref={canvas} id="lossy"></Canvas>
}

const Canvas = styled.canvas`
  height: 256px;
  width: 256px;
  padding: 0;
  margin: 0;
`
export { Lena }
