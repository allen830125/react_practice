import React, { Component } from 'react'
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router'
import store from './store';
// import ShoppingCart from './components/ShoppingCart';
// import TodoList from './components/TodoList';

const ShoppingCart = (location, cb) => {
    import('./components/ShoppingCart')
    .then(module => {
        cb(null, module.default)
    });
};

const TodoList = (location, cb) => {
    import('./components/TodoList')
    .then(module => {
        cb(null, module.default)
    });
};

const Calculator = (location, cb)=>{
    import('./components/Calculator')
    .then(module => {
        cb(null, module.default)
    });    
}

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
                    <Route path="shoppingCart" getComponent={ShoppingCart}></Route>
                    <Route path="todoList" getComponent={TodoList}></Route>
                    <Route path="calculator" getComponent={Calculator}></Route>
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

