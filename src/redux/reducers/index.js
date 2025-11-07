import { combineReducers } from 'redux'

import ThemeOptions from './ThemeOptions';
import candidateReducer from './candidate';
import userReducer from './user'
import employeeReducer from './employee'

const rootReducer = combineReducers({
    ThemeOptions,
    candidateReducer,
    userReducer,
    employeeReducer
})
export default rootReducer
