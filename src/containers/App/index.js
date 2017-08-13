import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import Landing from '../../components/Landing'
import Dashboard from '../Dashboard'
import Authenticate from '../Authenticate'
import { PropsRoute, PrivateRoute } from '../Helpers'
import { ValidateToken } from '../../helpers'
import Api from '../../api'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.loadApp = this.loadApp.bind(this)
    this.getUserData = this.getUserData.bind(this)
    this.handleLogout = this.handleLogout.bind(this)

    let localToken
    let tokenData
    if (window.localStorage) {
      localToken = window.localStorage.getItem('API_TOKEN')
    }

    localToken ? (
      tokenData = ValidateToken(localToken)
    ) : (
      tokenData = false
    )

    this.state = {
      isLoggedIn: (tokenData ? true : false),
      token: (tokenData ? tokenData : 'null'),
      user: 'null'
    }

  }

  getUserData() {
    if ( this.state.token !== 'null' && this.state.token.username ) {
      Api.userGet(this.state.token.username).then((response) => {
        let user = 'null'
        if (JSON.parse(response).user) {
          user = JSON.parse(response).user
        }
        this.setState({
          user
        })
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  loadApp(token) {
    console.log('Loading app...')
    this.setState({
      isLoggedIn: true,
      token
    })
    this.getUserData()
  }

  handleLogout() {
    window.localStorage.removeItem('API_TOKEN')
    this.setState({
      isLoggedIn: false,
      token: 'null',
      user: 'null'
    })
  }

  componentDidMount() {
    this.getUserData()
  }

  render() {

    if (this.state.token && this.state.isLoggedIn && this.state.user === 'null') {
      return (
        <div>Fetching your data, please w8...</div>
      )
    } else {
      return (
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} />

            <PropsRoute path="/auth" component={Authenticate}
              loadApp={this.loadApp} />

            <PrivateRoute path="/app" component={Dashboard}
              user={this.state.user}
              admin={this.state.token.admin}
              isLoggedIn={this.state.isLoggedIn}
              handleLogout={this.handleLogout} redirectTo="/auth" />

          </Switch>
        </Router>
      )
    }

  }

}

export default App
