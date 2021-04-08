import React from 'react'
import { useSelector } from 'react-redux'
import SortableGrid from './SortableGrid'
import StandardList from './StandardList'
import '../../styles/order-grid.css'

const PhotoList = () => {
  const { photos, orderGrid } = useSelector((state) => ({
    photos: state.photos.toJS(),
    orderGrid: state.app.get('orderGridShown'),
  }))

  return orderGrid ? (
    <SortableGrid photos={photos} />
  ) : (
    <StandardList photos={photos} />
  )
}

export default PhotoList
