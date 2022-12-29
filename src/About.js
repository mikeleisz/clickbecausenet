import React from 'react'
import styled from 'styled-components'

function About() {
  return (
    <AboutText>
      <p>Mike Leisz is a Los Angeles based artist, educator, and creative technologist.</p>
      <p>I'm currently working on <i>A (MOTH) in Relay</i>, a videogame about time travel and heartbreak.</p>
      <p>I teach at CalArts in the Music Technology department.</p>
      <p>
        For inquiries about design, technical direction, code, art, or just to say hello:
        <a href="mailto:clickbecause@gmail.com?subject=Hi Mike">clickbecause@gmail.com</a>
      </p>
      <p>
        More work @:
        <a href="https://www.instagram.com/mikeleisz/" target="_blank">
          mikeleisz
        </a>
      </p>
    </AboutText>
  )
}

const AboutText = styled.div`
  font-family: fairfax;
  line-height: 1.2;
`

export { About }
