
import React, { useEffect } from 'react'
import {Text, View } from 'react-native'
import {Card,Input, CheckBox} from 'react-native-elements';
import Fab from '../components/Fab'
import { STYLES } from '../StyleSheet';
import { ScrollView } from 'react-native-gesture-handler';


const AddLink = ({route,navigation}) => {

  useEffect(() => {
    navigation.setParams({summary:""})
    navigation.setParams({category:""} )
  }, [])
    return (
      <ScrollView style = {STYLES.container}>
      <Card>

   <Input textContentType = 'URL'  onChangeText = {url =>navigation.setParams({url: url} )}  defaultValue = {route.params?.url} containerStyle = {{marginTop:20}} label = 'URL' placeholder = "Enter URL" />

    <Input placeholder ="Enter Title"  onChangeText ={(text) => navigation.setParams({title:text}) } defaultValue = {route.params?.title }  label = 'Title'   />
    <Text style ={STYLES.helpText} >Must be less than 60 characters.</Text>

          <Input placeholder ="Enter Summary" multiline onChangeText = {(text) => navigation.setParams({summary:text})} label = 'Summary' defaultValue = {route.params?.summary}  />
          <Text style ={STYLES.helpText} >Must be less than 250 characters.</Text> 

   <View>
   
   <Input onChangeText = {category =>navigation.setParams({category: category} )}  defaultValue = {route.params?.category} label = "Category" placeholder = "Enter Category"/>
   <Text style ={STYLES.helpText}> Category must be less than 60 characters. </Text>
   </View>
   <CheckBox checked = {route.params?.hidden}  onPress= {() => navigation.setParams({hidden: !route.params?.hidden} ) } rightIcon  title = 'Private'  />

      </Card>
      <Fab screen = {route.name }navigation = {navigation} />
      </ScrollView>
    )
}

export default AddLink


