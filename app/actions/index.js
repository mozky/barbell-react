import * as types from '../types';

export function filterTable(filter) {
    return {
        type: types.FILTER,
        filter
    };
}

export function loginUser(user) {
    return {
        type: types.USER_LOGIN,
        payload: { user }
    };
}
