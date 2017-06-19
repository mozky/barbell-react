// import { call, put, takeLatest } from 'redux-saga/effects'
import { put, takeLatest, fork } from 'redux-saga/effects';
import * as types from '../types';
// import Api from '...'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* loginUser(action) {
    try {
        // Here we call the api to do the login async
        // const user = yield call(Api.fetchUser, action.payload.userId);
        console.log('TODO: API login call...')
        const user = action.payload.user;
        yield put({type: types.USER_LOGIN_SUCCEEDED, user: user});
    } catch (e) {
        yield put({type: types.USER_LOGIN_FAILED, message: e.message});
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
