import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Routine from './Routine';
import './RoutineCreator.css';
import Api from '../../api'

export default class RoutineCreator extends Component {
  constructor(props) {
    super(props)
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

  render() {
    return this.state.exercisesList ?
      (
        <div>
          <Routine type='simple' style={{width: '100%'}} exercisesList={this.state.exercisesList} user={this.props.user}/>
        </div>
      ) : (
        <p>Loading exercises</p>
      )
  }
}
