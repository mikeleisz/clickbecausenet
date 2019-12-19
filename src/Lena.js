import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Window } from './Window'
import { runLossy } from './sketches/lossy'

function Lena ({ setClose, close }){
	const canvas = useRef()
	useEffect(() => runLossy(canvas), [])
	return (
		<Window title="lena.jpg" close={close} setClose={setClose} containerStyle={{ width: "256px"}} style={{padding: 0, paddingTop: '32px'}}>
			<Canvas width="128px" height="128px" ref={canvas} id='lossy'></Canvas>
		</Window>
	)
}

const Canvas = styled.canvas`
  height: 256px;
  width: 256px;
  padding: 0;
  margin: 0;
`
export { Lena }
