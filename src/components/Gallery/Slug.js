import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setGalleryContent } from '../../actions'

const GalleryContent = () => {
  const dispatch = useDispatch()
  const content = useSelector((state) => state.gallery.get('content'))

  return (
    <div>
      <label htmlFor="gallery__content" className="photo__label">
        Content
      </label>
      <textarea
        type="text"
        id="gallery__content"
        className="photo__input"
        value={content}
        onChange={(e) => dispatch(setGalleryContent(e.target.value))}
      ></textarea>
    </div>
  )
}

export default GalleryContent
