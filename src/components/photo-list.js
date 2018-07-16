import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Photo from './photo'
import { reorderPhotos } from '../actions'

class PhotoList extends Component {
  constructor(props) {
    super(props)
    this.onDragEnd = this.onDragEnd.bind(this)
  }

  onDragEnd(result) {
    if (!result.destination) {
      return
    }
    this.props.actions.reorderPhotos(
      result.source.index,
      result.destination.index
    )
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div ref={provided.innerRef}>
              {this.props.photos.map((photo, i) => (
                <Draggable key={photo.id} draggableId={photo.id}>
                  {(provided, snapshot) => (
                    <div>
                      <div
                        ref={provided.innerRef}
                        style={provided.draggableStyle}
                        {...provided.dragHandleProps}
                      >
                        <Photo
                          key={`photo-${i}`}
                          file={photo.file}
                          photo={photo}
                          dragging={snapshot.isDragging}
                        />
                      </div>
                      {provided.placeholder}
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    photos: state.photos.toJS(),
    user: state.user.toJS(),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        reorderPhotos: reorderPhotos,
      },
      dispatch
    ),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoList)
