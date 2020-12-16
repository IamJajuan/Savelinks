import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Signup from '../pages/Signup'
import Login from '../pages/Login'

const  AuthStack =() => {

    const Stack = createStackNavigator()
    return (
       
        <Stack.Navigator>
            <Stack.Screen name = 'Signup'  component= {Signup}   options = {() => ({ headerStyle: { backgroundColor: "#393e42" },      headerTintColor: "#fff",         }    )    }/>
            <Stack.Screen name = "Login" component = {Login}   options = {() => ({ headerStyle: { backgroundColor: "#393e42" },      headerTintColor: "#fff",         }    )    }/>
        </Stack.Navigator>
    )
}
export default AuthStack






