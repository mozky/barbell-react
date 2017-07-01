import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Header.css';

class Header extends Component {

  render() {
    return (
      <header className="masthead clear">
        <div className="navbar area">
          <h1 className="brand">Barbell - Welcome {this.props.user.username}</h1>
          <nav id="navigation" className="list">
            <a className="item -link" onClick={() => this.props.handleLogout()}>Logout</a>
          </nav>
          <button data-collapse data-target="#navigation" className="toggle">
            <span className="icon"></span>
          </button>
        </div>
      </header>
    );
  }

}

Header.propTypes = {
  user: PropTypes.object,
  handleLogout: PropTypes.func
};

export default Header;
