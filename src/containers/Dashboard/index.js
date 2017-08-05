import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { AdminRoute, PropsRoute } from '../Helpers';
import UserPage from '../../components/UserPage';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Calendar from '../../containers/Calendar';
import Exercises from '../../components/Exercises';
import SidebarLayout from '../SidebarLayout';
import About from '../../components/About';
import RoutineCreator from '../../components/RoutineCreator';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      layout: 'SidebarLayout'
    }
  }

  render() {
    const routes = (
        <div style={{width: '100%'}}>
          <PropsRoute exact path={this.props.match.url} component={Calendar} user={this.props.user} />
          <Route exact path={`${this.props.match.url}/404`} render={() => <div>TODO: 404 page</div>} />
          <Route exact path={`${this.props.match.url}/about`} component={About}/>
          <Route exact path={`${this.props.match.url}/user/:username`} component={UserPage}/>
          <PropsRoute exact path={`${this.props.match.url}/new`} component={RoutineCreator} user={this.props.user} />
          <AdminRoute exact path={`${this.props.match.url}/exercises`}
            component={Exercises}
            redirectTo={"/app"}
            isAdmin={this.props.admin}
          />
        </div>
    );

    switch (this.state.layout) {
      case 'SidebarLayout':
        return (
          <div className="app dashboard">
            <Header username={this.props.user.username} handleLogout={this.props.handleLogout} />
            <SidebarLayout username={this.props.user.username} isAdmin={this.props.admin}>
              {routes}
            </SidebarLayout>
            <Footer />
          </div>
        );
      case 'FullWidthLayout':
        return (
          <div className="app dashboard">
            <Header username={this.props.user.username} handleLogout={this.props.handleLogout} />
            <main className="centered">
              <div className="main-area">
              {routes}
              </div>
            </main>
            <Footer />
          </div>
        );
      default:
        return (
          <div className="app dashboard">
            <h1>Layout error</h1>
          </div>
        );
    }
  }
}

export default Dashboard
