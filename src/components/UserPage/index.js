import React, { Component } from 'react';

class UserPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      routeParam: props.match.params.username
    }
  }

  render() {
    return(
      <h3>TODO: Validate if user <strong>{this.state.routeParam}</strong> exists...</h3>
    );
  }
}

export default UserPage;
