import React, { Component } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Card from '../../components/Card';
import SidebarLayout from '../SidebarLayout';
import Authenticate from '../Authenticate';
import { ValidateToken } from '../../helpers';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.loadApp = this.loadApp.bind(this);

    let localToken;
    if (!window.localStorage)
      localToken = window.localStorage.getItem('API_TOKEN');

    let userInfo = ValidateToken(localToken);

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

  render() {
      if (this.state && this.state.isLoggedIn) {
        return (
          <div className="App">
            <Header user={this.state.user} />
            <SidebarLayout>
              <Card />
            </SidebarLayout>
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
