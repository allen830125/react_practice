import React, { Component } from 'react'
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router'
import store from './store';
import ShoppingCart from './components/ShoppingCart';
import TodoList from './components/TodoList';

// const ShoppingCart = (location, cb) => {
//     require.ensure(
//         [],
//         require => {
//             cb(null, require('./components/ShoppingCart').default)
//         },
//         'shoppingCart'
//     )
// };

// const TodoList = (location, cb) => {
//     require.ensure(
//         [],
//         require => {
//             cb(null, require('./components/TodoList').default)
//         },
//         'shoppingCart'
//     )
// }

class App extends Component {
    render() {
        const getRoute = (store) => {
            return (
                <Route path="/">
                    <Route path="shoppingCart" component={ShoppingCart}></Route>
                    <Route path="todoList" component={TodoList}></Route>
                </Route>
            );
        }

        return (
            <Provider store={store}>
                <Router history={browserHistory}>{getRoute(store)}</Router>
            </Provider>
        )
    };

}

export default App;

