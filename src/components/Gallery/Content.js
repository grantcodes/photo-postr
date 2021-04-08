import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setGallerySlug } from '../../actions'

const GallerySlug = () => {
  const dispatch = useDispatch()
  const slug = useSelector((state) => state.gallery.get('slug'))

  return (
    <div>
      <label htmlFor="gallery__slug" className="photo__label">
        Slug
      </label>
      <input
        type="text"
        id="gallery__slug"
        className="photo__input"
        value={slug}
        onChange={(e) => dispatch(setGallerySlug(e.target.value))}
      />
    </div>
  )
}

export default GallerySlug
