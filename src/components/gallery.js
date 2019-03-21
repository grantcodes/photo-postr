import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setGalleryName, setGalleryContent, setGallerySlug } from '../actions'
import publishGallery from '../modules/publish'
import '../styles/gallery.css'

class Gallery extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posting: false,
      success: null,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    window.onbeforeunload = function() {
      return 'Are you sure you want to leave? Your gallery will be lost'
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    if (!this.props.photos.length) {
      alert('You need some photos in your gallery!')
    } else {
      this.setState({ posting: true })
      const gallery = {
        name: this.props.name,
        content: this.props.content,
        slug: this.props.slug,
      }
      publishGallery(gallery, this.props.photos, this.props.user)
        .then(url => {
          this.setState({
            success: true,
            posting: false,
          })
          alert(
            `🎉🎉🎉\n\nSuccessfully posted your gallery to ${url}.\n\nSending you there now.`
          )
          window.location.href = url
        })
        .catch(err => {
          this.setState({
            success: false,
            posting: false,
          })
          alert('There was an error publishing your gallery')
          console.log(err)
        })
    }
    return false
  }

  render() {
    const { actions, name, slug, content, photos } = this.props
    const { posting } = this.state
    return (
      <form className="gallery" onSubmit={this.handleSubmit}>
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
            onChange={e => actions.setName(e.target.value)}
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
            onChange={e => actions.setSlug(e.target.value)}
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
            onChange={e => actions.setContent(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="button"
          disabled={
            posting ||
            photos.length < 1 ||
            photos.find(photo => !photo.photoUrl) ||
            photos.find(photo => photo.error)
          }
        >
          {posting ? 'Posting...' : 'Publish Gallery'}
        </button>
      </form>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    user: state.user.toJS(),
    photos: state.photos.toJS(),
    name: state.gallery.get('name'),
    content: state.gallery.get('content'),
    slug: state.gallery.get('slug'),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        setName: setGalleryName,
        setContent: setGalleryContent,
        setSlug: setGallerySlug,
      },
      dispatch
    ),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Gallery)
