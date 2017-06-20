import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { loginUser, formChange } from '../actions';

// TODO: Save the state of the form, and update with response from API call...
// TODO: Protect password!

const Login = ({ username_field, password_field, attemptLogin, handleFieldChange }) => {
    let username;
    let password;

    return (
        <form>
            <label>
                Username:
                <input type="text"
                    value={username_field}
                    ref={node => {username = node;}}
                    onChange={() => handleFieldChange({
                        field: 'USERNAME',
                        value: username.value
                    })}
                />
            </label>
            <label>
                Password:
                <input type="password"
                    value={password_field}
                    ref={node => {password = node;}}
                    onChange={() => handleFieldChange({
                        field: 'PASSWORD',
                        value: password.value
                    })}
                />
            </label>
            <input type="button" onClick={() => attemptLogin({'username': username.value, 'password': password.value})} value="Login" />
        </form>
    );
};

Login.propTypes = {
    username_field: PropTypes.string,
    password_field: PropTypes.string,
    attemptLogin: PropTypes.func,
    handleFieldChange: PropTypes.func,
};


const mapStateToProps = (state) => {
    return {
        username_field: state.loginForm.username,
        password_field: state.loginForm.password
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        attemptLogin: request => dispatch(loginUser(request)),
        handleFieldChange: change => dispatch(formChange(change)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
