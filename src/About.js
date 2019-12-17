import React, { useState } from 'react'
import styled from 'styled-components'
import { Window } from './Window'

function About({ setClose, close }) {
  return (
    <Window title={'about'} close={close} setClose={setClose}>
      <AboutText>
        <p>i'm mike leisz, a los angeles based artist, educator, and computer graphics programmer.</p>
        <p>i make live visuals, interactive installations, webGL graphics, and music videos.</p>
        <p>say hi: clickbecause@gmail.com</p>
        <a href="https://www.instagram.com/clickbecause/" target="_blank">
          @clickbecause
        </a>
      </AboutText>
    </Window>
  )
}

const AboutText = styled.div`
  //font-family: monospace;
`

export { About }
