import React from 'react'
import styled from 'styled-components'

const Video = ({ videoId, aspect, setIframe }) => {
  return (
    <EmbedContainer invertedAspect={1 / aspect}>
      <iframe
        id={`video-${videoId}`}
        title={videoId}
        src={`https://player.vimeo.com/video/${videoId}`}
        frameBorder={0}
        webkitallowfullscreen="true"
        mozallowfullscreen="true"
        allowFullScreen={true}
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
