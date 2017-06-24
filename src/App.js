import React, { Component } from 'react';
import Authenticate from './Authenticate';
import Header from './Header';
import MainArea from './MainArea';
import Footer from './Footer';
import Card from './Card';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.loadApp = this.loadApp.bind(this);
    this.state = {
      isLoggedIn: false,
      user: {
        username: 'Moz',
        isAdmin: false
      }
    };
  }

  loadApp () {
    console.log('Loading app...');
    this.setState({isLoggedIn: true});
  }

  render() {
      if (this.state.isLoggedIn) {
        return (
          <div className="App">
            <Header user={this.state.user} />
            <MainArea>
              <Card />
            </MainArea>
            <Footer />
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
