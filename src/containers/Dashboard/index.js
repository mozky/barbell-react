import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import UserPage from '../../components/UserPage';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Card from '../../components/Card';
import SidebarLayout from '../SidebarLayout';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.sideBarLayout = this.sideBarLayout.bind(this);
  }

  fullWidthLayout(childElement) {
    return (
      <div className="app dashboard">
        <Header username={this.props.user.username} handleLogout={this.props.handleLogout} />
          {childElement}
        <Footer />
      </div>
    )
  }

  sideBarLayout(childElement) {
    return (
      <div className="app dashboard">
        <Header username={this.props.user.username} handleLogout={this.props.handleLogout} />
        <SidebarLayout>
          {childElement}
        </SidebarLayout>
        <Footer />
      </div>
    )
  }

  render() {
    return(
      <div>
        <Route exact path={this.props.match.url} component={() => this.sideBarLayout(<Card />)}/>
        <Route path={`${this.props.match.url}/:usernaM`} render={() => this.fullWidthLayout(<UserPage />)}/>
      </div>
    )
  }
}

export default Dashboard
