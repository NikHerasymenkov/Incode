import {ADD_LAST_PRICE_SUCCESS, GET_TICKERS_SUCCESS} from "./action-types";

interface TickersState {
    tickers: [],
    error: null
}
interface AddTickersState {
    lastPrice: [],
    error: null
}


const initialState: TickersState = {
    tickers: [],
    error: null
}
const addTickersState: AddTickersState = {
    lastPrice: [],
    error: null
}
interface TickersAction {
    type: string,
    payload: any
}
interface AddTickersAction {
    type: string,
    payload: any
}


const tickersReducer = (state = initialState, actions: TickersAction): TickersState => {
    switch (actions.type) {
        case GET_TICKERS_SUCCESS: {
            return {
                ...state,
                tickers: actions.payload.tickers
            }
        }
        default:
            return {...state}
    }
}
const addTickersReducer=(state=addTickersState,actions:AddTickersAction):AddTickersState=>{
    switch (actions.type) {
        case ADD_LAST_PRICE_SUCCESS: {
            return {
                ...state,
                lastPrice: actions.payload.lastPrice
            }
        }
        default:
            return {...state}
    }
}

export {tickersReducer,addTickersReducer}