import React, { Component } from 'react'

export default class Exercise extends Component {

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    const exercise = this.props.exercise

    if (exercise.data) {
      const fieldsItems = Object.entries(exercise.data).map(([key, val]) => {
        return (<span key={key}><span style={{fontWeight: "bold"}}>{this.capitalize(key)}</span>: {val} </span>)
      });

      return (
        <div><span style={{fontWeight: "bolder"}}>{exercise.name}</span> - {fieldsItems}</div>
      )

    } else {
      return (
        <span style={{fontWeight: "bolder"}}>{exercise.name}</span>
      )
    }

  }
}
