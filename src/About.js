import React, { useState } from 'react'
import styled from 'styled-components'
import { Window } from './Window'

function About({ setClose, close }) {
  return (
    <Window title={'about'} close={close} setClose={setClose}>
      <AboutText>
        <p>I'm Mike Leisz, a Los Angeles based artist, educator, and creative developer.</p>
        <p>With 10+ years experience in digital media, I provide technical direction, creative strategy, software development, and motion design for clients like Getty, Red Bull Music, The City of Los Angeles, and DJ Madeon.</p>
        <p>I currently teach at CalArts in the Music Technology department.</p>
        <br></br>
        <p>If you'd like to hire me or just say hi: 
        <a href="mailto:clickbecause@gmail.com?subject=Hi Mike">
          clickbecause@gmail.com
        </a></p>
        <p>If you'd like to see some of my audio reactive visual work: 
        <a href="https://www.instagram.com/clickbecause/" target="_blank">
          @clickbecause
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
