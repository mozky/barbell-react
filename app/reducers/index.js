import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../types';

const filter = (state = '', action) => {
    switch (action.type) {
    case types.FILTER:
        return action.filter;
    default:
        return state;
    }
};

const loginForm = (state = '', action) => {
    switch (action.type) {
    case types.LOGIN_FORM_USERNAME_CHANGE:
        return Object.assign({}, state, {
            username: action.value
        })
    case types.LOGIN_FORM_PASSWORD_CHANGE:
        return Object.assign({}, state, {
            password: action.value
        })
    default:
        return state;
    }
};

const isLoggedIn = (state = '', action) => {
    switch(action.type) {
    case types.USER_LOGIN_SUCCEEDED:
        return true
    case types.LOGOUT:
        return false
    default:
        return state
    }
}

const user = (state = '', action) => {
    switch(action.type) {
    case types.USER_LOGIN_SUCCEEDED:
        return Object.assign({}, state, {
            username: action.user
        })
    default:
        return state
    }
}

const rootReducer = combineReducers({
    filter,
    loginForm,
    isLoggedIn,
    routing,
    user
});

export default rootReducer;
