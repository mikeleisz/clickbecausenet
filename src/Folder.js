import React, { useState } from 'react'
import styled from 'styled-components'
import { motion as m } from 'framer-motion'
import { FolderIcon } from './FolderIcon'

const Folder = ({ name, onClick }) => {
  const [isDragging, setIsDragging] = useState(false)
  return (
    <Btn
      drag
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setTimeout(() => setIsDragging(false), 100)}
      dragMomentum={false}
      onClick={() => !isDragging && onClick()}
    >
      <FolderIcon />
      {name}
    </Btn>
  )
}

const Btn = styled(m.button)`
  background: transparent;
  border: none;

  display: flex;
  flex-direction: column;
  align-items: center;

  margin-right: 16px;

  &:hover {
    outline: none;
  }
`

export { Folder }
