import React, { Component } from 'react'
import RoutineSummary from './RoutineSummary'
import Workout from './Workout'
import Api from '../../api'

export default class Trainer extends Component {
  constructor(props) {
    super(props)
    this.startWorkout = this.startWorkout.bind(this)

    this.state = {
      workingOut: false,
      routineId: props.match.params.routineId,
      routine: {
        name: 'null',
        data: [],
        creator: 'null',
        category: 'null',
        type: 'null'
      }
    }
  }

  // TODO: Check if this is the logged in user page, so we can skip this query and change the page layout
  componentDidMount() {
    Api.routineGet(this.state.routineId).then((response) => {
      let routine = 'null'
      if (JSON.parse(response).routine) {
        routine = JSON.parse(response).routine
      }
      this.setState({
        routine: routine
      })
    }).catch((err) => {
      console.log(err)
    })
  }

  startWorkout() {
    this.setState({
      workingOut: true
    })
  }

  render() {
    if (this.state.routine.name === 'null') {
      return (
        <div>Loading routine...</div>
      )
    }

    if (!this.state.workingOut) {
      return (
        <div>
          <RoutineSummary routine={this.state.routine}/>
          <button onClick={this.startWorkout}>Start workout</button>
        </div>
      )
    } else {
        return (
          <Workout routine={this.state.routine} userId={this.props.userId}/>
        )
    }

  }
}
