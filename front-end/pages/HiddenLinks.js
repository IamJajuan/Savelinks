import React  from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import  CardList  from "../components/CardList";
import { selectHiddenLinks } from "../selectors/index";
import {deleteLink,updateLink,toggleLink} from '../actions/LinkActions'
import { BASEURL } from '../CONSTANTS';
import {STYLES} from '../StyleSheet'
import Fab from '../components/Fab'

export const HiddenLinks = (props) => {

    const url = new URL('links/?hidden=true/',BASEURL).toString()
    return (
        <View style ={STYLES.container}>
  <CardList  linksKey = "links" nextKey = "nextHidden" url = {url}  query = "?hidden=true/" field = "" links ={props.links} navigation = {props.navigation} title = "My Private Links" />
  <Fab screen = {props.route.name }navigation = {props.navigation} />
        </View>
    )
}

const mapStateToProps = (state) => ({
    
    links: selectHiddenLinks(state),

})

const mapDispatchToProps = {

    deleteLink,
    updateLink,
    toggleLink,
    
        
    }
export default connect(mapStateToProps, mapDispatchToProps)(HiddenLinks)
