import React from 'react'
import styled from 'styled-components'
import { Window } from './Window'

const Video = ({ videoId, aspect }) => {
  return (
    <EmbedContainer invertedAspect={1 / aspect}>
      <iframe
        src={`https://player.vimeo.com/video/${videoId}`}
        frameborder="0"
        webkitAllowFullScreen
        mozallowfullscreen
        allowFullScreen
      ></iframe>
    </EmbedContainer>
  )
}

export { Video }

const EmbedContainer = styled.div`
  position: relative;
  padding-bottom: ${props => props.invertedAspect * 100}%;
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
