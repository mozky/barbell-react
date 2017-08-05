import React, { Component } from 'react'
import img from '../../images/background.png'
import Card from '../../components/Card'
import update from 'immutability-helper'
import Multimap from 'multimap'

export default class Calendar extends Component {
  constructor(props) {
    super(props)
    this.addDay = this.addDay.bind(this)
    this.subtractDay = this.subtractDay.bind(this)
    this.updateDate = this.updateDate.bind(this)
    this.createEvents = this.createEvents.bind(this)
    this.state = {
      activeDay: new Date(),
      events: this.createEvents(this.props.user),
    }
  }

  createEvents(user) {
    let events = new Multimap()

    // Adds records to events
    user.records.forEach(record => {
      events.set(new Date(record.date).toDateString(), record)
    })

    // Adds routines to events
    user.routines.forEach(routine => {
      // TODO: Change this to date that the routine will be done, maybe this needs to be other data ??OWN SUBSCRIPTION??
      events.set(new Date(routine.dateCreated).toDateString(), routine)
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
        return <div className="centered faded" key={event._id}>{ event.name }</div>
      })
    } else {
      content = (
        <div className="centered faded">
          <i id="new_routine" className="fa fa-calendar-plus-o" aria-hidden="true"></i>
          <p>Subscribe to a routine program or create your own.</p>
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
