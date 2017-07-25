import React, { Component } from 'react'
import img from '../../images/background.png'
import Card from '../../components/Card'
import update from 'immutability-helper';

export default class Calendar extends Component {
  constructor(props) {
    super(props)
    this.addDay = this.addDay.bind(this)
    this.subtractDay = this.subtractDay.bind(this)
    this.updateDate = this.updateDate.bind(this)
    this.state = {
      activeDay: new Date(),
      events: []
    }
  }

  componentDidMount() {
    if (this.props.calendar) {
      console.log('TODO: Add events to calendar');
    } else {
      console.log('TODO: Make API call to get events for user');
    }
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

    return (
      <Card background={img} h1={ date } h2={ weekday } h3={ monthYear } left={leftArrow} right={rightArrow}>
        <h2>Whiskey</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum explicabo consequatur consectetur fugit molestias perferendis, sint error iste ut, facilis sunt natus optio dolor nesciunt laboriosam obcaecati corporis numquam.</p>
        <button type="button" onClick={() => {this.updateDate(new Date())} }>Today</button>
      </Card>
    )
  }
}
