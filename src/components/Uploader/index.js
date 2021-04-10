import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import UploadZone from './UploadZone'
import { addPhoto } from '../../actions'
import moment from 'moment'
import { generate as generateId } from 'shortid'
import classnames from 'classnames'
import '../../styles/uploader.css'

const Uploader = () => {
  const dispatch = useDispatch()

  const [fullscreen, setFullscreen] = useState(false)
  const enableFullscreen = () => setFullscreen(true)
  const disableFullscreen = () => setFullscreen(false)

  useEffect(() => {
    // Add listener for drag events and make the drop zone cover the whole screen
    window.addEventListener('dragenter', enableFullscreen)
    window.addEventListener('dragend', disableFullscreen)
    return () => {
      window.removeEventListener('dragenter', enableFullscreen)
      window.removeEventListener('dragend', disableFullscreen)
    }
  }, [])

  const handleFiles = (files) => {
    setFullscreen(false)
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      dispatch(
        addPhoto({
          id: generateId(),
          name: file.name,
          file: file,
          date: moment(),
          latitude: false,
          longitude: false,
          content: '',
        })
      )
    }
  }

  const uploadProps = {
    multiple: true,
    accept: '.jpg,.jpeg,.png,.gif,',
  }

  return (
    <UploadZone
      onFiles={handleFiles}
      inputProps={uploadProps}
      onMouseLeave={disableFullscreen}
      onDragEnd={disableFullscreen}
      onDragLeave={disableFullscreen}
      className={classnames('uploader', {
        'uploader--fullscreen': fullscreen,
      })}
    >
      <span className="uploader__button button">
        Drag your photos here or click to select
      </span>
    </UploadZone>
  )
}

export default Uploader
