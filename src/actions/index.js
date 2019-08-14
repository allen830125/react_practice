import axios from 'axios';
import { ADD_ITEM, DEL_ITEM, INIT_ITEMS } from './actionType';

// onItemAdd處理產生'ADD_ITEM'的動作物件，注意傳入參數是payload
export const onItemAdd = (text) => dispatch => {
    dispatch({ type: ADD_ITEM, id: +new Date(), text })
};

// onItemAdd處理產生'ADD_ITEM'的動作物件，注意傳入參數是id
export const onItemDel = (id) => ({ type: DEL_ITEM, id })

export const onInitData = (items) => ({ type: INIT_ITEMS, items })

export const onFetchData = () => async dispatch => {
    let doApi = await axios.get('./items.json');
    let apiData = doApi.data || { items: [] };
    dispatch(onInitData(apiData.items));

}