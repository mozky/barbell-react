import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Routine from './Routine';
import './RoutineCreator.css';
import Api from '../../api'

export default class RoutineCreator extends Component {
  constructor(props) {
    super(props)
    this.saveRoutine = this.saveRoutine.bind(this)
    this.state = {
      exercisesList: null
    }
  }

  componentDidMount() {
    Api.exerciseListGet().then((response) => {
      let exercisesList = [];
      JSON.parse(response).forEach(function(exercise) {
        exercisesList.push({
          value: exercise.id,
          label: exercise.name
        })
      });
      this.setState({
        exercisesList,
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  saveRoutine(routine) {
    const request = {
      username: this.props.user.username,
      userId: this.props.user._id,
      type: 'simple',
      routine,
    }

    console.log(request);

    Api.routinePost(request).then((response) => {
      console.log(response)
    }).catch((err) => {
      console.log(err)
    })
  }

  render() {
    return this.state.exercisesList ?
      (
        <div>
          <Routine type='simple' style={{width: '100%'}}
            exercisesList={this.state.exercisesList}
            saveRoutine={this.saveRoutine}
            user={this.props.user}/>
        </div>
      ) : (
        <p>Loading exercises</p>
      )
  }
}
