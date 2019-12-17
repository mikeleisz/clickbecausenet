import React from 'react'
import styled from 'styled-components'
import { Window } from './Window'

const VideoSingles = ({ setClose, close }) => {
  return (
    <Window title={"5000singles.mp4"} setClose={setClose} close={close} style={{ margin: 0, padding: 0, paddingTop: '32px' }}>
      <EmbedContainer>
        <iframe
          src="https://player.vimeo.com/video/380068801"
          frameborder="0"
          webkitAllowFullScreen
          mozallowfullscreen
          allowFullScreen
        ></iframe>
      </EmbedContainer>
    </Window>
  )
}

export { VideoSingles }

const EmbedContainer = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  max-width: 100%;
  iframe,
  object,
  embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`
