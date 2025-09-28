import React, { useState } from 'react'
import styled from 'styled-components'
import { motion as m } from 'framer-motion'
import { DummyLoader } from './DummyLoader'

const IframeEmbed = ({ url, width, height, name }) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <EmbedContainer width={width} height={height}>
      {loaded ? (
        <iframe
          id={`iframe-${name}`}
          title={url}
          src={url}
          style={{ border: 'none' }}
          width="100%"
          height="100%"
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

export { IframeEmbed }

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
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '400px'};
  overflow: hidden;
  max-width: 100%;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
`