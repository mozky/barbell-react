import * as types from '../types';

export function filterTable(filter) {
    return {
        type: types.FILTER,
        filter
    };
}

export function loginUser(request) {
    return {
        type: types.USER_LOGIN,
        request
    };
}

export function formChange(change) {
    return {
        type: types['LOGIN_FORM_'  + change.field + '_CHANGE'],
        value: change.value
    }
}
