import { handleActions } from 'redux-actions';
import { SHOPPING_CART_ADD, SHOPPING_CART_DEL, SHOPPING_CART_INIT, SHOPPING_CART_SEARCH, SHOPPING_CART_PAGE } from '../actions/actionType';

const initState = state => ({
    product: [],
    selectedProduct: [],
    selectedPage: 1,
    search: '',
    displayNum: 8
});
const shoppingCart = handleActions({
    [SHOPPING_CART_INIT]: (state, action) => {
        let product = action.product || [];
        return {...state, product: product };
    },
    [SHOPPING_CART_ADD]: (state, action) => {
        let item = action.item;
        let selectedProduct = JSON.parse(JSON.stringify(state.selectedProduct));
        let dataIdx = selectedProduct.findIndex(data => data.id === item.id);
        if (dataIdx > -1) {
            selectedProduct[dataIdx].amount += 1;
        } else {
            selectedProduct.push({...item, amount: 1 });
        }

        return {...state, selectedProduct: selectedProduct };
    },
    [SHOPPING_CART_DEL]: (state, action) => {
        let item = action.item;
        let selectedProduct = JSON.parse(JSON.stringify(state.selectedProduct));
        let dataIdx = selectedProduct.findIndex(data => data.id === item.id);
        if (dataIdx > -1) {
            if (selectedProduct[dataIdx].amount > 1) {
                selectedProduct[dataIdx].amount -= 1;
            } else {
                selectedProduct.splice(dataIdx, 1);
            }
        }

        return {...state, selectedProduct: selectedProduct };
    },
    [SHOPPING_CART_SEARCH]: (state, action) => {
        let search = action.search || '';
        return {...state, search: search, selectedPage: 1 };
    },
    [SHOPPING_CART_PAGE]: (state, action) => {
        let selectedPage = action.selectedPage || 1;
        return {...state, selectedPage: selectedPage };
    }
}, initState());

export default shoppingCart;