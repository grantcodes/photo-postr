import api from './rest-api'

export default function publish(gallery, photos, user) {
  return new Promise((fulfill, reject) => {
    let photoPromises = []

    photos.forEach(photo => {
      if (!photo.photoUrl) {
        return reject('Not all photos are uploaded yet')
      }
      let photoMicropub = {
        type: ['h-entry'],
        properties: {
          photo: [photo.photoUrl],
          category: ['gallery-photo'],
          visibility: ['unlisted'],
          published: [photo.date.format()],
        },
      }
      if (photo.name) {
        photoMicropub.properties.name = [photo.name]
      }
      if (photo.content) {
        photoMicropub.properties.content = [photo.content]
      }
      if (photo.latitude !== false && photo.longitude !== false) {
        photoMicropub.properties.location = [
          `geo:${photo.latitude},${photo.longitude}`,
        ]
      }

      const photoPromise = api('photo', {
        micropub: photoMicropub,
        user: user,
      })
      photoPromises.push(photoPromise)
    })

    Promise.all(photoPromises).then(photoPosts => {
      // All photos are posted, now to make the gallery post
      let urls = []
      photoPosts.forEach(photoPost => {
        urls.push(photoPost.url)
      })

      let galleryMicropub = {
        type: ['h-entry'],
        properties: {
          category: ['gallery'],
          collection: urls,
        },
        children: urls,
      }

      if (gallery.name) {
        galleryMicropub.properties.name = [gallery.name]
      }
      if (gallery.content) {
        galleryMicropub.properties.content = [gallery.content]
      }
      if (gallery.slug) {
        galleryMicropub.properties['mp-slug'] = [gallery.slug]
      }

      api('gallery', {
        micropub: galleryMicropub,
        user: user,
      })
        .then(
          galleryPost =>
            galleryPost.url ? fulfill(galleryPost.url) : reject(galleryPost)
        )
        .catch(err => reject(err))
    })
  })
}
