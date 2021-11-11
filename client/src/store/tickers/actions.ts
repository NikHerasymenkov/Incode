import {addLastPriceSuccess, getTickersSuccess} from "./action-creators";
import {Dispatch} from "redux";


const getTickers = (res: Response) => async (dispatch: Dispatch<any>) => {
    dispatch(getTickersSuccess);
        const data = res;
        return dispatch(getTickersSuccess(data));
}
const addLastPriceTickers = (res: Response) => (dispatch: Dispatch<any>) => {
    dispatch(addLastPriceSuccess);
        const data = res;
        return dispatch(addLastPriceSuccess(data));
}

export {
    getTickers,
    addLastPriceTickers
}