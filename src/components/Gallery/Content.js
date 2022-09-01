import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Label, TextArea } from '@grantcodes/ui'
import { setGalleryContent } from '../../actions'

const GalleryContent = () => {
  const dispatch = useDispatch()
  const content = useSelector((state) => state.gallery.get('content'))

  return (
    <div>
      <Label htmlFor="gallery__content" className="photo__label">
        Content
      </Label>
      <TextArea
        id="gallery__content"
        className="photo__input"
        value={content}
        onChange={(e) => dispatch(setGalleryContent(e.target.value))}
      ></TextArea>
    </div>
  )
}

export default GalleryContent
