import { RESETNEXT, SETNEXT, SETNEXTFAIL } from "../actions/NextTypes"
import { showMessage } from "react-native-flash-message"




const intialState = {
    nextHidden:'',
    nextLink:'',
    nextSearched:'',
    nextFilteredLink:'',
    nextCategory: '',
}


export function NextReducer(state = intialState, {type,payload}) {
    

    switch (type) {

        case RESETNEXT:
            return{...intialState}
        case SETNEXT:

            return {...state,[payload.page]:payload.next.next }
            
            
            case SETNEXTFAIL:
            

            showMessage({
                message:payload,
                type:'danger'
            })
            
            return state
            
            
        
            default:
              
                return state
            }
   
}


