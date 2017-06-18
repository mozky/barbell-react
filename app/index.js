import React from 'react';
import { render } from 'react-dom';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import { AppContainer } from 'react-hot-loader';

const store = configureStore();

console.log('History', history);
console.log('Store', store);

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
