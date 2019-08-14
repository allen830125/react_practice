import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions'
import { ADD_ITEM, DEL_ITEM, INIT_ITEMS } from '../actions/actionType';

const items = handleActions({
    [ADD_ITEM]: (state = [], action) => {
        return [{
            id: action.id,
            text: action.text,
        }, ...state]
    },
    [DEL_ITEM]: (state = [], action) => state.filter(item => item.id !== action.id),
    [INIT_ITEMS]: (state = [], action) => [...action.items]
}, [])


export default combineReducers({
    items
});