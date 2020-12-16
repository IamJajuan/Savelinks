import React from 'react'
import {  View ,TouchableOpacity,Animated} from 'react-native'
import { Button,Icon} from 'react-native-elements';
import { STYLES } from '../StyleSheet';



 const Fab = (props) => {


   const {screen} = props
   


  
    return (

       <View style ={{flex:1, position:'absolute',bottom: 0 ,right:0} }>
    
         {
          screen !== 'Home'? <TouchableOpacity style = {STYLES.TouchableOpacityStyle}>
            <Animated.View style = {STYLES.homeBtn} >

              <Button onPress = {() => props.navigation.navigate('Home')} buttonStyle = {{backgroundColor:'#393e42',borderRadius:100}}  icon ={<Icon type = "antdesign" name = "home" size ={24} color ="white"/> } />
            </Animated.View>

           </TouchableOpacity> : (<View style ={{flex:1}}>
            <TouchableOpacity style = {STYLES.TouchableOpacityStyle}>
            <Animated.View style = {STYLES.fab} >
                
                
            <Button
            
  icon={
    <Icon type ="antdesign" name="plus" size={24} color="white" />
  }
  buttonStyle = {{backgroundColor:'#393e42',borderRadius:100}}
  iconContainerStyle = {{backgroundColor:'blue'}}
  onPress =  {() => props.navigation.navigate('AddLink')}
/>

            </Animated.View>
        </TouchableOpacity >

        <TouchableOpacity style = {STYLES.hideBtn}>
            <Animated.View style={STYLES.fab}  >
      
            <Button
      
            
  icon={
 <Icon type = "feather"  name="eye-off" size={24} color="white" />  
  }
  buttonStyle = {{backgroundColor:'#393e42',borderRadius:100}}

  onPress =  {() => props.navigation.navigate('HiddenLinks')}

/>
         </Animated.View>
     </TouchableOpacity  >
     </View>
)
         }
           

        </View>
      
    )
}
 
export default Fab