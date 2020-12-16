import {LOGIN,SIGNUP,LOGOUT,AUTHCHECK, LOGINFAIL,SIGNUPFAIL,LOGOUTFAIL, AUTHRESET } from './AuthTypes'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {  BASEURL } from '../CONSTANTS'
import Axios from 'axios'

const data = {
    username:'testuser2',
    password1:'Powershell',
    password2:'Powershell'


}

//authCheck determine if a user is authenticated
export const authCheck = ()  =>  dispatch => {

      

      AsyncStorage.getItem('token').then(res => {
         
   
        return dispatch(
        {
            type:AUTHCHECK,
            payload: res !== 'undefined'&& res !== null
        }

    )}
    
    )

    
}

//signup signs up user with the given data
export const signup = (data) => dispatch => {

  

    const url = new URL('dj-rest-auth/registration/',BASEURL)
    const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
    Axios.post(url.toString(),data, config).then(res => dispatch({type:SIGNUP,payload: res.data })).catch(err => dispatch({type:SIGNUPFAIL,payload:err.message}))

}



//login logs in user with the given data
export const login = (data) => (dispatch) => {


   
    const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
    const url = new URL('dj-rest-auth/login/' ,BASEURL)
    Axios.post(url.toString(),data,config ).then(res => dispatch({type:LOGIN ,payload:res.data})).catch(err =>dispatch({ type:LOGINFAIL,payload:err}) )
}



//tokenConfig returns a objects with a http header using getState add token to object if token exist.
export const tokenConfig = (getState) => {


  const token = getState().auths.token;

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  return config;

}

//logout logs out user
export const logout = () => (dispatch,getState) => {


    const token = getState().auths.token

    AsyncStorage.removeItem('token')
    const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization:`Token ${token}`
        },
      };
    const url = new URL('dj-rest-auth/logout/' ,BASEURL)
  Axios.post(url.toString(),null,config).then(res => dispatch({type:LOGOUT,payload:res }) ).catch(err => dispatch({type:LOGOUTFAIL,payload:err}))
} 

//authReset set current state to initial state 
export const authReset = () => dispatch => {

  dispatch({type:AUTHRESET})
}

