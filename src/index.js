import './polyfills'
import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';

import { HashRouter } from 'react-router-dom';
import './assets/base.scss';
import Main from './DemoPages/Main';
import configureStore from './redux/configureStore';
import { Provider } from 'react-redux';
import './config/axiosintercept';
import reportWebVitals from './reportWebVitals';
const store = configureStore();
const rootElement = document.getElementById('root');

const renderApp = Component => {
    ReactDOM.render(
        <Provider store={store}>
            <HashRouter>
                <Component />
            </HashRouter>
        </Provider>,
        rootElement
    );
};

renderApp(Main);

if (module.hot) {
    module.hot.accept('./DemoPages/Main', () => {
        const NextApp = require('./DemoPages/Main').default;
        renderApp(NextApp);
    });
}
serviceWorker.unregister();

// const express = require('express');
// const path = require('path');
// const app = express();

// app.use(express.static(__dirname)); //here is important thing - no static directory, because all static :)

// app.get("/*", function(req, res) {
//     res.sendFile(path.join(__dirname, "index.html"));
// });
reportWebVitals();