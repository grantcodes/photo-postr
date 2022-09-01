import { useDispatch } from 'react-redux'
import { Card, CardActions, Container, Button } from '@grantcodes/ui'
import Photo from '../Photo'
import { reorderPhotos, removePhoto, retryPhotoUpload } from '../../actions'

const PhotoList = ({ photos }) => {
  const dispatch = useDispatch()

  return (
    <Container align="wide" className="photo-list" noPad>
      {photos.map((photo, i) => (
        <Card key={`photo-${i}`}>
          <Photo file={photo.file} photo={photo} />
          <CardActions>
            <Button onClick={(e) => dispatch(removePhoto(photo.id))}>❌</Button>
            {photos.length > 1 && i > 0 && (
              <Button onClick={(e) => dispatch(reorderPhotos(i, i - 1))}>
                👆
              </Button>
            )}
            {photos.length > 1 && i < photos.length - 1 && (
              <Button onClick={(e) => dispatch(reorderPhotos(i, i + 1))}>
                👇
              </Button>
            )}
            {photo.error && (
              <Button onClick={(e) => dispatch(retryPhotoUpload(photo))}>
                Retry Upload
              </Button>
            )}
          </CardActions>
        </Card>
      ))}
    </Container>
  )
}

export default PhotoList
