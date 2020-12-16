import { connect } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import React, {useEffect} from 'react'
import  MainStack  from "./MainStack";
import  AuthStack  from "./AuthStack";
import { authCheck } from '../actions/AuthActions';
import { View } from 'react-native';
import Loading from './Loading';





const RootStack = (props) => {


   useEffect(() => {
       props.authCheck()    
         
   }, [props.token])
   
    return (

      <View style = {{flex:1}}>
        <NavigationContainer fallback ={<Loading />} >
            {props.isAuth ? <MainStack /> : <AuthStack />}
        </NavigationContainer>
        </View>
    )
}
const mapStateToProps = (state) => ({
    isAuth:state.auths.isAuth,
    token:state.auths.token,
})

const mapDispatchToProps = {
    authCheck,
}

export default connect(mapStateToProps,mapDispatchToProps)(RootStack)
