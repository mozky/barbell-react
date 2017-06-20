import { call, put, takeLatest, fork } from 'redux-saga/effects';
import * as types from '../types';
import Api from '../api';

function* loginUser(action) {
    try {
        const user = yield call(Api.login, action.request);
        yield put({type: types.USER_LOGIN_SUCCEEDED, user: user});
    } catch (e) {
        yield put({type: types.USER_LOGIN_FAILED, status: e});
    }
}

/*
  takeLatest:

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
export function* loginSaga() {
    yield console.log('Login saga')
    yield takeLatest(types.USER_LOGIN, loginUser);
}

export function* helloSaga() {
    yield console.log('Hello Sagas!');
}

const sagas = [
    loginSaga,
    helloSaga,
];

export default function* rootSaga() {
    yield sagas.map(saga => fork(saga));
}
