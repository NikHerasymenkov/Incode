import {combineReducers} from "redux";
import {addTickersReducer, tickersReducer} from "./tickers/reducer";

const rootReducer=combineReducers({
    tickers:tickersReducer,
    addLastPrice:addTickersReducer,
})
export {rootReducer}