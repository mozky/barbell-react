import React, { Component } from 'react';
import UserStats from '../../components/UserStats';

class Sidebar extends Component {
  render() {
    return (
      <aside id="sidebar">
        <UserStats />
        <br/>
        <h4>TODO: Add links...</h4>
      </aside>
    )
  }
}

export default Sidebar
