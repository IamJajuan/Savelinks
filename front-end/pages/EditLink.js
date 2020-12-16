import React, {useEffect} from 'react'
import {  Text, View,ScrollView } from 'react-native'
import {Card,Input, CheckBox} from 'react-native-elements';
import { connect } from 'react-redux'
import { STYLES } from '../StyleSheet';
import {detailCategory} from '../actions/CategoryActions'

const EditLink = ({route,navigation,detailCategory,category}) => {


  useEffect(() => {
    
  
    detailCategory(route.params?.item.category)

    
  },[category] )


    useEffect(() => {
        navigation.setParams({
            hidden:route.params?.item.hidden,
            title:route.params?.item.title,
            summary:route.params?.item.summary,       
            id:route.params?.item.id,
            remove:false,
            thumbnail:route.params?.item.thumbnail
                
        })
      
    }, [])

    return (
      <View style={STYLES.container} >
      <ScrollView style = {{marginBottom:20}}>
        <Card>
        <View>
        
        <Input  onChangeText ={(text) => navigation.setParams({title:text}) } defaultValue = {route.params?.title }  label = 'Title'   />
        <Text style ={STYLES.helpText} >Must be less than 60 characters.</Text>
          <Input multiline onChangeText = {(text) => navigation.setParams({summary:text})} label = 'Summary' defaultValue = {route.params?.summary}  />
          <Text style ={STYLES.helpText} >Must be less than 250 characters.</Text>  
        <Input onChangeText = {category =>navigation.setParams({category: category} )}  defaultValue = {category} label = "Category" />
        <Text style ={STYLES.helpText}  >Category must be less than 60 characters. </Text>
        </View>
        <CheckBox checked = {route.params?.hidden}  onPress= {() => navigation.setParams({hidden:(!route.params?.hidden)})} rightIcon  title = 'Private'  />
        <CheckBox checked = {route.params?.remove}  onPress= {() => navigation.setParams({remove:(!route.params?.remove)})} rightIcon  title = 'Remove thumbnail'  />
     
           </Card>
   
           </ScrollView>
        
           </View>
    )
}

const mapStateToProps = (state) => ({
  link:state.links.link,
  category:state.categories.category

 
})



const mapDispatchToProps = {
  detailCategory,
}



export default  connect(mapStateToProps,mapDispatchToProps) (EditLink)


    
