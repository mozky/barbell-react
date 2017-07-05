import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import UserPage from '../../components/UserPage';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Card from '../../components/Card';
import SidebarLayout from '../SidebarLayout';
import About from '../../components/About';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      layout: 'SidebarLayout'
    }
  }

  render() {
    const routes = (
        <div>
          <Route exact path={this.props.match.url} component={Card}/>
          <Route exact path={`${this.props.match.url}/about`} component={About}/>
          <Route exact path={`${this.props.match.url}/user/:username`} component={UserPage}/>
        </div>
    );

    switch (this.state.layout) {
      case 'SidebarLayout':
        return (
          <div className="app dashboard">
            <Header username={this.props.user.username} handleLogout={this.props.handleLogout} />
            <SidebarLayout>
              {routes}
            </SidebarLayout>
            <Footer />
          </div>
        );
      case 'FullWidthLayout':
        return (
          <div className="app dashboard">
            <Header username={this.props.user.username} handleLogout={this.props.handleLogout} />
              {routes}
            <Footer />
          </div>
        );
      default:
        return (
          <div className="app dashboard">
            <h1>Layout error</h1>
          </div>
        );
    }
  }
}

export default Dashboard
