import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Api from '../../api';

// TODO: Currently this calls the api and rendirects to 404 if no user found..
// This should be done on a container, so we dont validate anything HERE

class UserPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      urlParam: props.match.params.username,
    }
  }

  componentDidMount() {
    Api.userGet(this.state.urlParam).then((response) => {
      let user = 'null'
      if (JSON.parse(response)) {
        user = response
      }
      this.setState({
        user: user
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  render() {
    if (this.state.user === 'null') {
      return ( <Redirect to={{
        pathname: '/app/404',
        state: { referrer: this.props.location }
      }}/>)
    } else {
      return(
        <h3>Hi {this.state.user}</h3>
      );
    }


  }
}

export default UserPage;
