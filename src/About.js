import React from 'react'
import { TextContent } from './TextContent'

function About() {
  const aboutContent = `
    <p>I'm Mike Leisz, a Los Angeles based artist, educator, and creative technologist.</p>
    <p>I currently work at <a href="https://nightlight.io" target="_blank">NightLight Labs</a> as lead developer where I create physical and digital experiences that blend technology and storytelling.</p>
    <p>I have been making <a href="https://www.instagram.com/mikeleisz/" target="_blank">generative art</a> with code for over a decade, using tools like TouchDesigner, Processing, Three.js, and Unity. My visual art and animation have been exhibited at Tate Modern, Ars Electronica Center, and Kunsthall Trondheim.</p>
    <p>I make <a href="https://technofantasy.itch.io" target='_blank'>games</a> and <a href='https://github.com/mikeleisz/gud_gbs_plugins' target='_blank'>gamedev tools</a> for Game Boy hardware, and moderate the <a href='https://www.gbstudio.dev' target='_blank'>Game Boy Studio</a> discord community.</p>
    <p>Formerly, I taught creative coding, generative art making, computer music, and electronics at CalArts in the <a href='https://mtiid.calarts.edu' target='_blank'>Music Technology</a> department.</p>
    <p>
      For inquiries about code, art, games, or just to say hello:
      <a href="mailto:clickbecause@gmail.com?subject=Hi Mike">clickbecause@gmail.com</a>
    </p>
  `

  return <TextContent content={aboutContent} />
}

export { About }
