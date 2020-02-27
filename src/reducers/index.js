import { combineReducers } from 'redux'
import cardsReducer from "./cards";

const rootReducer = combineReducers({
    data: cardsReducer,
});

export default rootReducer;
