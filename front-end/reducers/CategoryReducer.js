import { POSTCATEGORY, POSTCATEGORYFAIL, GETCATEGORIES, GETCATEGORIESFAIL, GETCATEGORY, GETCATEGORYFAIL, UPDATECATEGORY, DELETECATEGORY, UPDATECATEGORYFAIL, DELETECATEGORYFAIL, DETAILCATEGORY, RESETCATEGORIES, GETMORECATEGORIES, LOADINGCATEGORIES } from "../actions/CategoryTypes"
import { showMessage } from "react-native-flash-message";



const intialState = {
    categories:[],
    category:'',
    isLoading:false

   
}


export function categoryReducer(state = intialState, {type,payload }) {

    switch (type) {

    case RESETCATEGORIES:
      return {...intialState}
    case GETCATEGORIES:

    return {...state, categories:payload.results}

    case GETCATEGORIESFAIL:

    showMessage({
        message: payload.msg,
        type: "danger",
        style:{paddingTop:50}
      });
    
    return state
       
    case POSTCATEGORY:

    return {...state,categories:[payload,...state.categories] }

    case POSTCATEGORYFAIL:

    showMessage({
        message: payload.msg,
        type: "danger",
        style:{paddingTop:50}
      });

    return state


    case GETCATEGORY:
        const data = new Set ([payload,...state.categories])
    return state.categories.includes(payload) ? state : {...state , categories:[...data]}

case GETCATEGORYFAIL:

showMessage({
    message: payload.msg,
    type: "danger",
    style:{paddingTop:50}
  });

return state

case UPDATECATEGORY:

return {...state,categories:state.categories.map(category => category.id == payload.id ? payload : category)}

case UPDATECATEGORYFAIL:
    showMessage({
        message: payload.msg,
        type: "danger",
        style:{paddingTop:50}
      });
return state

case DELETECATEGORY:



return {...state,categories:state.categories.filter(category => category.id != payload)}

case DELETECATEGORYFAIL:
    showMessage({
        message: payload.msg,
        type: "danger",
        style:{paddingTop:50}
      });

case   GETMORECATEGORIES:

return {...state,categories:[...state.categories ,...payload.results]}

case LOADINGCATEGORIES:

return {...state,isLoading:!state.isLoading }
case GETCATEGORIESFAIL:


    showMessage({
        message: payload.msg,
        type: "danger",
        style:{paddingTop:50}
      });
    
return state

case DETAILCATEGORY:

return {...state,category:payload.name}

case DELETECATEGORYFAIL:

showMessage({
    message: payload.msg,
    type: "danger",
    style:{paddingTop:50}
  });

return state
    
        default:
          
            return state
        }
}