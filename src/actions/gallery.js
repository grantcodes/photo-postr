export const setGalleryName = name => {
  return {
    type: 'SET_GALLERY_NAME',
    value: name,
  }
}

export const setGalleryContent = content => {
  return {
    type: 'SET_GALLERY_CONTENT',
    value: content,
  }
}

export const setGallerySlug = content => {
  return {
    type: 'SET_GALLERY_SLUG',
    value: content,
  }
}
