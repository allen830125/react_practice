import { CALCULATOR_SET_DATA } from './actionType';

export const setData = (data) => dispatch => {
    dispatch({ type: CALCULATOR_SET_DATA, data })
};