import React, { Component } from 'react';
import Exercise from '../../classes/exercise';
import Api from '../../api';
import './Exercises.css';

class Exercises extends Component {
  constructor(props) {
    super(props)
    this.state = {
      exercises: 'null',
      source: 'null'
    }

    this.handleNewExercise = this.handleNewExercise.bind(this);

  }

  componentWillMount() {
    const source = new EventSource("http://localhost:10010/exerciseUpdates");

    let that = this;

    source.onmessage = function(rawEvent) {
      // Maybe use a event class
      const event = JSON.parse(rawEvent.data);
      switch(event.type) {
        case 'add':
          that.handleNewExercise(event.obj)
          break
        default:
          console.log('unknown event type', event);
      }
    }

    Api.exerciseListGet().then((response) => {
      let exercises = [];
      JSON.parse(response).forEach(function(exercise) {
        exercises.push(new Exercise(exercise));
      });
      this.setState({exercises, source})
    }).catch((err) => {
      console.log(err);
    })
  }

  componentWillUnmount() {
    console.log('component will unmount')
    this.state.source.close()
  }

  handleNewExercise(exercise) {
    const currentExercises = this.state.exercises;
    currentExercises.push(new Exercise(exercise))
    this.setState({
      exercises: currentExercises
    })
  }

  createExercisesRows() {
    if (this.state.exercises === 'null')
      return ''
    return this.state.exercises.map((exercise) => {
      return (
        <tr key={exercise.getId()}>
          <td data-label="_id">{exercise.getId()}</td>
          <td data-label="Name">{exercise.getName()}</td>
        </tr>
      );
    });
  }

  addExercise() {
    const id = this.idInput.value
    const name = this.nameInput.value
    Api.exercisePost({id, name}).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log('Error!', error);
    })
  }

  render() {

    const exercisesRows = this.createExercisesRows();

    return (
      <div>
        <h2>ADMIN - Exercises</h2>
        <br/>
        <div className="inline_form">
          <input placeholder="id" type="text" ref={(input) => { this.idInput = input; }}/>
          <input placeholder="Name" type="text" ref={(input) => { this.nameInput = input; }}/>
          <button className="add_button" onClick={() => this.addExercise()}>Add Exercise</button>
        </div>
        <br/>
        <table>
          <thead>
            <tr>
              <th scope="col">_id</th>
              <th scope="col">Name</th>
            </tr>
          </thead>
          <tbody>
            { exercisesRows }
          </tbody>
        </table>
      </div>
    )
  }
}

export default Exercises
