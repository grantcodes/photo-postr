import React from 'react'
import classnames from 'classnames'

const UploadZone = ({ children, inputProps, onFiles, className, ...props }) => {
  return (
    <div className={classnames('upload-zone', className)} {...props}>
      {children}
      <input
        type="file"
        className="upload-zone__input"
        onChange={(e) => {
          if (e.target.files && onFiles) {
            onFiles(e.target.files)
          }
        }}
        {...inputProps}
      />
    </div>
  )
}

export default UploadZone
