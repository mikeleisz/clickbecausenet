import React, { useState } from 'react'
import styled from 'styled-components'
import { Window } from './Window'

function About({ setClose, close }) {
  return (
    <Window title={'about'} close={close} setClose={setClose}>
      <AboutText>
        <p>Mike Leisz is a Los Angeles based artist, educator, and creative developer.</p>
        <p>I make audio reactive video art, games, experiences, and performances.</p>
        <p>I currently teach at CalArts in the Music Technology department.</p>
        <p>For inquiries about design, technical direction, code, art, or just to say hello: 
        <a href="mailto:clickbecause@gmail.com?subject=Hi Mike">
          clickbecause@gmail.com
        </a></p>
        <p> More work @:
        <a href="https://www.instagram.com/clickbecause/" target="_blank">
          clickbecause
        </a></p>
      </AboutText>
    </Window>
  )
}

const AboutText = styled.div`
  font-family: fairfax;
  line-height: 1.2;
`

export { About }
