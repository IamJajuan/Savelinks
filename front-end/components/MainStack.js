import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from "../pages/Home";
import AddLink from '../pages/AddLink'
import { connect } from 'react-redux';
import { postLink,updateLink } from "../actions/LinkActions";
import {getCategory} from '../actions/CategoryActions'
import {  Linking, View } from 'react-native'
import {Button,Icon} from 'react-native-elements';
import  EditLink from "../pages/EditLink";
import  SearchedLinks from '../pages/SearchedLinks'
import Detail from '../pages/Detail'
import  Categories from '../pages/Categories'
import FilteredLinks from '../pages/FilteredLinks'
import  HiddenLinks  from "../pages/HiddenLinks";




const MainStack =  (props)  => {

    const Stack = createStackNavigator()
    
    const handlePost = (data,nav) => {

      props.postLink(data,nav)
      data.category ?  props.getCategory({name:data.category}) : null
    }

    return (
      
       
        <Stack.Navigator >
        
            <Stack.Screen name='Home' component = {Home} options = {{headerShown:false}} />
            <Stack.Screen name = 'HiddenLinks' component = {HiddenLinks} options = {() => ({ headerStyle: { backgroundColor: "#393e42" },      headerTintColor: "#fff",         }    )    }  />
            
            <Stack.Screen name = 'Categories' component = {Categories} options = {() => ({ headerStyle: { backgroundColor: "#393e42" },      headerTintColor: "#fff",         }    )    }  />
            <Stack.Screen name ="Detail" component = {Detail} options = {({route}) => ({ headerStyle: { backgroundColor: "#393e42" },      headerTintColor: "#fff",  title:"Link",headerRight: () => <Button onPress = {() => Linking.openURL(route.params?.url)} buttonStyle = {{backgroundColor:"#393e42",marginRight:5}}  icon = {() => <Icon color = "#fff" type = "font-awesome" name = "external-link" />} /> })   } />
            <Stack.Screen name = "SearchedLinks" component = {SearchedLinks} options = {() => ({ headerStyle: { backgroundColor: "#393e42" },      headerTintColor: "#fff", })   }  />
    <Stack.Screen name = "FilteredLinks" component = {FilteredLinks} options = {({route}) => ({ title:route.params?.name, headerStyle: { backgroundColor: "#393e42" },  headerTintColor: "#fff" })}/>
            <Stack.Screen
        name="AddLink"
        component={AddLink}
        initialParams = {{hidden:false}}
        options={({ route, navigation }) => ({
          headerStyle: { backgroundColor: "#393e42" },
          headerTintColor: "#fff",
          headerRight: () => (
            <View style={{ flexDirection: "row" }}>
              <Button
                onPress={()  =>  handlePost( { url: route.params?.url,
                  category:route.params?.category,
                    hidden:route.params?.hidden,
                    title:route.params?.title,
                    summary:route.params?.summary,
                    thumbnail:"",
                 },navigation )  }
                titleStyle={{ color: "#fff" }}
                type="clear"
                title="Save"
              />
             
      
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="EditLink"
        component={EditLink}
        initialParams ={{query:""}}
        options={({ route, navigation }) => ({
          
          headerStyle: { backgroundColor: "#393e42" },
          headerTintColor: "#fff",
          headerRight: () => (
            <View style={{ flexDirection: "row" }}>
              <Button
                onPress={() => props.updateLink( navigation, { title: route.params?.title,
                    category:route.params?.category,
                    summary:route.params?.summary,
                    hidden:route.params?.hidden,
                    remove:route.params?.remove,
                    thumbnail:route.params?.item.thumbnail
                 }, route.params?.id)}
                titleStyle={{ color: "#fff" }}
                type="clear"
                title="Save"
              />
             
      
            </View>
          ),
        })}
      />

     
        </Stack.Navigator>
    )
}


const mapDispatchToProps = { postLink, updateLink , getCategory};

export default connect(null,mapDispatchToProps) (MainStack)