import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DropTarget, DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import update from 'immutability-helper'
import flow from 'lodash/flow'
import ExerciseCard from './ExerciseCard'
import SearchExercise from './SearchExercise'
import * as Types from '../../types'

const cardTarget = {
  drop() {
  },
}

class Routine extends Component {
  constructor(props) {
    super(props)
    this.moveExercise = this.moveExercise.bind(this)
    this.findExercise = this.findExercise.bind(this)
    this.updateExercise = this.updateExercise.bind(this)
    this.removeExercise = this.removeExercise.bind(this)
    this.handleNewExercise = this.handleNewExercise.bind(this)
    this.state = {
      // IDEA: Get exercises list by websocket live from server, for now, get full list
      exercises: [{
        id: 1,
        name: 'Run',
        recordFields: ['time', 'intensity', 'inclination'],
        data: {
          "time": "00:15:00.000",
          "intensity": "medium"
        }
      }, {
        id: 2,
        name: 'Bench Press',
        recordFields: ['sets', 'reps', 'weight'],
        data: {}
      }],
    }
  }


  handleNewExercise(selection) {
    this.setState(update(this.state, {
      exercises: {
        $push: [{
          id: this.state.exercises.length + 1,
          name: selection.label,
          recordFields: ['sets', 'reps', 'weight'],
          data: {}
        }]
      }
    }))
  }

  updateExercise(id, property, value) {
    const { exercise, index } = this.findExercise(id)

    this.setState(update(this.state, {
      exercises: {
        $splice: [
          [index, 1, update(exercise, {
            data: {
              $merge: {
                [property]: value
              }
            }
          })]
        ]
      }
    }))
  }

  moveExercise(id, atIndex) {
    const { exercise, index } = this.findExercise(id)
    this.setState(update(this.state, {
      exercises: {
        $splice: [
          [index, 1],
          [atIndex, 0, exercise],
        ],
      },
    }))
  }

  findExercise(id) {
    const { exercises } = this.state
    const exercise = exercises.filter(c => c.id === id)[0]

    return {
      exercise,
      index: exercises.indexOf(exercise),
    }
  }

  removeExercise(id) {
    const { index } = this.findExercise(id)
    this.setState(update(this.state, {
      exercises: {
        $splice: [
          [index, 1]
        ]
      }
    }))
  }

  render() {
    // const { type } = this.props.type
    const { connectDropTarget, exercisesList } = this.props
    const { exercises } = this.state

    return connectDropTarget(
      <div className='routine'>
        {exercises.map(exercise => (
          <ExerciseCard
            key={exercise.id}
            id={exercise.id}
            name={exercise.name}
            data={exercise.data}
            recordFields={exercise.recordFields}
            updateExercise={this.updateExercise}
            moveExercise={this.moveExercise}
            findExercise={this.findExercise}
            removeExercise={this.removeExercise}
          />
        ))}
        <SearchExercise
          id="add-exercise"
          handleChange={this.handleNewExercise}
          exercises={exercisesList}
        />
        <button id="save-routine-button" type="button" onClick={() => this.props.saveRoutine({"exercises":this.state.exercises})}>Save Routine</button>
      </div>
    )
  }
}

Routine.propTypes = {
  type: PropTypes.string,
  exercisesList: PropTypes.array.isRequired,
  saveRoutine: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
}

// Until we have ES7 decorators, this way we can easily extend Routine with both functions
export default flow(
  DropTarget( Types.EXERCISE, cardTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
  })),
  DragDropContext(HTML5Backend)
)(Routine)
