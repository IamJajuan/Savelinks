import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-elements'
import { STYLES } from '../StyleSheet'

const Error = ({msg}) => {
    return (
        <View style = {[STYLES.container, {justifyContent:"center",alignItems:"center"}]}>
    <Text style = {{textAlign:"center"}} h3>
{msg}
    </Text>
        </View>
    )
}

export default Error
