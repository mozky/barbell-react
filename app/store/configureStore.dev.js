import createHistory from 'history/createBrowserHistory';
import { applyMiddleware, createStore, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

export const history = createHistory();
const routerMW = routerMiddleware(history);
export const sagaMW = createSagaMiddleware();
const middlewares = [routerMW, sagaMW];

export function configureStore(initialState) {

    return createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(
                ...middlewares
            ),
            DevTools.instrument()
        )
    );
}
