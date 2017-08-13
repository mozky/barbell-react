import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import update from 'immutability-helper'
import Routine from './Routine';
import './RoutineCreator.css';
import Api from '../../api'

export default class RoutineCreator extends Component {
  constructor(props) {
    super(props)
    this.changeName = this.changeName.bind(this)
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

  changeName(newName) {
    this.setState(update(this.state, {
      name: {
        $set: newName
      }
    }))
  }

  saveRoutine(routine) {
    const request = {
      username: this.props.user.username,
      userId: this.props.user._id,
      type: 'simple',
      routine,
    }

    if (this.state.name) {
      request.name = this.state.name
    }

    console.log(request);

    Api.routinePost(request).then((response) => {
      console.log(response)
      const routineResponse = JSON.parse(response)

      if (!routineResponse || routineResponse.code !== 200 || !routineResponse.body || !routineResponse.body._id)
        console.log('Error creation routine')

      // Trigggering create subscription if it exists as prop
      if (this.props.createSubscription) {
        this.props.createSubscription(routineResponse.body._id)
      }

    }).catch((err) => {
      console.log(err)
    })
  }

  render() {
    return this.state.exercisesList ?
      (
        <div>
          <input type="text" onChange={(e) => this.changeName(e.target.value)} placeholder="set a name..." value={this.state.name}></input>
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
