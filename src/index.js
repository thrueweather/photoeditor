import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers/';

import './assets/index.css';
import App from './components/App';

const store = createStore(reducers,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const rootEl = document.getElementById('root');

const render = () => ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    rootEl
);
render();