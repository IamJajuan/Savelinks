import { StyleSheet } from 'react-native'


export const STYLES  = StyleSheet.create({
    fab: {
    
       flex:1
    },
    restBtn:{
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 130,
     
    },
   resetText:{
       fontWeight:'600',
       fontSize:15,
       color:'#36393b',

   },
   listWrapper:{

   
    marginBottom:150

   },
    container: {
        flex: 1,
        marginBottom:10,
      
        
    },
    btn: {
        position:'absolute',
        width:60,
        height:60,
        alignContent:'center',
        justifyContent:'center',
        shadowRadius:20,
        shadowColor:"red",
        shadowOpacity:0.3,
        shadowOffset: {height:10},
        backgroundColor:'red'
        
            },
        hideBtn:{
        
            position: 'absolute',
                width: 50,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                right: 30,
                bottom: 80,
        },



        TouchableOpacityStyle: {
            position: 'absolute',
            width: 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            right: 30,
            bottom: 30,
          },

    headerIcon: {
marginLeft:10
    },
    icon: {
        marginRight:14
    }
    ,btnWrapper: {
flexDirection:'row',

    },

    btn: {
position:'absolute',
width:60,
height:60,
alignContent:'center',
justifyContent:'center',
shadowRadius:20,
shadowColor:"red",
shadowOpacity:0.3,
shadowOffset: {height:10},
backgroundColor:'red'

    },
hideBtn:{

    position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 80,
}
,
    TouchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
      },

      homeBtn: {
position: 'absolute',
width:50,
height:50,
alignItems:'center',
justifyContent:'center',
bottom:10
      },

      footer:{
          marginTop:0
      },
      helpText:{
        marginLeft:10,
        fontStyle:'italic',
        fontSize:10,
        marginBottom:12,
        marginTop:-10
      },
      text:{
        color:"#fff",
        fontWeight:"600",
        fontSize:18,
      },

})
