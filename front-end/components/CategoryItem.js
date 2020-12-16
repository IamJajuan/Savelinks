import { connect } from 'react-redux'
import React from 'react'
import { View } from 'react-native'
import {ListItem,Button,Icon} from 'react-native-elements';
import {deleteCategory} from '../actions/CategoryActions'
import { STYLES } from '../StyleSheet';

const CategoryItem = (props) => {
  
   const {handleFilterLinks,item,openModal} = props
   
    return (
        <ListItem key={item.id}   onPress = {() => handleFilterLinks(item.name) }  bottomDivider  rightElement = {  <View style={STYLES.btnWrapper}>

  {<Button onPress = {() => props.deleteCategory(item.id)} type = 'clear' icon ={<Icon type = "antdesign" style = {STYLES.icon}  name="delete" size={22} color="black" />} />
  }
  <Button onPress = {() => openModal(item)}  type ='clear' icon = { <Icon type = "antdesign"  name="edit" size={22} color="black" />} />
  
    </View> }>

  <ListItem.Title>{item.name}</ListItem.Title>

  
 
  </ListItem>

    )
}

const mapDispatchToProps = {
  deleteCategory,
}

export default connect(null,mapDispatchToProps)(CategoryItem)



