import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Landing from '../../components/Landing';
import Dashboard from '../Dashboard';
import Authenticate from '../Authenticate';
import { PropsRoute, PrivateRoute } from '../Helpers';
import { ValidateToken } from '../../helpers';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.loadApp = this.loadApp.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

    let localToken;
    let userInfo;
    if (window.localStorage)
      localToken = window.localStorage.getItem('API_TOKEN');

      localToken ? (
        userInfo = ValidateToken(localToken)
      ) : (
        userInfo = false
      );

    this.state = {
      isLoggedIn: (userInfo ? true : false),
      user: (userInfo ? userInfo : 'null'),
    }

  }

  loadApp (user) {
    console.log('Loading app...');
    this.setState({
      isLoggedIn: true,
      user
    });
  }

  handleLogout () {

    window.localStorage.removeItem('API_TOKEN');

    this.setState({
      isLoggedIn: false,
      user: 'null'
    })
  }


  render() {

    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />

          <PropsRoute path="/auth" component={Authenticate}
            loadApp={this.loadApp} />

          <PrivateRoute path="/app" component={Dashboard}
            user={this.state.user}
            isLoggedIn={this.state.isLoggedIn}
            handleLogout={this.handleLogout} redirectTo="/auth" />

        </Switch>
      </Router>
    )
  }

}

export default App;
