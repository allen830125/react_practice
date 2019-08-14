import axios from 'axios';
import { SHOPPING_CART_ADD, SHOPPING_CART_DEL, SHOPPING_CART_INIT, SHOPPING_CART_SEARCH, SHOPPING_CART_PAGE } from './actionType';

export const onItemAdd = (item) => dispatch => {
    dispatch({ type: SHOPPING_CART_ADD, item });
};

export const onItemDel = (item) => dispatch => {
    dispatch({ type: SHOPPING_CART_DEL, item });
}

export const onSearchItem = (value) => dispatch => {
    dispatch({ type: SHOPPING_CART_SEARCH, search: value });
}

export const onInitItem = () => async dispatch => {
    let doApi = await axios.get('./pros-list.json');
    let apiData = doApi.data || [];
    dispatch({ type: SHOPPING_CART_INIT, product: apiData });
}

export const onPageSelected = (data) => dispatch => {
    dispatch({ type: SHOPPING_CART_PAGE, selectedPage: data });
}