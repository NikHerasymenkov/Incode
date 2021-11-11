import thunk from "redux-thunk";
import {applyMiddleware, compose, createStore} from "redux";
import {rootReducer} from "./root-reducer";

const middleware=[thunk]

const store=()=>createStore(rootReducer,compose(applyMiddleware(...middleware)))


export  default store()
