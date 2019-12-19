import React, { useState, useEffect, useLayoutEffect, useRef, useContext } from 'react'
import ResizeObserver from 'resize-observer-polyfill'
import { FileContext } from './FileContext'
import styled from 'styled-components'
import { motion as m, useMotionValue, useAnimation } from 'framer-motion'

const Window = ({ setHeight, randomOffset, close, setClose, children, style, title, containerStyle, offset }) => {
  const [minimised, setMinimised] = useState(false)
  const [maximised, setMaximised] = useState(false)
  const [contentHeight, setContentHeight] = useState(0)
  const [contentWidth, setContentWidth] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [index, setIndex] = useState(2)

  const { focus, focusedFile, files, highIndex } = useContext(FileContext)

  const x = useMotionValue(0)
  const y = useMotionValue(offset || 0)
  const controls = useAnimation()

  const contentRef = useRef()

  useLayoutEffect(() => {
    if (offset) {
      y.set(offset)
    }
  }, [offset])

  useLayoutEffect(() => {
    if (!close || maximised) {
      focus(title)
    }
  }, [close, maximised])

  useEffect(() => {
    if (focusedFile === title) {
      setIndex(highIndex)
    }
  }, [title, highIndex, focusedFile])

  useLayoutEffect(() => {
    const observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        if (entry.target.offsetWidth > 0) {
          setContentHeight(entry.target.offsetHeight)
        }

        if (entry.target.offsetHeight > 0) {
          setContentWidth(entry.target.offsetWidth)
          if (setHeight) {
            setHeight(entry.target.offsetHeight)
          }
        }
      }
    })

    observer.observe(contentRef.current)
  }, [])

  useLayoutEffect(() => {
    if (close) {
      controls.start({ scale: 0 })
    } else if (maximised) {
      controls.start({ scale: 1.25 })
    } else {
      controls.start({ scale: 1 })
    }
  }, [close, maximised])

  return (
    <WindowContainer
      initial={{
        x: Math.random() * (randomOffset !== undefined ? randomOffset : 50),
        scale: 0
      }}
      animate={controls}
      style={{
        marginBottom: minimised ? contentHeight : 16,
        x,
        y,
        ...containerStyle,
        ...(minimised && { width: contentWidth }),
        zIndex: index
      }}
    >
      <TopBar
        drag
        _dragValueX={x}
        _dragValueY={y}
        _dragTransitionControls={controls}
        dragMomentum={false}
        dragConstraints={{ top: 0, left: 0, right: window.innerWidth - 100 }}
        onDragStart={() => {
          setDragging(true)
          focus(title)
        }}
        onDragEnd={() => setDragging(false)}
        style={{ width: contentWidth }}
      >
        <WindowTitle contentWidth={contentWidth}>{title}</WindowTitle>
        <Maximise onClick={() => setMaximised(!maximised)} />
        <Minimise onClick={() => setMinimised(!minimised)} />
        <Close
          onClick={() => {
            setMaximised(false)
            setClose(true)
          }}
        />
      </TopBar>
      <WindowContent
        ref={contentRef}
        className="content"
        drag={false}
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

  font-size: 92%;

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

  margin-left: 4px;
`

const TopBar = styled(m.div)`
  position: absolute;
  top: 0;
  left: 0;
  // width: 100%;
  height: 32px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: black;
  border-bottom: 1px solid black;
`

export { Window }
