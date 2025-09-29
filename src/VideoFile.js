import React from 'react'
import Player from '@vimeo/player'
import { File } from './File'
import { Video } from './Video'

const VideoFile = ({ aspect, videoId, name, folder, openOnLoad, width, offset, visibleOnMobile = true }) => {
  const onChangeClosed = closed => {
    if (closed) {
      const iframe = document.getElementById(`video-${videoId}`)
      if (iframe) {
        const player = new Player(iframe)
        player.pause()
      }
    }
  }
  return (
    <File
      name={name}
      style={{ padding: 0, marginTop: '32px' }}
      containerStyle={{ width: width || '80%' }}
      folder={folder}
      openOnLoad={openOnLoad}
      offset={offset}
      onChangeClose={onChangeClosed}
      visibleOnMobile={visibleOnMobile}
    >
      <Video videoId={videoId} aspect={aspect} />
    </File>
  )
}

export { VideoFile }
