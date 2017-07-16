import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import flow from 'lodash/flow';
import Exercise from './Exercise';
import * as Types from '../../types';

const cardTarget = {
  drop() {
  },
};

class Routine extends Component {
  constructor(props) {
    super(props);
    this.moveExercise = this.moveExercise.bind(this);
    this.findExercise = this.findExercise.bind(this);
    this.addExercise = this.addExercise.bind(this);
    this.updateExercise = this.updateExercise.bind(this);
    this.handleNewExerciseChange = this.handleNewExerciseChange.bind(this);
    this.state = {
      newExercise: '',
      exercises: [{
        id: 1,
        name: 'Run',
        recordFields: ['time', 'intensity', 'inclination'],
        data: {}
      }, {
        id: 2,
        name: 'Bench Press',
        recordFields: ['sets', 'reps', 'weight'],
        data: {}
      }, {
        id: 3,
        name: 'Dumbbell Flyes',
        recordFields: ['sets', 'reps', 'weight'],
        data: {}
      }, {
        id: 4,
        name: 'Tricep Extension',
        recordFields: ['sets', 'reps', 'weight'],
        data: {}
      }],
    };
  }

  handleNewExerciseChange(event) {
    event.preventDefault();
    // Compare with exercises list to autocomplete and some dope shit
    this.setState(update(this.state, {
      newExercise: {
        $set: event.target.value
      }
    }));
  }

  addExercise() {
    this.setState(update(this.state, {
      exercises: {
        $push: [{
          id: this.state.exercises.length + 1,
          name: this.state.newExercise,
          recordFields: ['sets', 'reps', 'weight'],
          data: {}
        }]
      }
    }))
  }

  updateExercise(id, data) {
    const { exercise, index } = this.findExercise(id);
    console.log(id, data, exercise, index);
    // this.setState(update(this.state, {
    //   exercises: {
    //     set
    //   }
    // }))
  }

  moveExercise(id, atIndex) {
    const { exercise, index } = this.findExercise(id);
    this.setState(update(this.state, {
      exercises: {
        $splice: [
          [index, 1],
          [atIndex, 0, exercise],
        ],
      },
    }));
  }

  findExercise(id) {
    const { exercises } = this.state;
    const exercise = exercises.filter(c => c.id === id)[0];

    return {
      exercise,
      index: exercises.indexOf(exercise),
    };
  }

  render() {
    // const { type } = this.props.type;
    const { connectDropTarget } = this.props;
    const { exercises } = this.state;

    return connectDropTarget(
      <div style={{
        width: '100%',
        height: '50px'
      }}>
        {exercises.map(exercise => (
          <Exercise
            key={exercise.id}
            id={exercise.id}
            name={exercise.name}
            data={exercise.data}
            recordFields={exercise.recordFields}
            updateExercise={this.updateExercise}
            moveExercise={this.moveExercise}
            findExercise={this.findExercise}
          />
        ))}
        <input style={{width: '100%'}} type="text" placeholder="Search for a exercise" value={this.state.newExercise} onChange={this.handleNewExerciseChange} />
        <br />
        <button onClick={this.addExercise}>Add new!</button>
      </div>
    );
  }
}

Routine.propTypes = {
  type: PropTypes.string,
  connectDropTarget: PropTypes.func.isRequired,
};

// Until we have ES7 decorators, this way we can easily extend Routine with both functions
export default flow(
  DropTarget( Types.EXERCISE, cardTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
  })),
  DragDropContext(HTML5Backend)
)(Routine)
