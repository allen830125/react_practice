import { combineReducers } from 'redux';
import shoppingCart from './shoppingCartr';
import items from './todoListr'

export default combineReducers({
    items,
    shoppingCart
});