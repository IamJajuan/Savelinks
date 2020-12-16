import { BASEURL} from "../CONSTANTS"
import Axios from "axios"
import { tokenConfig } from "./AuthActions"
import { DELETELINKFAIL, GETLINKS, GETLINKSFAIL, POSTLINK, POSTLINKFAIL, DELETELINK, UPDATELINK, UPDATELINKFAIL, GETSEARCHEDLINKS,GETSEARCHEDLINKSFAIL, TOGGLELINK, TOGGLELINKFAIL, GETHIDDENLINKS,GETHIDDENLINKSFAIL, GETFILTERLINKS,GETFILTERLINKSFAIL, GETMORELINKS, GETMORELINKSFAIL, COPYLINK, CLEARLINK, COPYLINKFAIL, RESETLINKS, LOADINGLINKS } from "./LinkTypes"
import ShareExtension from 'react-native-share-extension'
import { validURL, wait } from "../Helpers"




//clearLink emptys the link field
export const clearLink = () => dispacth => {


  dispacth({type:CLEARLINK})
}
 //copyLink copies link from other apps
 export const copyLink = () => async (dispatch,getState) => {


    try {

      const { value } = await ShareExtension.data();

      if (value.length > 400) {
        
        dispatch({type:COPYLINKFAIL,payload:{msg:"Unable to process URL, it is too long."}})
        return;
      }
   
      if (validURL(value)) {
        
        const url = new URL('links/paste_link/',BASEURL).toString()
        const res = await Axios.post(url,{url:value},tokenConfig(getState))
        dispatch({type:COPYLINK,payload:res.data})
      }

      else {

        dispatch({type:COPYLINKFAIL,payload:{msg:"URL is not valid"}})
      }

    } catch (error) {


      dispatch({type:COPYLINKFAIL,payload:{error,msg:"Unable to copy link"}})

    }  

   }

// getLinks get the links from the Savelinks API
export const getLinks = () => (dispatch,getState) => {

   const url = new URL('links/',BASEURL).toString()

    Axios.get(url,tokenConfig(getState)).then(res => dispatch({type:GETLINKS,payload:res.data})).catch(err => dispatch({type:GETLINKSFAIL,payload:{err,msg:"Unable to get links"}}))
}

//postLinks post data to the Savelinks API and add that data to the state. If the nav parameter is not pass it become null
export const postLink = (data,nav = null) => (dispatch,getState) => {

  if (data.url > 400) {
    
    dispatch({type:POSTLINKFAIL,payload:{msg:"Unable to process URL, it is too long."}})
    return;
  }

    if (!validURL(data.url) ) {
      
      dispatch({type:POSTLINKFAIL,payload:{msg:"Invaild URL"}})
      return;
    }

    if (data.title == 'undefined' || data.title == null) {
    dispatch({type:POSTLINKFAIL,payload:{msg:"Title require"}})
    return;
  }
    const url = new URL('links/',BASEURL).toString()
    Axios.post(url,data,tokenConfig(getState)).then(res => dispatch({type:POSTLINK,payload:res.data})).then(()=> nav ? nav.navigate('Home') : ShareExtension.close()) .catch(err => dispatch({type:POSTLINKFAIL,payload:{err, msg:"Unable to obtain link"}}))

}

//deleteLink deletes the link with an id equal to the id parameter with the data parameter
export const deleteLink = (id) => (dispatch,getState) => {

    const url = new URL (`links/${id}/`,BASEURL).toString()
    Axios.delete(url,tokenConfig(getState)).then(() => dispatch({type:DELETELINK,payload:id})).catch(err => dispatch({type:DELETELINKFAIL,res:{err,msg:"Unable to delete link"}}))
}

// updateLink updates the link with an id equal to the id parameter with the data parameter
export const updateLink = (nav,data, id) => (dispatch,getState) => {

  if (!data.title) {
    dispatch({type:UPDATELINKFAIL,payload:{msg:"Title require"}})
    return;
  }


    const url = new URL(`links/${id}/`,BASEURL).toString()

    Axios.put(url,data,tokenConfig(getState)).then(res => dispatch({type:UPDATELINK,payload:res.data})).then(() => nav.navigate('Home')).catch(err => dispatch({type:UPDATELINKFAIL,payload:{err,msg:"Unable to update link"}}))
}

//toggleLink toggles the link hidden field and then update link
export const toggleLink = (item) =>  (dispatch,getState) => {
   
    const url = new URL(`links/${item.id}/`,BASEURL).toString()
  

    Axios.put(url,{hidden:!item.hidden} , tokenConfig(getState)).then(res => dispatch({type:TOGGLELINK,payload:res.data})).catch(err => dispatch({type:TOGGLELINKFAIL,payload:{err,msg:"Unable to toggle link"}}))
    
    };
    
//resetLinks set current state to initial state    
export const resetLinks = () => dispacth => {

  dispacth({type:RESETLINKS})
}
// getSearchedLinks get links with a body or title that contains the query parameter from the Savelinks API and add to state
export const getSearchedLinks = (query) => (dispatch,getState) => {

    dispatch({type:LOADINGLINKS})
    const url = new URL(`links/?search=${query} `,BASEURL)

  Axios.get(url.toString(), tokenConfig(getState )).then(res => dispatch({type:GETSEARCHEDLINKS,payload:res.data})).catch(err => dispatch({type:GETSEARCHEDLINKSFAIL,payload:{err,msg:"Unable to get links"}})).finally(() => dispatch({type:LOADINGLINKS}))
}

// getHiddenLinks get links from the Savelinks API with a hidden field equal to true and add to state

export const getHiddenLinks = () => (dispatch,getState) => {


    const url = new URL('links/?hidden=true',BASEURL).toString()

    Axios.get(url,tokenConfig(getState)).then(res => dispatch({type:GETHIDDENLINKS,payload:res.data})).catch(err => dispatch({type:GETHIDDENLINKSFAIL,payload:{err,msg:"Unable to get links"} }))
}

// getFilterLinks gets links that have a category field equal to the category parameter

export const getFilterLinks = (category) => (dispatch,getState) =>

{
    const url =  new URL(`links/?category=${category}`,BASEURL).toString()

    Axios.get(url,tokenConfig(getState) ).then(res => dispatch({type:GETFILTERLINKS,payload:res.data}) ).catch(err => dispatch({type:GETFILTERLINKSFAIL,payload:{err,msg:"Unable to get links"}}))


}
//getMoreLinks gets the links from the Savelinks API with the url parameter and adds to the state with the page parameter
export const getMoreLinks = (url,key="links") =>(dispacth,getState) =>  {

    dispacth({type:LOADINGLINKS})
    Axios.get(url.toString(),tokenConfig(getState)).then(res => dispacth({type:GETMORELINKS,payload:{data:res.data,key}})).catch(err => dispacth({type:GETMORELINKSFAIL,payload:{err,msg:"Unable to get links"}})).finally(() => wait(2000).then(() => dispacth({type:LOADINGLINKS})) )
}