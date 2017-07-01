import React, { Component } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Card from '../../components/Card';
import SidebarLayout from '../SidebarLayout';

class Dashboard extends Component {

  render() {
    return(
      <div className="app dashboard">
        <Header user={this.props.user} handleLogout={this.props.handleLogout} />
        <SidebarLayout>
          <Card />
        </SidebarLayout>
        <Footer />
      </div>
    )
  }
}

export default Dashboard
