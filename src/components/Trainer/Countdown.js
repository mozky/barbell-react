import React, { Component } from 'react'
import moment from 'moment'

export default class Countdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      duration: moment.duration(this.props.time),
      status: "new"
    }
    this.tick = this.tick.bind(this)
    this.pauseCounter = this.pauseCounter.bind(this)
    this.startCounter = this.startCounter.bind(this)
  }

  tick() {
    if (this.state.status === 'running') {
      this.setState({
        secondsRemaining: this.state.duration.subtract(1, 'seconds')
      })
      if (this.state.duration <= 0) {
        clearInterval(this.ticker)
        this.setState({
          status: "finished"
        })
      }
    }
  }

  startCounter() {
    this.setState({
      status: 'running',
    })
    this.ticker = setInterval(this.tick, 1000)
  }

  pauseCounter() {
    this.setState({
      status: 'paused',
    })
    clearInterval(this.ticker)
  }

  componentWillUnmount() {
    clearInterval(this.ticker)
    // We send the data back to the main workout componentent
    console.log(moment.duration(this.props.time).subtract(this.state.duration))
    this.props.saveExerciseData({
      id: this.props.exercise.id,
      name: this.props.exercise.name,
      time: moment.duration(this.props.time).subtract(this.state.duration)._data
    })
  }

  render() {
    let buttonAction
    switch (this.state.status) {
      case "new":
        buttonAction = <button onClick={this.startCounter}>Start</button>
        break
      case "paused":
        buttonAction = <button onClick={this.startCounter}>Resume</button>
        break
      case "running":
        buttonAction = <button onClick={this.pauseCounter}>Pause</button>
        break
      case "finished":
        buttonAction = 'Finished!'
        break
      default:
        buttonAction = <div>Oops</div>
    }
    // Maybe use https://github.com/jsmreese/moment-duration-format to format moment.js durations
    return (
      <div>
        <div>
          { this.state.duration.hours() > 0 ? this.state.duration.hours() + ':' : ''}
          { this.state.duration.minutes() > 0 ? this.state.duration.minutes() + ':' : '00:'}
          { this.state.duration.seconds() > 0 ? this.state.duration.seconds() : '00'}
        </div>
        { buttonAction }
      </div>
    )
  }
}
