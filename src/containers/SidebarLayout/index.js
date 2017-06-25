import React, { Component } from 'react';
import Sidebar from '../Sidebar';
import './SidebarLayout.css'

class SidebarLayout extends Component {

  render() {
    return (
      <main className="centered">
        <div className="main-area">
          <Sidebar />
          <div id="content">
            {this.props.children}
          </div>
        </div>
      </main>
    )
  }

}

export default SidebarLayout
