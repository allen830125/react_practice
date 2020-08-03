import { combineReducers } from 'redux';
import shoppingCart from './shoppingCartr';
import items from './todoListr';
import calculator from './calculator';

export default combineReducers({
    items,
    shoppingCart,
    calculator
});