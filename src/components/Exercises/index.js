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

    // IS THIS NEEDED?
    this.handleNewExercise = this.handleNewExercise.bind(this);

  }

  componentWillMount() {
    let that = this
    let source = 'null'

    try {
      source = Api.exerciseSubscribe();

      source.onmessage = function(rawEvent) {
        // Maybe use a event class
        const event = JSON.parse(rawEvent.data);
        switch(event.type) {
          case 'add':
          that.handleNewExercise(event.obj)
          break
          case 'update':
          that.handleUpdateExercise(event.obj)
          break
          case 'delete':
          that.handleDeleteExercise(event.obj._id)
          break
          default:
          console.log('unknown event type', event);
        }
      }
    } catch (err) {
      console.log('Error connecting to API: ', err)
    }

    Api.exerciseListGet().then((response) => {
      let exercises = [];
      JSON.parse(response).forEach(function(exercise) {
        exercises.push(new Exercise(exercise));
      });
      this.setState({
        exercises,
        source
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  componentWillUnmount() {
    // Closing SSE connection
    if (this.state.source !== 'null')
      this.state.source.close()
  }

  handleNewExercise(exercise) {
    const currentExercises = this.state.exercises;
    currentExercises.push(new Exercise(exercise))
    this.setState({
      exercises: currentExercises
    })
  }

  handleUpdateExercise(updatedExercise) {
    let currentExercises = this.state.exercises
    currentExercises = currentExercises.map(function(ex) {
      if (ex.get_Id() === updatedExercise._id) {
        return new Exercise(updatedExercise)
      }
      return ex
    })
    this.setState({
      exercises: currentExercises
    })
  }

  handleDeleteExercise(exerciseId) {
    let currentExercises = this.state.exercises;
    currentExercises = currentExercises.filter(function(ex){
      return ex.get_Id() !== exerciseId;
    })
    this.setState({
      exercises: currentExercises
    })
  }

  createExercisesRows() {
    if (this.state.exercises === 'null')
      return ''
    return this.state.exercises.map((exercise) => {
      return (
        <tr key={exercise.get_Id()}>
          <td data-label="_id">{exercise.get_Id()}</td>
          <td data-label="id"
            onClick={(e) => {
              e.target.contentEditable = true;
              e.target.focus();
            }}
            onBlur={(e) => {
              e.target.removeAttribute("contentEditable");
              this.updateExercise(exercise.get_Id(), e)
            }}>
            {exercise.getId()}
          </td>
          <td data-label="Name"
            onClick={(e) => {
              e.target.contentEditable = true;
              e.target.focus();
            }}
            onBlur={(e) => {
              e.target.removeAttribute("contentEditable")
              this.updateExercise(exercise.get_Id(), e)
            }}>
            {exercise.getName()}
          </td>
          <td>
            <button className="delete_button"
              onClick={() => this.deleteExercise(exercise.get_Id())}>
              Delete
            </button>
          </td>
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

  updateExercise(exerciseId, event) {
    const value = event.target.innerHTML
    const property = event.target.getAttribute("data-label").toLowerCase()

    // Maps the object and when found compares the value to see if there are any
    // changes, if changes are found, the update call is made to the server

    this.state.exercises.map((ex) => {
      if (ex.get_Id() === exerciseId) {
        if (ex[property] !== value) {
          console.log('property changed update required', ex[property]);
          Api.exercisePatch(exerciseId, {
            [property]: value
          }).then((response) => {
            console.log(response)
          }).catch((error) => {
            console.log('Error!', error);
          })
        }
      }
      return ex
    })

  }

  deleteExercise(exerciseId) {
    Api.exerciseDelete(exerciseId).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log('Error!', error)
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
              <th scope="col">id</th>
              <th scope="col">Name</th>
              <th scope="col">Actions</th>
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
