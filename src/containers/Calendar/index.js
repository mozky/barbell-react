import React, { Component } from 'react'
import img from '../../images/background.png'
import Card from '../../components/Card'
import RoutineCreator from '../../components/RoutineCreator'
import update from 'immutability-helper'
import Api from '../../api'
import Multimap from 'multimap'

export default class Calendar extends Component {
  constructor(props) {
    super(props)
    this.addDay = this.addDay.bind(this)
    this.updateDate = this.updateDate.bind(this)
    this.subtractDay = this.subtractDay.bind(this)
    this.createEvents = this.createEvents.bind(this)
    this.createRoutine = this.createRoutine.bind(this)
    this.routineCreator = this.routineCreator.bind(this)
    this.createSubscription = this.createSubscription.bind(this)
    this.state = {
      activeDay: new Date(),
      events: this.createEvents(this.props.user),
      creatingRoutine: false,
    }
  }

  createEvents(user) {
    let events = new Multimap()

    // Adds records to events
    user.records.forEach(record => {
      events.set(
        new Date(record.date).toDateString(),
        {
          type: 'record',
          data: record
        }
      )
    })

    // Adds subscriptions to events
    user.subscriptions.forEach(subscription => {
      events.set(
        new Date(subscription.date).toDateString(),
        {
          type: 'subscription',
          data: subscription
        }
      )
    })
    return events
  }

  addDay() {
    const oldDate = this.state.activeDay;
    this.updateDate(new Date(oldDate.setDate(oldDate.getDate() + 1)))
  }

  subtractDay() {
    const oldDate = this.state.activeDay;
    this.updateDate(new Date(oldDate.setDate(oldDate.getDate() - 1)))
  }

  updateDate(newDate) {
    this.setState(update(this.state, {
      activeDay: {
        $set: newDate
      }
    }))
  }

  createRoutine() {
    this.setState(update(this.state, {
      creatingRoutine: {
        $set: true
      }
    }))
  }

  createSubscription(routineId) {
    Api.subscriptionPost({
      userId: this.props.user._id,
      routineId: routineId,
      subscriptionDate: this.state.activeDay
    }).then((response) => {
      console.log(response)
      const subscriptionResponse = JSON.parse(response)
      if (subscriptionResponse.code !== 200) {
        console.log('error creating subscription')
      }
    })
  }

  routineCreator() {
    return this.state.creatingRoutine ?
      (
        <RoutineCreator
          createSubscription={this.createSubscription}
          user={this.props.user} />
      ) : (
        <a onClick={this.createRoutine}>
          <i id="new_routine" className="fa fa-calendar-plus-o" aria-hidden="true"></i>
          <p>Create new routine</p>
        </a>
      )
  }

  render() {
    const now = this.state.activeDay
    const locale = "en-us"
    const date = now.getDate()
    const weekday = now.toLocaleString(locale, { weekday: "long" })
    const monthYear = `${now.toLocaleString(locale, { month: "long" })}, ${now.getFullYear()}`
    const leftArrow = <i className="fa fa-chevron-left" aria-hidden="true" onClick={this.subtractDay}></i>
    const rightArrow = <i className="fa fa-chevron-right" aria-hidden="true" onClick={this.addDay}></i>

    let content

    // Search the events multimap for events on the selected date
    if (this.state.events.has(now.toDateString())) {
      content = this.state.events.get(now.toDateString()).map(event => {
        switch(event.type) {
          case 'subscription':
            const subscription = event.data
            console.log(subscription)
            return (
              <div className="centered faded" key={subscription._id}>
                <h2>{subscription.routine.name}</h2>
                { JSON.stringify(subscription.routine) }
              </div>
            )
          case 'record':
            const record = event.data
            console.log(record)
            return (
              <div className="centered faded" key={record._id}>
                <h2>Record for {record.routine.name}</h2>
                { JSON.stringify(record) }
              </div>
            )
          default:
            return <h3>Unknown shit</h3>
        }
      })
    } else {
      content = (
        <div className="centered faded">
          { this.routineCreator() }
        </div>
      )
    }

    return (
      <Card background={img} h1={ date } h2={ weekday } h3={ monthYear } left={leftArrow} right={rightArrow}>
        { content }
        {/* <button type="button" onClick={() => {this.updateDate(new Date())} }>Today</button> */}
      </Card>
    )
  }
}
