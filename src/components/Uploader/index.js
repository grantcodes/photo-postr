import { useDispatch } from 'react-redux'
import { addPhoto } from '../../actions'
import moment from 'moment'
import { generate as generateId } from 'shortid'
import { Dropzone, Button } from '@grantcodes/ui'
import '../../styles/uploader.css'

const Uploader = () => {
  const dispatch = useDispatch()

  const handleFiles = (files) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      dispatch(
        addPhoto({
          id: generateId(),
          name: file.name,
          file: file,
          date: moment(),
          latitude: false,
          longitude: false,
          content: '',
        })
      )
    }
  }

  return (
    <Dropzone
      className="uploader"
      onFiles={handleFiles}
      accept=".jpg,.jpeg,.png,.gif,image/*"
      multiple
      fullscreenOnDrag
    >
      <Button asChild>
        <span className="uploader__button">
          Drag your photos here or click to select
        </span>
      </Button>
    </Dropzone>
  )
}

export default Uploader
