import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import Root from './containers/Root';
import { configureStore, history, sagaMW} from './store/configureStore';
import Sagas from './sagas';
import { AppContainer } from 'react-hot-loader';

const store = configureStore({
    isLoggedIn: false,
    user: {
        username: 'demo',
        isAdmin: false
    }
});

sagaMW.run(Sagas);

render(
    <AppContainer>
        <Root store={store} history={history} />
    </AppContainer>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept('./containers/Root', () => {
        const newConfigureStore = require('./store/configureStore');
        const newStore = newConfigureStore.configureStore();
        const newHistory = newConfigureStore.history;
        const NewRoot = require('./containers/Root').default;
        render(
            <AppContainer>
                <NewRoot store={newStore} history={newHistory} />
            </AppContainer>,
            document.getElementById('root')
        );
    });
}
