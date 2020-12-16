

import React,{useCallback,useEffect} from 'react'
import { connect } from 'react-redux'
import { ActivityIndicator, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import MyCard from "./MyCard";
import {deleteLink,updateLink,toggleLink,getMoreLinks} from '../actions/LinkActions'
import {setNext} from '../actions/NextActions'
import {Text,Card} from 'react-native-elements';



const keyExtractor = (link) =>  link.id.toString()

const CardList = (props) => {


  useEffect(() => {
    if (props.next == '' || props.nextKey == 'nextSearched'|| props.nextKey == 'nextFilteredLink') {
      
      props.setNext(props.url,props.nextKey)
    }
    
  }, []) 



      
  const renderFooter = () => props.isLoading && (<View style = {{marginTop:14}} ><ActivityIndicator color = "blue" size = "large" /></View>)

    const renderItem  = ({ item }) => {

  
        return (
        <View>
       <MyCard query = {props.query}   item = {item} navigation = {props.navigation} deleteLink ={props.deleteLink}  updateLink = {props.updateLink}  toggleLink = {props.toggleLink}/>
     </View>
    )
    }


  //handleGetMoreLinks calls the getMoreLinks and setNext functions if the next parameter is not empty 
    const handleGetMoreLinks =  useCallback((next,linksKey) => {   

      if (next) {

          props.getMoreLinks(next,linksKey)
          props.setNext(next,props.nextKey)   
      }
    
      
      }, []);
    


    return (
       <View style ={{flex:1}}>
      
  <FlatList ListFooterComponent = {renderFooter}   onEndReachedThreshold={0.5} onEndReached = {() => handleGetMoreLinks(props.next,props.linksKey) }   ListHeaderComponent = {<Card><Text style ={{textAlign:'center'}} h4> {props.title} </Text></Card>}  initialNumToRender = {4}  keyExtractor = {keyExtractor} data = {props.links}  renderItem = {renderItem} />
       </View>
    )
}

const mapStateToProps = (state,ownProps) => ({

  isLoading:state.links.isLoading,
  next:state.nexts[ownProps.nextKey]
})


const mapDispatchToProps = {

deleteLink,
updateLink,
toggleLink,
setNext,
getMoreLinks

    
}

export default connect(mapStateToProps, mapDispatchToProps)(CardList)

