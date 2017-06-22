import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { footer } from '../styles/footer.scss';
import { LoggedInRoutes, LoggedOutRoutes } from '../routes';
import { logout } from '../actions';


const App = ({ user, isLoggedIn, logout }) => {

    console.log('TODO: Use user information...', user)
    if (isLoggedIn) {
        return (
            <div>
                <h1>Barbell - Welcome! </h1>
                { LoggedInRoutes }
                <footer className={footer}>
                    <Link to="/">Home</Link>
                    <button type="button" onClick={() => logout()}>Logout</button>
                    <Link to="/about">About</Link>
                </footer>
            </div>
        );
    } else {
        return (
            <div>
                <h1>Barbell - Please log in</h1>
                { LoggedOutRoutes }
                <footer className={footer}>
                    <Link to="/">Home</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/about">About</Link>
                </footer>
            </div>
        );
    }
}

App.propTypes = {
    user: PropTypes.object,
    isLoggedIn: PropTypes.bool,
    logout: PropTypes.func,
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        isLoggedIn: state.isLoggedIn
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
