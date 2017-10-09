export const addPhoto = (photo) => {
  return {
    type: 'ADD_PHOTO',
    photo: photo,
  };
}

export const setPhotoProperty = (id, property, value) => {
  return {
    type: 'SET_PHOTO_PROPERTY',
    id: id,
    property: property,
    value: value,
  };
}

export const reorderPhotos = (photoToMove, photoDestination) => {
  return {
    type: 'REORDER_PHOTOS',
    index: photoToMove,
    destination: photoDestination,
  };
}

export const removePhoto = (photoId) => {
  return {
    type: 'REMOVE_PHOTO',
    id: photoId,
  };
};