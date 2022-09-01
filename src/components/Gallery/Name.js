import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Label, Input } from '@grantcodes/ui'
import { setGalleryName } from '../../actions'

const GalleryName = () => {
  const dispatch = useDispatch()
  const name = useSelector((state) => state.gallery.get('name'))

  return (
    <div>
      <Label htmlFor="gallery__name" className="photo__label">
        Name
      </Label>
      <Input
        type="text"
        id="gallery__name"
        className="photo__input"
        value={name}
        onChange={(e) => dispatch(setGalleryName(e.target.value))}
      />
    </div>
  )
}

export default GalleryName
