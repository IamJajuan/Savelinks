import React, {useState} from 'react'
import { StyleSheet ,ScrollView} from 'react-native'
import { connect } from 'react-redux'
import {login  } from "../actions/AuthActions";
import { Input,Button,Card,Icon } from 'react-native-elements'


const Login = (props) => {
 
    const {navigation} = props
   
    const [username , setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [hide ,setHide] = useState(true)
   
   
    const handleLogin = () => {

        props.login({username,password})
        setPassword('')
        setUsername('')
      
    }





    return (
        <ScrollView>
        <Card    style = {styles.container}>
            <Card.Title style ={styles.title}>Login</Card.Title>
              <Input value={username} autoCompleteType = "username" textContentType="username" onChangeText = {(text) =>  setUsername(text)} placeholder = "Username" label = 'Username'/>

<Input rightIcon ={
<Icon
  name= {hide ? 'eye' : 'eye-off'}
  type='feather'
  onPress = {() => setHide(prev => !prev)}
/>}  value={password} autoCompleteType ="password" textContentType ="password" secureTextEntry ={hide}   onChangeText = {(text) =>  setPassword(text)}  placeholder  = "Password" label = "Password" />
<Button onPress = {() => handleLogin()} title = "Submit" />
<Button titleStyle ={styles.small} onPress = {() =>navigation.navigate('Signup')} title = "Don't have an account? Sign Up" type = 'clear' />
        </Card>
        </ScrollView>
    )
}

const mapDispatchToProps = {
    login
}

export default connect(null,mapDispatchToProps) (Login)






const styles = StyleSheet.create(
    {
      container : {
          flex: 1,
          justifyContent:'center'

      },

      title: {
          fontSize:20,
      
      },
    
      outline: {
          marginTop:10
      }
    }
)
