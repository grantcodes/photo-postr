export const setPhotoUploading = photoId => {
  return {
    type: 'SET_UPLOAD_UPLOADING',
    photoId: photoId,
  }
}

export const setPhotoUploaded = photoId => {
  return {
    type: 'SET_UPLOAD_UPLOADED',
    photoId: photoId,
  }
}
