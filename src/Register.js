import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as types from './types';

class Register extends Component {
  render() {
    return (
      <form className="register-form">
        <input type="text" placeholder="username"/>
        <input type="password" placeholder="password"/>
        <input type="text" placeholder="email address"/>
        <button onClick={this.props.handleSubmit}>
          Register
        </button>
        <p className="message">Already registered? <a title="Click to go login page" onClick={(e) => this.props.goTo(types.LOGIN, e)} >Sign In</a></p>
      </form>
    );
  }
}

Register.propTypes = {
  handleSubmit: PropTypes.func,
  goTo: PropTypes.func,
};

export default Register;
