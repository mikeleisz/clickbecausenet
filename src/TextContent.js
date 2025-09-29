import React from 'react'
import styled from 'styled-components'

function TextContent({ content }) {
  return (
    <TextContainer dangerouslySetInnerHTML={{ __html: content }} />
  )
}

const TextContainer = styled.div`
  font-family: fairfax;
  line-height: 1.2;
`

export { TextContent }