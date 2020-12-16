import { BASEURL } from "../CONSTANTS"
import Axios from "axios"
import { tokenConfig } from "./AuthActions"
import { POSTCATEGORY,POSTCATEGORYFAIL, GETCATEGORIES,GETCATEGORIESFAIL, GETCATEGORY, GETCATEGORYFAIL, UPDATECATEGORY, UPDATECATEGORYFAIL, DELETECATEGORY, DELETECATEGORYFAIL, GETMORECATEGORIES, GETMORECATEGORIESFAIL, DETAILCATEGORY, RESETCATEGORIES, LOADINGCATEGORIES } from "./CategoryTypes";
import { wait } from "../Helpers";

//resetCategories set current state to initial state 
export const resetCategories  = () => (dispatch) => {
    dispatch({type:RESETCATEGORIES})
}

// getCategories get the categories from the Savelinks API
export const getCategories = () => (dispatch,getState) => {

    const url = new URL("categories/",BASEURL).toString()

    Axios.get(url,tokenConfig(getState)).then(res => dispatch({type: GETCATEGORIES,payload:res.data})).catch(err =>  dispatch({type:GETCATEGORIESFAIL,payload:{err,msg:"Unable to get categories"}}))
}

// postCategory post data to the Savelinks API  and add it to state
export const postCategory = data => (dispatch,getState) => {

    const url = new URL('categories/',BASEURL).toString()


    Axios.post(url,data,tokenConfig(getState)).then(res => dispatch({type:POSTCATEGORY,payload:res.data})).catch(err => dispatch({type:POSTCATEGORYFAIL,payload:{err,msg:"Unable to add category"}}))
}


// getCategory gets a category equal to the category parameter
export const getCategory = data => (dispatch,getState) => {

    const url = new URL(`categories/getcategory/getCategory/`,BASEURL).toString()

    Axios.post(url, data,tokenConfig(getState)).then(res => dispatch({type:GETCATEGORY,payload:res.data})).catch(err => dispatch({type:GETCATEGORYFAIL,payload:{err,msg:"Unable to get category"} }))
}


// updateCategory updates a category with the data parameter 
export const updateCategory = (id,data) =>  (dispatch,getState) => {

    const url = new URL(`categories/${id}/`,BASEURL).toString()

    Axios.put(url,data,tokenConfig(getState)).then(res => dispatch({type:UPDATECATEGORY,payload:res.data})).catch(err => dispatch({type:UPDATECATEGORYFAIL,payload:{err,msg:"Unable to update category"}}))
}

// deleteCategory deletes a category with an id equal to the id parameter
export const deleteCategory = id =>(dispatch,getState) => {

    const url = new URL(`categories/${id}`,BASEURL).toString()

    Axios.delete(url,tokenConfig(getState)).then(res => dispatch({type:DELETECATEGORY,payload:id})).catch(err => dispatch({type:DELETECATEGORYFAIL,payload:{err,msg:"Unable to delete category"}}))
}

//getMoreCategories get more categories from the Savelinks API with the url parameter
export const getMoreCategories = (url) => (dispatch,getState) => {

    dispatch({type:LOADINGCATEGORIES})
    Axios.get(url,tokenConfig(getState)).then(res => dispatch({type:GETMORECATEGORIES,payload:res.data})).catch(err => dispatch({type:GETMORECATEGORIESFAIL,payload:{err,msg:"Unable to get more categories"} })).finally(() => wait(2000).then(() => dispatch({type:LOADINGCATEGORIES})) )
}


//detailCategory gets a category equal to the id paramerter
export const detailCategory = id => (dispatch,getState) => {

    const url = new URL (`categories/${id}/` ,BASEURL).toString()

    Axios.get(url,tokenConfig(getState)).then(res => dispatch( {type:DETAILCATEGORY,payload:res.data} )).catch(err => dispatch({type:DETAILCATEGORY,payload:{err,msg:"Unable to get category"}}))
}