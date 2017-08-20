import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Api from '../../api'

// TODO: Currently this calls the api and rendirects to 404 if no user found..
// This should be done on a container, so we dont validate anything HERE

export default class UserPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      urlParam: props.match.params.username,
      user: {
        _id: 'null',
        username: 'null',
        email: 'null',
        profile: {},
        routines: [],
        records: [],
        subscriptions: []
      }
    }
  }

  // TODO: Check if this is the logged in user page, so we can skip this query and change the page layout
  componentDidMount() {
    Api.userGet(this.state.urlParam).then((response) => {
      let user = 'null'
      if (JSON.parse(response).user) {
        user = JSON.parse(response).user
      }
      this.setState({
        user: user
      })
    }).catch((err) => {
      console.log(err)
    })
  }

  render() {
    if (this.state.user === 'null') {
      return ( <Redirect to={{
        pathname: '/app/404',
        state: { referrer: this.props.location }
      }}/>)
    } else {
      const userRecords = this.state.user.records.map(record => {
        return (<li key={record._id}>{record.date}</li>)
      })

      const userRoutines = this.state.user.routines.map(routine => {
        return (<li key={routine._id}>{routine.name}</li>)
      })

      const userSubscriptions = this.state.user.subscriptions.map(subscription => {
        return (<li key={subscription._id}>{subscription.date}</li>)
      })

      return(
        <div>
          <h2>Hi {this.state.user.username}</h2>
          <h3 style={{"fontWeight": "bold"}}>Records</h3>
          <br></br>
          <ul>
            {userRecords}
          </ul>
          <br></br>
          <h3 style={{"fontWeight": "bold"}}>Subscriptions</h3>
          <br></br>
          <ul>
            {userSubscriptions}
          </ul>
          <br></br>
          <h3 style={{"fontWeight": "bold"}}>Routines</h3>
          <br></br>
          <ul>
            {userRoutines}
          </ul>
        </div>
      )
    }


  }
}
