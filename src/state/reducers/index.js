import { combineReducers } from "redux";
import requestReducer from "./RequestReducer"
import tableReducer from "./TableReducer"
import authReducer from "./AuthReducer"
import login from "./LoginReducer"

const reducers = combineReducers({
    request: requestReducer,
    tableValues: tableReducer,
    authRed: authReducer,
    loginRed: login
})

export default reducers 