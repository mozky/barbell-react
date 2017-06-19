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

const rootReducer = combineReducers({
    filter,
    routing,
    isLoggedIn: (state = {}) => state,
    user: (state = {}) => state
});

export default rootReducer;
