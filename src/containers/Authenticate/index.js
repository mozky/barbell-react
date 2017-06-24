import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Register from '../../components/Register';
import Login from '../../components/Login';
import logo from '../../images/logo.svg';
import * as types from '../../types';
import Api from '../../api';
import './Authenticate.css';

class Authenticate extends Component {

  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.changeTab = this.changeTab.bind(this);
    this.state = {
      activeTab: types.LOGIN
    };
  }

  handleLogin (values) {
    console.log('NYI: Handle Login', values)
    Api.login(values).then((response) => {
      console.log('Login response!', response)
      this.props.loadApp()
    }).catch((error) => {
      console.log('Error!', error);
    })
  }

  handleRegister (values) {
    console.log('NYI: Handle Register', values);
    Api.register(values).then((response) => {
      console.log('Register response!', response)
      this.props.loadApp()
    }).catch((error) => {
      console.log('Error!', error);
    })
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

Authenticate.propTypes = {
  loadApp: PropTypes.func,
};

export default Authenticate;
