import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../actions';

const Login = ({ user, attemptLogin }) => {
    console.log('State user', user);
    let userHardCoded = 'moz';

    return (
        <div>
            <button onClick={() => attemptLogin(userHardCoded)}>
              Login
            </button>
        </div>
    );
};

Login.propTypes = {
    user: PropTypes.object,
    attemptLogin: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        attemptLogin: user => dispatch(loginUser(user))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
