import React, { Component } from 'react'
import RoutineSummary from './RoutineSummary'
import Workout from './Workout'
import Api from '../../api'

export default class Trainer extends Component {
  constructor(props) {
    super(props)
    this.startWorkout = this.startWorkout.bind(this)

    this.subscriptionId = props.match.params.subscriptionId

    this.state = {
      workingOut: false,
      subscription: {
        routine: 'null',
        date: 'null',
        user: 'null'
      }
    }
  }

  // TODO: Check if this is the logged in user page, so we can skip this query and change the page layout
  componentDidMount() {
    Api.subscriptionGet(this.subscriptionId).then((response) => {
      let subscription = 'null'
      if (JSON.parse(response).subscription) {
        subscription = JSON.parse(response).subscription
      }
      this.setState({
        subscription: subscription
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
    const { routine, date }  = this.state.subscription

    if (routine === 'null') {
      return (
        <div>Loading...</div>
      )
    }

    if (!this.state.workingOut) {
      return (
        <div>
          <RoutineSummary routine={routine}/>
          <button onClick={this.startWorkout}>Start workout</button>
        </div>
      )
    } else {
        return (
          <Workout date={date} routine={routine} userId={this.props.user._id}/>
        )
    }

  }
}
