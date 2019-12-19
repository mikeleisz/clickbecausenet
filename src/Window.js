import React, { useState, useEffect, useRef, useContext } from 'react'
import { FileContext } from './FileContext'
import styled from 'styled-components'
import { motion as m } from 'framer-motion'

const Window = ({ setHeight, randomOffset, close, setClose, children, style, title, containerStyle, offset }) => {
  const [minimised, setMinimised] = useState(false)
  const [maximised, setMaximised] = useState(false)
  const [contentHeight, setContentHeight] = useState(0)
  const [contentWidth, setContentWidth] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [index, setIndex] = useState(2)

  const { focus, focusedFile, files, highIndex } = useContext(FileContext)

  const contentRef = useRef()

  useEffect(() => {
    if (!close || maximised) {
      focus(title)
    }
  }, [close, maximised])

  useEffect(() => {
    if (focusedFile === title) {
      setIndex(highIndex)
    }
  }, [title, highIndex, focusedFile])

  useEffect(() => {
    setContentHeight(contentRef.current.offsetHeight)
    setContentWidth(contentRef.current.offsetWidth)
    if (setHeight) {
      setHeight(contentRef.current.offsetHeight)
    }
  }, [files])

  const boundsRef = useRef(document.body)

  return (
    <WindowContainer
      drag
      dragMomentum={false}
      dragConstraints={{ top: 0, left: 0, right: window.innerWidth - 100 }}
      initial={{
        x: Math.random() * (randomOffset !== undefined ? randomOffset : 50),
        scale: 0
      }}
      animate={{
        scale: close ? 0 : maximised ? 1.25 : 1,
        marginBottom: minimised ? contentHeight : 16,
        y: offset || 0,
        transition: {
          marginBottom: {
            duration: 0
          }
        }
      }}
      onDragStart={() => {
        setDragging(true)
        focus(title)
      }}
      onDragEnd={() => setDragging(false)}
      style={{ ...containerStyle, ...(minimised && { width: contentWidth }), zIndex: index }}
    >
      <TopBar style={{ width: contentWidth }}>
        <WindowTitle contentWidth={contentWidth}>{title}</WindowTitle>
        <Maximise onClick={() => setMaximised(!maximised)} />
        <Minimise onClick={() => setMinimised(!minimised)} />
        <Close onClick={() => setClose(true)} />
      </TopBar>
      <WindowContent
        ref={contentRef}
        style={{
          ...style,
          display: minimised ? 'none' : 'block',
          pointerEvents: dragging || minimised || close ? 'none' : 'all'
        }}
      >
        {children}
      </WindowContent>
    </WindowContainer>
  )
}

const WindowContent = styled(m.div)`
  padding: 32px 16px;
`

const WindowTitle = styled.div`
  position: ${props => (props.contentWidth < 300 ? 'unset' : 'absolute')};
  flex-grow: 1
  width: 100%;
  text-align: center;

  color: white;
`

const Btn = styled.div`
  border-radius: 100%;
  width: 16px;
  height: 16px;
  margin: 4px;
  transition: all 0.3s ease-out;
  flex-shrink: 0;
  z-index: 2;
  border: 2px solid rgba(255, 255, 255, 0);

  &:last-of-type {
    margin-right: 12px;
  }

  &:hover {
    transform: scale(1.1);
    border-color: rgba(255, 255, 255, 1);
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
  position: absolute;
  top: 64px;
  left: 0px;
  border: 2px solid black;
  display: inline-block;
  margin-bottom: 16px;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.4);
  background: white;
  min-height: 32px;
  min-width: 200px;

  margin-left: 8px;
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
  background: black;
  border-bottom: 1px solid black;
`

export { Window }
