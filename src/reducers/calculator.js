import {
    handleActions
} from 'redux-actions';
import {
    CALCULATOR_SET_DATA
} from '../actions/actionType';

const initState = state => ({
    value: 0,
    actions: ''
});
const calculator = handleActions({
    [CALCULATOR_SET_DATA]: (state, action) => {
        return {...state, ...action.data };
    },
}, initState())

export default calculator;