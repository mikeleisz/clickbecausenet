import React, { useState } from 'react'
import styled from 'styled-components'
import { motion as m } from 'framer-motion'
import { FolderIcon } from './icons/FolderIcon'

const Folder = ({ name, onClick, boundsRef, icon }) => {
  const [isDragging, setIsDragging] = useState(false)
  return (
    <Btn
      drag
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setTimeout(() => setIsDragging(false), 100)}
      dragMomentum={false}
      dragConstraints={boundsRef ? boundsRef : false}
      dragElastic={0}
      onClick={() => !isDragging && onClick()}
    >
      {icon || <FolderIcon />}
      {name}
    </Btn>
  )
}

const Btn = styled(m.button)`
  // font-family: fairfax;

  background: transparent;
  border: none;

  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    outline: none;
  }
`

export { Folder }
