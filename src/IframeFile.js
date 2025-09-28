import React from 'react'
import { File } from './File'
import { IframeEmbed } from './IframeEmbed'

const IframeFile = ({ url, name, folder, openOnLoad, width, height, offset, openOrder }) => {
  const onChangeClosed = closed => {
    if (closed) {
      const iframe = document.getElementById(`iframe-${name}`)
      if (iframe) {
        // Force reload the iframe to stop any running processes
        iframe.src = iframe.src
      }
    }
  }

  return (
    <File
      name={name}
      style={{ padding: 0, marginTop: '32px' }}
      containerStyle={{ width: width || '80%', height: height || 'auto' }}
      folder={folder}
      openOnLoad={openOnLoad}
      offset={offset}
      openOrder={openOrder}
      onChangeClose={onChangeClosed}
    >
      <IframeEmbed url={url} width={width} height={height} name={name} />
    </File>
  )
}

export { IframeFile }