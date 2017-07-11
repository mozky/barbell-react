import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import UserStats from '../../components/UserStats';
import './Sidebar.css';

class Sidebar extends Component {

  render() {
    return (
      <aside id="sidebar">
        <UserStats />
        <br/>
        <ul id="side_menu">
          <NavLink exact to="/app" activeClassName="current">Home</NavLink>
          <br />
          <NavLink exact to={"/app/user/" + this.props.username} activeClassName="current">My Page</NavLink>
          <br />
          {this.props.isAdmin && <NavLink to="/app/exercises" activeClassName="current">Exercises</NavLink>}
        </ul>
      </aside>
    )
  }
}

export default Sidebar
