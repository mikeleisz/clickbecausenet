import React, { useState } from 'react'
import styled from 'styled-components'
import { motion as m } from 'framer-motion'

const Window = ({ children, style, setClose, close, title, containerStyle }) => {
  const [minimised, setMinimised] = useState(false)
  const [maximised, setMaximised] = useState(false)
  return (
    <WindowContainer
      drag
      dragMomentum={false}
      className={maximised ? 'maximised' : ''}
      animate={{
        scale: close ? 0 : maximised ? 1.25 : 1
      }}
      style={containerStyle}


    >
      <TopBar>
        <WindowTitle>{title}</WindowTitle>
        <span></span>
        <Maximise
          onClick={() => {
            setMaximised(!maximised)
          }}
        />
        <Minimise onClick={() => setMinimised(!minimised)} />
        <Close onClick={() => setClose(true)} />
      </TopBar>
      <WindowContent style={{...style, display: minimised ? "none" : "block"}}> {children}</WindowContent>
    </WindowContainer>
  )
}

const WindowContent = styled(m.div)`
  padding: 32px 16px;
`

const WindowTitle = styled.div`
  flex-grow: 1;
  text-align: center;
`

const Btn = styled.div`
  border-radius: 100%;
  width: 16px;
  height: 16px;
  margin: 4px;
  transition: all 0.3s ease-out;

  &:last-of-type {
    margin-right: 12px;
  }

  &:hover {
    transform: scale(1.2);
  }
`

const Maximise = styled(Btn)`
  background-color: #61c956;
`
const Minimise = styled(Btn)`
  background-color: #f8cd46;
`
const Close = styled(Btn)`
  background-color: #ed4e3e;
`

const WindowContainer = styled(m.div)`
  position: relative;
  border: 2px solid blue;
  margin-bottom: 16px;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.4);
  background: white;
  min-height: 32px;
`

const TopBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 32px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: #aaa;
  border-bottom: 1px solid black;
`

export { Window }
