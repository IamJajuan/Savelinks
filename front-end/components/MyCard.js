import React, {PureComponent } from 'react'
import { Text, View ,TouchableOpacity,TouchableWithoutFeedback } from 'react-native'
import {Card , Image ,Divider,Icon} from 'react-native-elements';
import { STYLES } from '../StyleSheet';


const Thumbnail = ({thumbnail}) => {


    if (thumbnail !== null && thumbnail !== '') {
        
     return <View style ={{ flex:1, alignItems:'center'}}> 
    
 
     <Image
     source={{ uri: thumbnail }}
     style={{ width: 300, height: 300}}/>
     <Divider style = {{marginVertical:14,height:2 , backgroundColor:'#e0e0e0',width:'100%'}} />
     </View>
    }
 
    return null
 
 }
export default class MyCard extends PureComponent {


    render() {

        const {item,toggleLink}= this.props

       return (
        <View>
                <TouchableWithoutFeedback onPress = {()=> this.props.navigation.navigate('Detail', {url:item.url }) }>
     <Card  >
         
    
       <Card.Title>{item.title}</Card.Title>
    <Thumbnail thumbnail = {item.thumbnail} />
         <Text>
             {item.summary}
         </Text>
    
     </Card>
     </TouchableWithoutFeedback>
    
     {<Card containerStyle = {STYLES.footer}>
     <View style ={{flexDirection:'row'}}>
         <TouchableOpacity style={STYLES.icon} onPress = {()=> this.props.navigation.navigate('EditLink',{item:item,query:this.props.query})}>
        <Icon type ="antdesign"  name="edit" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style ={STYLES.icon}>
        <Icon type = "antdesign" onPress = {() => this.props.deleteLink(item.id)}  name="delete" size={24} color="black" />
        </TouchableOpacity>
        
      
     <TouchableOpacity onPress= {() => toggleLink(item)}>
         {item.hidden  ?    <Icon type = "feather"  style ={STYLES.icon} name="eye" size={24} color="black" /> : <Icon type = "feather" style ={STYLES.icon} name="eye-off" size={24} color="black" /> }
     </TouchableOpacity>
     
    
        </View>
    </Card> }
        </View>
    )
    }
}
