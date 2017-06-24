import React, { Component } from 'react';
import './SidebarLayout.css'

class SidebarLayout extends Component {

  render() {
    return (
      <main className="centered">
        <div className="main-area">
          <div id="side_bar">
            <h4>TODO: Sidebar</h4>
          </div>
          <div id="content">
            {this.props.children}
          </div>
        </div>
      </main>
    )
  }

}

export default SidebarLayout
