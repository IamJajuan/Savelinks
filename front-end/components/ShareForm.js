
import React,{useState,useEffect} from 'react'
import {  Text, View } from 'react-native'
import {Card,Input, CheckBox,Header,Button} from 'react-native-elements';
import { STYLES } from '../StyleSheet';
import { ScrollView} from 'react-native-gesture-handler';
import { connect } from 'react-redux'
import {copyLink,postLink,clearLink} from '../actions/LinkActions'
import RootStack from './RootStack'
import Loading from './Loading';
import FlashMessage from 'react-native-flash-message';
import Error from './Error';

    const ShareForm = (props) => {

    const {link,postLink,clearLink,copyLink,isAuth,error} = props
    const [url, setUrl] = useState(null)
    const [title, setTitle] = useState("")
    const [summary,setSummary] = useState("")
    const [category,setCategory] = useState("")
    const [thumbnail, setThumbnail] = useState("")
    const [hidden,setHidden] = useState(false)

    useEffect(() => {
             

      if (link) {
  
        console.log("LINK")
        setUrl(link.url)
        setThumbnail(link.thumbnail)
        setSummary(link.summary)
        setTitle(link.title) 
      }
  
     isAuth && !link &&  copyLink()
   
     return () => isAuth && link && clearLink()
    }, [link,isAuth])

    if (!isAuth) {
      
      return <RootStack />
    }

    if (error) {
      
     return <Error msg = {error} />
    }
  
    //handleShare performs the postLink function
    const handleShare = () => {
      
    postLink({url,summary,title,hidden,thumbnail,category},null)
    }
    return (
      
        <View style ={[STYLES.container]} >
           {!link ? <Loading /> : <React.Fragment>
            <Header containerStyle = {{backgroundColor:'#393e42',borderBottomColor:'transparent'}}  leftComponent = {{text:'Savelinks' , style:{color:'white',fontWeight:'600' ,fontSize:18}}} placement = 'left'  rightComponent = {<View>
  
  <Button type ="clear" title = "Save" titleStyle = {STYLES.text} onPress = {handleShare}/>
 
</View>

} />
        <ScrollView>
        <Card>
 
 <Input textContentType = 'URL'  onChangeText = {url => setUrl(url) }  value = {url} containerStyle = {{marginTop:20}} label = 'URL' placeholder = "Enter URL" />
  <React.Fragment>
  <Input placeholder ="Enter Title"  onChangeText ={(text) => setTitle(text) } value = {title}  label = 'Title'   />
  <Text style ={STYLES.helpText} >Must be less than 60 characters.</Text>

        <Input placeholder ="Enter Summary" multiline onChangeText = {(text) => setSummary(text) } label = 'Summary' value = {summary}  />
        <Text style ={STYLES.helpText} >Must be less than 250 characters.</Text> 
   </React.Fragment>
 <View>
 
 <Input onChangeText = {category => setCategory(category)}  value = {category} label = "Category" placeholder = "Enter Category"/>
 <Text style ={STYLES.helpText}> Category must be less than 60 characters. </Text>
 </View>
 <CheckBox checked = {hidden}  onPress= {() => setHidden(prev => !prev) } rightIcon title = 'Private'  />

    </Card>
        </ScrollView>
           </React.Fragment>   }
     
        </View>
    )
}


const mapStateToProps = (state) => ({
  
  link:state.links.link,
  isAuth:state.auths.isAuth,
  error:state.links.error

})
const mapDispatchToProps = {copyLink, postLink,clearLink};

export default connect(mapStateToProps,mapDispatchToProps)(ShareForm)
