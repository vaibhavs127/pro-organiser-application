import {createStore,combineReducers,applyMiddleware} from 'redux';
import HomeReducer from '../Reducers/HomePageReducers';
import thunk from 'redux-thunk';
import {composeWithDevTools} from "redux-devtools-extension";
import {logger } from "redux-logger";


const allReducers=combineReducers({HomeReducer});

const GlobalStore=createStore(
    allReducers,
    composeWithDevTools(applyMiddleware(logger,thunk))
);

export default GlobalStore;