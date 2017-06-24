import React, { Component } from 'react';
import Authenticate from './Authenticate';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.loadApp = this.loadApp.bind(this);
    this.state = {
      isLoggedIn: false
    };
  }

  loadApp () {
    this.setState({isLoggedIn: true});
  }

  render() {
      if (this.state.isLoggedIn) {
        return (
          <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Welcome to React</h2>
            </div>
            <p className="App-intro">
              To get started, edit <code>src/App.js</code> and save to reload.
            </p>
          </div>
        );
      } else {
        return (
          <div className="App">
            <Authenticate loadApp={this.loadApp}/>
          </div>
        )
      }
  }
}

export default App;
