import {combineReducers} from 'redux'
import { authReducer } from "./AuthReducer";
import { linkReducer } from './LinkReducer';
import { categoryReducer } from "./CategoryReducer";
import { NextReducer } from './NextReducer';

export default combineReducers(
    {
        auths: authReducer,
        categories:categoryReducer,
        links:linkReducer,
        nexts:NextReducer
        
       
    }
)
