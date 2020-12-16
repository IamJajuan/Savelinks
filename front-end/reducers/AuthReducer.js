
import {AUTHCHECK, SIGNUP, LOGIN, LOGOUT, SIGNUPFAIL ,LOGINFAIL, LOGOUTFAIL, AUTHRESET} from '../actions/AuthTypes'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { showMessage } from "react-native-flash-message";


const initialState = {

token: null,
isAuth:false
}
export  function authReducer(state = initialState, { type, payload })  {
    switch (type) {

    case AUTHRESET:
        
    return {...initialState}
    
    case AUTHCHECK:
          
        
        return { ...state, isAuth:payload }

   case SIGNUP:
    
   AsyncStorage.setItem('token',payload.key)

   showMessage({
       message:"Sign up successful",
       type:"success",
       style:{paddingTop:50}
   })

   return {...state,token:payload.key,isAuth:true }



case SIGNUPFAIL:


showMessage({
    message:"Sign up fail",
    type:'danger'
})

return state

case LOGIN:



AsyncStorage.setItem('token',payload.key)

showMessage(
    {message:"Login sucessful",type:"success", style:{paddingTop:50}}
)


return {...state,token:payload.key,isAuth:true}

case LOGINFAIL:
  
    showMessage({
        message:"Unable to login",
        type:'danger'
    })
    

return state

case LOGOUT:

    showMessage(
        {
            message:"Logout successful"
            ,
            type:'success'
        }
    )
  
  
    
return {...state , isAuth:false,token:null}


case LOGOUTFAIL:


    showMessage(
        {
            type:'danger',
            message:payload
        }
    )

    return {...state,token:null}


    default:
      
        return state
    }
}
