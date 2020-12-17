import {combineReducers} from 'redux'
import { authReducer } from "./AuthReducer";
import { linkReducer } from './LinkReducer';
import { categoryReducer } from "./CategoryReducer";
import { NextReducer } from './NextReducer';
import persistReducer from 'redux-persist/es/persistReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';


const linksPersistConfig = {
    key: 'links',
    storage: AsyncStorage,
    blacklist: ['error','link']
  }
export default combineReducers(
    {
        auths: authReducer,
        categories:categoryReducer,
        links:persistReducer(linksPersistConfig,linkReducer),
        nexts:NextReducer
        
       
    }
)
