import { combineReducers } from "redux";

import weatherDataReducer from "./weatherReducer"

const reducers = {
	weatherDataReducer
}

export default combineReducers(reducers);