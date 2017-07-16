import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';
import * as Types from '../../types';
import PropTypes from 'prop-types';

const exerciseSource = {
  beginDrag(props) {
    return {
      id: props.id,
      originalIndex: props.findExercise(props.id).index,
    };
  },

  endDrag(props, monitor) {
    const { id: droppedId, originalIndex } = monitor.getItem();
    const didDrop = monitor.didDrop();

    if (!didDrop) {
      props.moveExercise(droppedId, originalIndex);
    }
  },
};

const exerciseTarget = {
  canDrop() {
    return false;
  },

  hover(props, monitor) {
    const { id: draggedId } = monitor.getItem();
    const { id: overId } = props;

    if (draggedId !== overId) {
      const { index: overIndex } = props.findExercise(overId);
      props.moveExercise(draggedId, overIndex);
    }
  },
};

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
};

class Exercise extends Component {

    render() {
      const { id, name, isDragging, connectDragSource, connectDropTarget, recordFields, data, updateExercise } = this.props;
      const opacity = isDragging ? 0 : 1;

      // recordFields.map(field => {
      //
      // })

      return connectDragSource(connectDropTarget(
        <div style={{ ...style, opacity }}>
          {name} - {recordFields.map(field => {
            return (
              <span key={field}
                onClick={(e) => {
                  e.target.contentEditable = true;
                  e.target.focus();
                }}
                onBlur={(e) => {
                  e.target.removeAttribute("contentEditable");
                  updateExercise(id, e)
                }}>
                {' ' + (data.field || field) + ' '}
              </span>
            )
          })}
        </div>,
      ));
    }
}

Exercise.PropTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  id: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  data: PropTypes.object,
  recordFields: PropTypes.array.isRequired,
  updateExercise: PropTypes.func.isRequired,
  moveExercise: PropTypes.func.isRequired,
  findExercise: PropTypes.func.isRequired,
}

// Until we have ES7 decorators, this way we can easily extend Routine with both functions
export default flow(
  DropTarget(Types.EXERCISE, exerciseTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
  })),
  DragSource(Types.EXERCISE, exerciseSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }))
)(Exercise)
