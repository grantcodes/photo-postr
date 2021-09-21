import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Name from './Name'
import Slug from './Slug'
import Content from './Content'
import { publishGallery } from '../../actions'
import '../../styles/gallery.css'

const Gallery = () => {
  const dispatch = useDispatch()
  const [posting, setPosting] = useState(false)
  const [success, setSuccess] = useState(null)
  const photos = useSelector((state) => state.photos.toJS())

  useEffect(() => {
    window.onbeforeunload = () =>
      'Are you sure you want to leave? Your gallery will be lost'
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!photos.length) {
      alert('You need some photos in your gallery!')
    } else {
      setPosting(true)
      try {
        const url = await dispatch(publishGallery())
        setSuccess(true)
        alert(
          `🎉🎉🎉\n\nSuccessfully posted your gallery to ${url}.\n\nSending you there now.`
        )
        window.location.href = url
      } catch (err) {
        setSuccess(false)
        alert('There was an error publishing your gallery')
        console.error(err)
      }
    }
    return false
  }

  return (
    <form className="gallery" onSubmit={handleSubmit}>
      <h3>Gallery Information</h3>

      <Name />
      <Slug />
      <Content />

      <button
        type="submit"
        className="button"
        disabled={
          posting ||
          photos.length < 1 ||
          photos.find((photo) => !photo.photoUrl) ||
          photos.find((photo) => photo.error)
        }
      >
        {posting ? 'Posting...' : 'Publish Gallery'}
      </button>
    </form>
  )
}

export default Gallery
