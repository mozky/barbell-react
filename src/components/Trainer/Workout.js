import React, { Component } from 'react'
import WorkoutSummary from './WorkoutSummary'
import update from 'immutability-helper'
import Countdown from './Countdown'
import Api from '../../api'

export default class Workout extends Component {
  constructor(props) {
    super(props)
    this.handleExerciseSave = this.handleExerciseSave.bind(this)
    this.hasNextExercise = this.hasNextExercise.bind(this)
    this.nextExercise = this.nextExercise.bind(this)
    this.saveWorkout = this.saveWorkout.bind(this)
    if (this.props.routine.data.exercises[0]) {
      this.state = {
        currentExercise: 0,
        workoutData: [],
        workoutFinished: false
      }
    }
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

  handleExerciseSave(data) {
    this.setState(update(this.state, {
      workoutData: {
        $push: [data]
      }
    }))
  }

  saveWorkout() {
    const request = {
      userId: this.props.userId,
      routineId: this.props.routine._id,
      recordData: this.state.workoutData,
      date: new Date()
    }
    Api.recordPost(request).then((response) => {
      console.log(response)
    }).catch((err) => {
      console.log(err)
    })

  }

  render() {
    const exercise = this.props.routine.data.exercises[this.state.currentExercise]

    let Exercise
    if (exercise.recordFields.indexOf("time") > -1) {
        Exercise = (
          <Countdown exercise={exercise} time={exercise.data.time} saveExerciseData={this.handleExerciseSave}/>
        )
    } else {
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
        <button onClick={() => this.setState({workoutFinished: true})}>WORKOUT SUMMARY</button>
      )
    }

    if (this.state.workoutFinished) {
      return (
        <div>
          <WorkoutSummary routine={this.props.routine} workoutData={this.state.workoutData}/>
          <button onClick={this.saveWorkout}>Save</button>
        </div>
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
