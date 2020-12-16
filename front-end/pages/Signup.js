import React, {useState} from 'react'
import { StyleSheet ,ScrollView} from 'react-native'
import { connect } from 'react-redux'
import {signup  } from "../actions/AuthActions";
import { Input,Button,Card,Icon } from 'react-native-elements'




const Signup = (props) => {

      
    const [username,setUserName] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [hide ,setHide] = useState(true)
   

    const handleSignup = () => {

      props.signup( {username,password1,password2})
      setUserName('')
      setPassword1('')
      setPassword2('')
  

    }
      

    return (
      <ScrollView>
        <Card  style = {styles.container} >
          <Card.Title style = {styles.title}>
            Sign Up
          </Card.Title>
        <Input textContentType ="username" autoCompleteType ="username" value ={username} onChangeText = {setUserName} placeholder = "Username" label = 'Username'/>

       <Input rightIcon ={
<Icon
  name= {hide ? 'eye' : 'eye-off'}
  type='feather'
  onPress = {() => setHide(prev => !prev)}
/>}   autoCompleteType ="password" secureTextEntry ={hide}   textContentType ="password"  value = {password1} onChangeText = {(text) => setPassword1(text)} placeholder = "Password" label = "Password" />
       <Input  rightIcon ={
<Icon
  name= {hide ? 'eye' : 'eye-off'}
  type='feather'
  onPress = {() => setHide(prev => !prev)}
/>}  autoCompleteType ="password" secureTextEntry ={hide} onChangeText = {setPassword2} value ={password2}  placeholder = "Confirm Password" label = "Confirm Password"/>
      
    <Button buttonStyle ={styles.btn} onPress = {() => handleSignup() }  title = 'Submit'   type = 'solid' />  
    <Button buttonStyle = {styles.outline} onPress = {() => props.navigation.navigate('Login')} titleStyle = {styles.btnTitle} type = 'clear' title = 'Already have an account?' />  
    
    </Card>
    </ScrollView>
    )
}


const mapDispatchToProps = {
    signup
}


export default connect(null, mapDispatchToProps) (Signup)

const styles = StyleSheet.create(
    {
      container : {
          flex: 1,
          justifyContent:'center'

      },

      title: {
          fontSize:20,
      },
      btnTitle:{
  fontSize:18,
      },
      outline: {
          marginTop:10
      }
    }
)
