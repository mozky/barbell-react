import React, { Component } from 'react';
import './UserStats.css'

class UserStats extends Component {
  render() {

    const user = this.props.user

    return (
      <div className="portfoliocard">
        <div className="coverphoto"></div>
          <div className="profile_picture"></div>
          <div className="left_col">
            <div className="followers">
              <div className="follow_count">{user.routines ? user.routines.length : 0}</div>
              {(user.routines && user.routines.length === 1) ? 'Routine' : 'Routines'}
            </div>
            <div className="following">
              <div className="follow_count">{user.records ? user.records.length : 0}</div>
              {(user.records && user.records.length === 1) ? 'Record' : 'Records'}
            </div>
          </div>
          <div className="right_col">
            <h2 className="name">{ (user.profile && user.profile.name) ? user.profile.name : user.username}</h2>
            <h3 className="location">San Francisco, CA</h3>
            <ul className="contact_information">
              <li className="work">CEO</li>
              <li className="website"><a className="nostyle">www.apple.com</a></li>
              <li className="mail">john.doe@apple.com</li>
              <li className="phone">1-(732)-757-2923</li>
              <li className="resume"><a className="nostyle">download resume</a></li>
            </ul>
          </div>
      </div>
    );
  }
}

export default UserStats;
