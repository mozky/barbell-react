import React, { Component } from 'react'
import Exercise from './Exercise'

export default class RoutineViewer extends Component {
  render() {
    const today = new Date()
    const now = this.props.activeDay
    const subscription = this.props.subscription
    const routine = subscription.routine

    const exerciseItems = routine.data.exercises.map((exercise) =>
      <Exercise exercise={exercise} key={exercise.id} />
    );

    // Conditional render subscription based on date, to see if it is expired
    if (now.toDateString() === today.toDateString()) {
      return (
        <div className="centered faded" key={subscription._id}>
          <h2>GO WORKOUT {routine.name}</h2>
          { exerciseItems }
        </div>
      )
    } else if (now < today) {
      return (
        <div className="centered faded" key={subscription._id}>
          <h2>Missed subscription {routine.name}</h2>
          { exerciseItems }
        </div>
      )
    } else {
      return (
        <div className="centered faded" key={subscription._id}>
          <h2>Subscription {routine.name}</h2>
          { exerciseItems }
        </div>
      )
    }
  }
}
