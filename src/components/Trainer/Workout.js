import React, { Component } from 'react'
import Countdown from './Countdown'

export default class Workout extends Component {
  constructor(props) {
    super(props)
    if (this.props.routine.data.exercises[0]) {
      this.state = {
        currentExercise: 0
      }
    }
    this.nextExercise = this.nextExercise.bind(this)
    this.hasNextExercise = this.hasNextExercise.bind(this)
  }

  nextExercise() {
    if (this.hasNextExercise()) {
      this.setState({
        currentExercise: this.state.currentExercise + 1
      })
    }
  }

  hasNextExercise() {
    return this.props.routine.data.exercises[this.state.currentExercise + 1]
  }

  render() {
    const exercise = this.props.routine.data.exercises[this.state.currentExercise]

    let Exercise
    switch (exercise.type) {
      case "time":
        Exercise = (
          <Countdown time={exercise.data.time} />
        )
        break
      default:
        Exercise = (
          <div>
            TODO: Create handler for this exercise type...
          </div>
        )
    }

    let Actions
    if (this.hasNextExercise()) {
      Actions = (
        <button onClick={this.nextExercise}>Next exercise..</button>
      )
    } else {
      Actions = (
        <button>END WORKOUT</button>
      )
    }

    return (
      <div>
        <h2>{exercise.name}</h2>
        { Exercise }
        { Actions }
      </div>
    )
  }
}
