import React from 'react'
import styled from 'styled-components'
import { Window } from './Window'

const VideoReel = ({ setClose, close }) => {
  return (
    <Window title={"audioReact.mp4"} setClose={setClose} close={close} style={{ margin: 0, padding: 0, paddingTop: '32px' }}>
      <EmbedContainer>
        <iframe
          src="https://player.vimeo.com/video/380100983"
          frameborder="0"
          webkitAllowFullScreen
          mozallowfullscreen
          allowFullScreen
          width="640"
          height="640"
        ></iframe>
      </EmbedContainer>
    </Window>
  )
}

export { VideoReel }

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