import React, { Component } from 'react'

export default class  RoutineSummary extends Component {
  render() {
    const { routine } = this.props
    const exercises = routine.data.exercises.map( exercise => {
      let fieldsItems = ''
      if (exercise.data) {
        fieldsItems = Object.entries(exercise.data).map(([key, val]) => {
          return (<span key={key}><span style={{fontWeight: "bold"}}>{key}</span>: {val} </span>)
        })
      }
      return (<div key={exercise.id}>{exercise.name} {fieldsItems}</div>)
    })
    return (
      <div id="routine-creator">
        <h2>{routine.name}</h2>
        {exercises}
      </div>
    )
  }
}
