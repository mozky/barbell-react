import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';
import './Landing.css';

class Landing extends Component {
  render() {
    return(
      <div className="landing">
        <h1>Barbell</h1>
        <ul>
          <li><Link to="/auth">Authentication Page</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
        </ul>
      </div>
    )
  }
}

export default Landing
