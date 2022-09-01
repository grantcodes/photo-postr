import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Label, Input } from '@grantcodes/ui'
import { setGallerySlug } from '../../actions'

const GallerySlug = () => {
  const dispatch = useDispatch()
  const slug = useSelector((state) => state.gallery.get('slug'))

  return (
    <div>
      <Label htmlFor="gallery__slug" className="photo__label">
        Slug
      </Label>
      <Input
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
