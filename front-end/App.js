
import React  from 'react';
import {Provider} from 'react-redux'
import {store,persistor} from './Store'
import   RootStack from "./components/RootStack";
import { PersistGate } from 'redux-persist/integration/react'
import FlashMessage from "react-native-flash-message";
import Loading from './components/Loading';



 const App = () =>{


  return (
    
    <Provider store={store}>
      
   <PersistGate loading ={ <Loading />} persistor = {persistor} >
<RootStack />
   </PersistGate>
   <FlashMessage position ="top" />

    </Provider>
  );
}


export default  (App)

