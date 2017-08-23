import React, { Component } from 'react'

export default class RepsExercise extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: 'new',
      currentSet: 0
    }
    this.nextSet = this.nextSet.bind(this)
  }

  nextSet() {
    if (this.state.currentSet < this.props.exercise.data.sets) {
      this.setState({
        status: 'active',
        currentSet: this.state.currentSet + 1
      })
    } else {
      this.setState({
        status: 'finished'
      })
    }
  }

  componentWillUnmount() {
    this.props.saveExerciseData({
      id: this.props.exercise.id,
      name: this.props.exercise.name,
      sets: this.props.currentSet,
    })
  }

  render() {
    const status = this.state.status
    const exercise = this.props.exercise
    switch (status) {
      case 'new':
        return (
          <div>
            <div>{exercise.data.sets} x {exercise.data.reps} @ {exercise.data.weight}</div>
            <button onClick={this.nextSet}>Go!</button>
          </div>
        )
      case 'active':
        return (
          <div>
            <div>Set {this.state.currentSet} of {exercise.data.sets}</div>
            <button onClick={this.nextSet}>Next Set</button>
          </div>
        )
      case 'finished':
        return (
          <div>
            <div>Done</div>
          </div>
        )
      default:
        return (
          <div>Oops</div>
        )
    }
  }
}
