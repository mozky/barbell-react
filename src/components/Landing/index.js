import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Api from '../../api';
import './Landing.css';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiStatus: 'fetching'
    }
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.getApiStatus(),
      5000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  getApiStatus(values) {
    Api.health().then((response) => {
      console.log(response)
      this.setState({apiStatus: response});
    }).catch((error) => {
      this.setState({apiStatus: 'unreachable'});
      console.log('API health error', error);
    })
  }

  render() {
    return(
      <div className="landing">
        <h1>Barbell</h1>
        <Link to="/app"><div id="enter_button">Enter</div></Link>
        <h3>API Server: {this.state.apiStatus}</h3>
      </div>
    )
  }
}

export default Landing
