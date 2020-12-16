import React,{useEffect,useState} from 'react'
import { View } from 'react-native'
import {Header,SearchBar,Icon} from 'react-native-elements';
import { connect } from 'react-redux'
import {getLinks,deleteLink,updateLink, getSearchedLinks,getHiddenLinks,toggleLink,resetLinks} from '../actions/LinkActions'
import { selectLinks } from "../selectors/index";
import {getCategories,resetCategories} from '../actions/CategoryActions'
import CardList from '../components/CardList'
import {setNext,resetNext} from '../actions/NextActions'
import Fab from '../components/Fab'
import {logout,authCheck,authReset} from '../actions/AuthActions'
import { BASEURL , } from '../CONSTANTS';
import {STYLES} from '../StyleSheet'




const Home  = (props) => {
   
   useEffect(() => {
      
      props.getLinks()
      props.getCategories()
      props.getHiddenLinks()     
    }, [])


const [query, setQuery] = useState('')



//handleSearch performs the getSearchedLinks ,setQuery and navigate function 
const handleSearch = () => {
   
    props.getSearchedLinks(query)
    props.navigation.navigate("SearchedLinks", {query})
    setQuery('')
}

//handleLogout logs the user out 
const handleLogout = () => {

    props.logout()
    props.authReset()
    props.resetLinks()
    props.resetNext()
    props.resetCategories()

}


const url = new URL('links/',BASEURL).toString()


 
    return (


        <View style ={STYLES.container}>

            <Header containerStyle = {{backgroundColor:'#393e42',borderBottomColor:'transparent'}}  placement = 'left'  rightComponent = {<View style ={STYLES.btnWrapper}>
<Icon type = "antdesign" onPress = {() => props.navigation.navigate('Categories') } style ={ STYLES.headerIcon} name = 'tags' color ='white' size = {25} />
<Icon type = "antdesign" onPress = {handleLogout} iconStyle ={ STYLES.headerIcon} name = 'logout' color ='white' size = {25} />
</View>

} leftComponent = {{text:'Savelinks' , style:{color:'white',fontWeight:'500' ,fontSize:18}}}/>
            
<SearchBar

    placeholder="Type Here..."
      onChangeText={text => setQuery(text)}
      containerStyle ={{borderTopColor:'transparent'}}
      onSubmitEditing = {handleSearch}
      value = {query}
       
      />

<CardList query = "" url = {url} linksKey = "links"  nextKey = "nextLink"  links ={props.links } navigation = {props.navigation} title = "My Links" />
<Fab screen = {props.route.name }  navigation = {props.navigation} />
</View>
    )
}
const mapStateToProps = (state) => ({
    links: selectLinks(state) ,
    link:state.links.link
})

const mapDispatchToProps = {

getLinks,
deleteLink,
getCategories,
updateLink,
getSearchedLinks,
getHiddenLinks,
toggleLink,
logout,
authCheck,
setNext,
authReset,
resetNext,
resetLinks,
resetCategories,

    
    
}


export default  connect(mapStateToProps, mapDispatchToProps)(Home)

