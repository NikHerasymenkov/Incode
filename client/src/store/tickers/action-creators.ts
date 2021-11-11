import {
    ADD_LAST_PRICE_SUCCESS,
    ADD_LAST_PRICE_ERROR,
    GET_TICKERS_ERROR,
    GET_TICKERS_SUCCESS
} from "./action-types";

const getTickersSuccess = (tickers:Response|[]) => ({
    type: GET_TICKERS_SUCCESS,
    payload: {tickers},
})
const getTickersError = (error: null) => ({
    type: GET_TICKERS_ERROR,
    payload: {error}
})
const addLastPriceSuccess = (lastPrice:Response|[]) => ({
    type: ADD_LAST_PRICE_SUCCESS,
    payload: {lastPrice},
})
const addLastPriceError = (error:null) => ({
    type: ADD_LAST_PRICE_ERROR,
    payload: {error},
})



export {
    getTickersSuccess,
    getTickersError,
    addLastPriceSuccess,
    addLastPriceError
}