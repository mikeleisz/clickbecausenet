import React from 'react'
import { FileIcon } from './FileIcon'
import { ImageIcon } from './ImageIcon'
import { FolderIcon } from './FolderIcon'
import { VideoIcon } from './VideoIcon'
import { WebsiteIcon } from './WebsiteIcon'
import { ExeIcon } from './ExeIcon'

export const iconForFile = file => {
  const iconsMap = {
    jpg: <ImageIcon />,
    txt: <FileIcon />,
    mov: <VideoIcon />,
    jpeg: <ImageIcon />,
    js: <ImageIcon />,
    glsl: <ImageIcon />,
    html: <WebsiteIcon />,
    exe: <ExeIcon />
  }

  return iconsMap[file.name.split('.')[1]]
}
