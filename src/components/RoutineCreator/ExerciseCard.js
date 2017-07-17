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
  width: '100%'
};

class ExerciseCard extends Component {

    render() {
      const { id, name, isDragging, connectDragSource, connectDropTarget, recordFields, data, updateExercise } = this.props;
      const opacity = isDragging ? 0 : 1;

      return connectDragSource(connectDropTarget(
        <div className="exercise" style={{ ...style, opacity }}>
          <i className="fa fa-bars fa-2x exercise_icon"></i>
          <span className="exercise_item">{name}</span>{recordFields.map(field => {
            return (
              <input type="text" className="exercise_item exercise_input"
                key={field}
                value={(data[field] || '')}
                placeholder={(data[field] || field)}
                onChange={(e) => {
                  updateExercise(id, field, e.target.value)
                }}
              />
            )
          })}
        </div>,
      ));
    }
}

ExerciseCard.PropTypes = {
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
)(ExerciseCard)
