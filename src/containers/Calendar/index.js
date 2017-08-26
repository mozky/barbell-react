import RoutineCreator from '../../components/RoutineCreator'
import RoutineViewer from '../../components/RoutineViewer'
import img from '../../images/background.png'
import moment from 'moment'
import React, { Component } from 'react'
import Card from '../../components/Card'
import update from 'immutability-helper'
import { Link } from 'react-router-dom'
import Multimap from 'multimap'
import Api from '../../api'
import './Calendar.css'

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
    this.closeRoutineCreator = this.closeRoutineCreator.bind(this)
    this.state = {
      activeDay: moment().format('Y-MM-DD'),
      events: this.createEvents(this.props.user),
      creatingRoutine: false,
    }
  }

  createEvents(user) {
    let events = new Multimap()

    // Adds subscriptions to events
    if (user.subscriptions) {
      user.subscriptions.forEach(subscription => {
        events.set(
          subscription.date,
          {
            type: 'subscription',
            data: subscription
          }
        )
      })
    }

    return events
  }

  addDay() {
    const oldDate = this.state.activeDay
    this.updateDate(moment(oldDate).add(1, 'day'))
  }

  subtractDay() {
    const oldDate = this.state.activeDay
    this.updateDate(moment(oldDate).subtract(1, 'day'))
  }

  updateDate(newDate) {
    this.setState(update(this.state, {
      activeDay: {
        $set: newDate.format('Y-MM-DD')
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

  closeRoutineCreator() {
    this.setState(update(this.state, {
      creatingRoutine: {
        $set: false
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
      this.closeRoutineCreator()
    })
  }

  routineCreator() {
    return this.state.creatingRoutine ?
      (
        <div>
          <a onClick={this.closeRoutineCreator}>
            <i id="close_routine" className="fa fa-remove" aria-hidden="true"></i>
          </a>
          <RoutineCreator
            createSubscription={this.createSubscription}
            user={this.props.user} />
        </div>
      ) : (
        <a onClick={this.createRoutine}>
          <i id="new_routine" className="fa fa-calendar-plus-o" aria-hidden="true"></i>
          <p>Create new routine</p>
        </a>
      )
  }

  render() {
    const now = moment(this.state.activeDay)
    const date = now.date()
    const weekday = now.format('dddd')
    const monthYear = now.format('MMMM, Y')
    const leftArrow = <i className="fa fa-chevron-left" aria-hidden="true" onClick={this.subtractDay}></i>
    const rightArrow = <i className="fa fa-chevron-right" aria-hidden="true" onClick={this.addDay}></i>

    let content

    // Search the events multimap for events on the selected date
    if (this.state.events.has(now.format('Y-MM-DD'))) {
      content = this.state.events.get(now.format('Y-MM-DD')).map(event => {
        console.log(event)
        switch(event.type) {
          case 'subscription':
            // This subscription has a record attached, display de record
            if (event.data.record) {
                return (
                  <div className="centered faded" key={event.data.record._id}>
                    <h2>Record for {event.data.routine.name}</h2>
                    { JSON.stringify(event.data.record) }
                  </div>
                )
            }

            // No record found, displaying routine
            return (
              <div key={event.data._id}>
                <RoutineViewer subscription={event.data} activeDay={now}/>
                <Link to={"/app/trainer/" + event.data._id}><button>Start Routine</button></Link>
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
