import React from 'react'
import { File } from './File'
import { Video } from './Video'

const VideoFile = ({ aspect, videoId, name, folder, openOnLoad, width }) => {
  return (
    <File
      name={name}
      style={{ padding: 0, marginTop: '32px' }}
      containerStyle={{ width: width || '80%' }}
      folder={folder}
      openOnLoad={openOnLoad}
    >
      <Video videoId={videoId} aspect={aspect} />
    </File>
  )
}

export { VideoFile }
