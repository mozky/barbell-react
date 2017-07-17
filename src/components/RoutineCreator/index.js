import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Routine from './Routine';
import './RoutineCreator.css';

export default class RoutineCreator extends Component {
  render() {
    return (
      <div>
        <Routine type='simple' style={{width: '100%'}}/>
      </div>
    );
  }
}
