import {createStore ,applyMiddleware ,compose } from 'redux';
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
    key:'root',
    storage:AsyncStorage,
    blacklist:['links']
}

const intialState = {};
const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedReducer = persistReducer(persistConfig,rootReducer)
export const store = createStore(persistedReducer,intialState, composeEnhancers(applyMiddleware(...middleware)))
export const persistor = persistStore(store)

   

