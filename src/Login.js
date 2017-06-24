import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as types from './types';

class Login extends Component {
  render() {
    return (
      <form className="login-form">
        <input type="text" placeholder="username"/>
        <input type="password" placeholder="password"/>
        <button onClick={this.props.handleSubmit}>
          Login
        </button>
        <p className="message">Not registered? <a title="Click to go to registration page" onClick={(e) => this.props.goTo(types.REGISTER, e)}>Create an account</a></p>
      </form>
    );
  }
}

Login.propTypes = {
  handleSubmit: PropTypes.func,
  goTo: PropTypes.func,
};

export default Login;
