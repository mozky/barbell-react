import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as types from './types';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleUsernameChange(event) {
    event.preventDefault();
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event) {
    event.preventDefault();
    this.setState({password: event.target.value});
  }

  render() {
    return (
      <form className="login-form">
        <input type="text" placeholder="username" value={this.state.username} onChange={this.handleUsernameChange} />

        <input type="password" placeholder="password" value={this.state.password} onChange={this.handlePasswordChange}/>
        <button type="button" onClick={() => this.props.handleSubmit(this.state)}>
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
