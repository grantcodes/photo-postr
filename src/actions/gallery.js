import publish from '../modules/publish'

export const setGalleryName = (name) => {
  return {
    type: 'SET_GALLERY_NAME',
    value: name,
  }
}

export const setGalleryContent = (content) => {
  return {
    type: 'SET_GALLERY_CONTENT',
    value: content,
  }
}

export const setGallerySlug = (slug) => {
  return {
    type: 'SET_GALLERY_SLUG',
    value: slug,
  }
}

export const publishGallery = () => async (dispatch, getState) => {
  const state = getState()
  const user = state.user.toJS()
  const photos = state.photos.toJS()
  const gallery = {
    name: state.gallery.get('name'),
    content: state.gallery.get('content'),
    slug: state.gallery.get('slug'),
  }

  return await publish(gallery, photos, user)
}
