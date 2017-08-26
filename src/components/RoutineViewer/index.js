import React, { Component } from 'react'
import Exercise from './Exercise'
import moment from 'moment'

export default class RoutineViewer extends Component {
  render() {
    const today = moment()
    const now = this.props.activeDay
    const subscription = this.props.subscription
    const routine = subscription.routine

    const exerciseItems = routine.data.exercises.map((exercise) =>
      <Exercise exercise={exercise} key={exercise.id} />
    );

    // Conditional render subscription based on date, to see if it is expired
    if (now.format('DD:MM:Y') === today.format('DD:MM:Y')) {
      return (
        <div className="centered faded" key={subscription._id}>
          <h2>GO WORKOUT {routine.name}</h2>
          { exerciseItems }
        </div>
      )
    } else if (now < today) {
      return (
        <div className="centered faded" key={subscription._id}>
          <h2>MISSED {routine.name}</h2>
          { exerciseItems }
        </div>
      )
    } else {
      return (
        <div className="centered faded" key={subscription._id}>
          <h2>{routine.name}</h2>
          { exerciseItems }
        </div>
      )
    }
  }
}
