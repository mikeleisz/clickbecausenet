import React, { useState } from 'react'
import styled from 'styled-components'
import { motion as m } from 'framer-motion'
import { DummyLoader } from './DummyLoader'

const Video = ({ videoId, aspect, setIframe }) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <EmbedContainer invertedAspect={1 / aspect}>
      {loaded ? (
        <iframe
          id={`video-${videoId}`}
          title={videoId}
          src={`https://player.vimeo.com/video/${videoId}`}
          frameBorder={0}
          webkitallowfullscreen="true"
          mozallowfullscreen="true"
          allowFullScreen={true}
        ></iframe>
      ) : (
        <DummyLoader wait={500} setDone={setLoaded} />
      )}
      <Overlay
        animate={{ backgroundColor: loaded ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 1)' }}
        transition={{ ease: 'easeOut', delay: 0.5, duration: 0.5 }}
        className="overlay"
      />
    </EmbedContainer>
  )
}

export { Video }

const Overlay = styled(m.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background: white;
  pointer-events: none;
`

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
