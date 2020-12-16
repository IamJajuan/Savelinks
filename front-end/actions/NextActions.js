

import Axios from "axios"
import { tokenConfig } from "./AuthActions"
import { BASEURL } from "../CONSTANTS"
import { RESETNEXT, SETNEXT, SETNEXTFAIL } from "./NextTypes"

//setNext assigns the next page with the url parameter to state that has page parameter 
export const setNext = (url = new URL('links/',BASEURL) ,page = "nextLink" ) => (dispatch,getState) => {

    Axios.get(url.toString(),tokenConfig(getState)).then(res => dispatch({type:SETNEXT,payload:{next:res.data,page}})).catch(err => dispatch({type:SETNEXTFAIL,payload:err}))
}

// resetNext set current state to initial state 
export const resetNext = () => dispatch => {
    dispatch({type:RESETNEXT})
}

