import React, { Component } from 'react';
import Exercise from '../../classes/exercise';
import Api from '../../api';

class Exercises extends Component {
  constructor(props) {
    super(props)
    this.state = {
      exercises: 'null'
    }
  }

  componentWillMount() {
    Api.exerciseListGet().then((response) => {
      let exercises = [];
      JSON.parse(response).forEach(function(exercise) {
        exercises.push(new Exercise(exercise));
      });
      this.setState({exercises})
    }).catch((err) => {
      console.log(err);
    })
  }

  createExercisesCards() {
    if (this.state.exercises === 'null')
      return ''

    return this.state.exercises.map((exercise) =>
      <li key={exercise.getName()}>{exercise.getName()}</li>
    );

  }

  render() {

    const exercisesList = this.createExercisesCards();

    return (
      <div>
        <h2>ADMIN - Exercises</h2>
        <ul>
          { exercisesList }
        </ul>
      </div>
    )
  }
}

export default Exercises
