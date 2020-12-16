
import React from 'react'
import { View } from 'react-native'
import {getMoreLinks,updateLink,deleteLink,toggleLink } from "../actions/LinkActions";
import { connect } from 'react-redux';
import {selectFilterLinks  } from "../selectors";
import CardList from '../components/CardList'
import { BASEURL } from '../CONSTANTS';
import Fab from '../components/Fab'
import { STYLES } from '../StyleSheet';

const FilteredLinks = (props) => {


    const {route} = props

    const url = new URL(`links/?category=${route.parmas?.name}`,BASEURL).toString()

 
    return (


        <View style ={STYLES.container}>
<CardList url = {url} linksKey = "links"  nextKey = "nextLink"   field = "" links ={props.links} navigation = {props.navigation} title = {route.params?.name} />

<Fab screen = {route.name }navigation = {props.navigation} />




      
        </View>
    )
}


const mapStateToProps = (state) => ({
    links:selectFilterLinks(state),
})

const mapDispatchToProps = {


    deleteLink,
    updateLink,
    getMoreLinks,
    toggleLink,
    
}


export default connect(mapStateToProps,mapDispatchToProps) (FilteredLinks)



