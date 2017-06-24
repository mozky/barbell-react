import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Header.css';

class Header extends Component {

  render() {
    return (
      <header className="masthead clear">
        <div className="centered">
          <div className="site-branding">
            <h1 className="site-title">Barbell - Welcome {this.props.user.username}</h1>
          </div>
        </div>
      </header>
    );
  }

}

Header.propTypes = {
  user: PropTypes.object
};

export default Header;
