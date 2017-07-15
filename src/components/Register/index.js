import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Types from '../../types';

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  handleUsernameChange(event) {
    event.preventDefault();
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event) {
    event.preventDefault();
    this.setState({password: event.target.value});
  }

  handleEmailChange(event) {
    event.preventDefault();
    this.setState({email: event.target.value});
  }

  render() {
    return (
      <form className="register-form">
        <input type="text" placeholder="username" value={this.state.username} onChange={this.handleUsernameChange} />
        <input type="password" placeholder="password" value={this.state.password} onChange={this.handlePasswordChange}/>
        <input type="email" placeholder="email address" value={this.state.email} onChange={this.handleEmailChange}/>
        <button type="button" onClick={() => this.props.handleSubmit(this.state)}>
          Register
        </button>
        <p className="message">Already registered? <a title="Click to go login page" onClick={(e) => this.props.goTo(Types.LOGIN, e)}>Sign In</a></p>
      </form>
    );
  }
}

Register.propTypes = {
  handleSubmit: PropTypes.func,
  goTo: PropTypes.func,
};

export default Register;
