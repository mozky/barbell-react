import PropTypes from 'prop-types';
import React from 'react';
import {Provider} from 'react-redux';
import {Route} from 'react-router';
import {ConnectedRouter} from 'react-router-redux';

import App from '../components/App';
import DevTools from './DevTools';

export default function Root({store, history}) {
    return (
        <Provider store={store}>
            <div>
                <ConnectedRouter history={history}>
                    <div>
                        <Route path="/" component={App}/>
                    </div>
                </ConnectedRouter>
                <DevTools />
            </div>
        </Provider>
    );
}


Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};
