import React from 'react'
import { View ,Text} from 'react-native'
import { connect } from 'react-redux'
import {getLinks,deleteLink,updateLink} from '../actions/LinkActions'
import {setNext} from '../actions/NextActions'
import CardList from '../components/CardList'
import {selectSearchedLinks} from '../selectors/index'
import { BASEURL } from '../CONSTANTS';
import Fab from '../components/Fab'
import { STYLES } from '../StyleSheet'
import Loading from '../components/Loading'




const SearchedLinks  = (props) => {

const {route,searchedLinks,isLoading} = props
const url = new URL(`links/?search=${route.params?.query}`,BASEURL)
 
if (isLoading) {

    return <Loading />
}

 
    return (


        <View style ={STYLES.container}>
           
{ searchedLinks.length ? <CardList url= {url}  linksKey = "searchedLinks" nextKey = "nextSearched"  field = "" links ={props.searchedLinks} navigation = {props.navigation} title = "Searched Links" />: <Text style = { {textAlign:"center", marginTop:25, fontSize:18,fontWeight:"600"}}>Results not found</Text>

}

<Fab screen = {props.route.name }navigation = {props.navigation} />
      
        </View>
    )
}
const mapStateToProps = (state) => ({
    searchedLinks:selectSearchedLinks(state),
    isLoading:state.links.isLoading,

})

const mapDispatchToProps = {

getLinks,
deleteLink,
updateLink,
setNext
    
    
}


export default  connect(mapStateToProps, mapDispatchToProps) (SearchedLinks)


