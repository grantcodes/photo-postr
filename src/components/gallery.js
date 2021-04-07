import React, { useState, useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setGalleryName, setGalleryContent, setGallerySlug } from '../actions'
import publishGallery from '../modules/publish'
import '../styles/gallery.css'

const Gallery = ({ actions, user, photos = [], name, content, slug }) => {
  const [posting, setPosting] = useState(false)
  const [success, setSuccess] = useState(null)

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
      const gallery = {
        name,
        content: content,
        slug: slug,
      }
      try {
        const url = await publishGallery(gallery, photos, user)
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

      <div>
        <label htmlFor="gallery__name" className="photo__label">
          Name
        </label>
        <input
          type="text"
          id="gallery__name"
          className="photo__input"
          value={name}
          onChange={(e) => actions.setName(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="gallery__slug" className="photo__label">
          Slug
        </label>
        <input
          type="text"
          id="gallery__slug"
          className="photo__input"
          value={slug}
          onChange={(e) => actions.setSlug(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="gallery__content" className="photo__label">
          Content
        </label>
        <textarea
          id="gallery__content"
          className="photo__input"
          value={content}
          onChange={(e) => actions.setContent(e.target.value)}
        />
      </div>

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

const mapStateToProps = (state, props) => ({
  user: state.user.toJS(),
  photos: state.photos.toJS(),
  name: state.gallery.get('name'),
  content: state.gallery.get('content'),
  slug: state.gallery.get('slug'),
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      setName: setGalleryName,
      setContent: setGalleryContent,
      setSlug: setGallerySlug,
    },
    dispatch
  ),
})

export default connect(mapStateToProps, mapDispatchToProps)(Gallery)
