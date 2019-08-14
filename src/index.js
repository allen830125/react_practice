import React from 'react';
import ReactDOM from 'react-dom';
// import { browserHistory, Router, Route, Link } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import './index.css';
import dealItem from './reducers';
import MyComponent from './App';
// import App from './App';
import * as serviceWorker from './serviceWorker';

const store = createStore(dealItem, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store={store}>
        <MyComponent></MyComponent>
    </Provider>,
    document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();