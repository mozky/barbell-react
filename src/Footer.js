import React, { Component } from 'react';
import logo from './logo.svg';
import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <footer>
        <img src={logo} className="footer-logo" alt="logo" />
        <h2>Miel de Pollo - 2017</h2>
      </footer>
    )
  }
}

export default Footer
