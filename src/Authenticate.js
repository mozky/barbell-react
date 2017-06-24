import React, { Component } from 'react';
import logo from './logo.svg';
import Login from './Login';
import Register from './Register';
import * as types from './types';
import './Authenticate.css';

class Authenticate extends Component {

  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.changeTab = this.changeTab.bind(this);
    this.state = {
      activeTab: types.REGISTER
    };
  }

  handleLogin (e) {
    e.preventDefault();
    console.log('NYI: Handle Login')
  }

  handleRegister (e) {
    e.preventDefault();
    console.log('NYI: Handle Register');
  }

  changeTab (newTab, e) {
    e.preventDefault();
    console.log('changeTab:', newTab);

    this.setState({
      activeTab: newTab
    })
  }

  render() {

    let renderedTab;

    switch(this.state.activeTab) {
      case types.LOGIN:
        renderedTab = <Login handleSubmit={this.handleLogin} goTo={this.changeTab}/>;
        break;
      case types.REGISTER:
        renderedTab = <Register handleSubmit={this.handleRegister} goTo={this.changeTab}/>;
        break;
      default:
        renderedTab = <h1>Not found</h1>
    }

    return (
      <div className="login-page">
        <div className="form">
          <img src={logo} className="App-logo" alt="logo" />
          { renderedTab }
        </div>
      </div>
    );
  }
}

export default Authenticate;
