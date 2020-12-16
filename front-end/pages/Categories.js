
import React ,{useState,useEffect,useCallback} from 'react'
import { View  , FlatList,ActivityIndicator} from 'react-native'
import {Card,  Divider,Text,Input,Button} from 'react-native-elements';
import { connect } from 'react-redux'
import { getFilterLinks } from "../actions/LinkActions";
import {postCategory,deleteCategory,updateCategory,getMoreCategories,getCategories}  from '../actions/CategoryActions'
import {setNext} from '../actions/NextActions'
import EditCategory from '../components/EditCategory'
import {selectUniqueCategory} from '../selectors/index'
import { BASEURL } from '../CONSTANTS';
import {STYLES} from '../StyleSheet'
import CategoryItem from '../components/CategoryItem';


const Categories = (props) => {

    const url = new URL('categories',BASEURL).toString()


    useEffect(() => {
       
      props.getCategories()
      if (!props.next) {
        props.setNext(url,'nextCategory')
      }

    },[props.links])



    const [isVisible, setisVisible] = useState(false)
    const  [input, setInput] = useState('')
    const [category, setCategory] = useState('')
    const {categories,isLoading} = props

    //toggleModal toggles the modal
    const toggleModal = () => setisVisible(!isVisible)
    
    //openModal opens the modal and set category to item
    const openModal = (item) =>  {
        toggleModal()
        setCategory(item)
    }

    //handleCategory adds a category and clears input state
    const handleCategory= () => {

     props.postCategory({name:input})
     setInput('')
  
    }
    //handleFilterLinks filter links by the name parameter and navigate to the FilteredLinks page.
    const handleFilterLinks = (name) => {


        props.getFilterLinks(name)
        props.navigation.navigate('FilteredLinks',{name} )
    }

    //handleGetMore gets more categories that has a given URL named of next ,set the next url amd map it to state with nextKey parameter
    const handleGetMore =  useCallback((next,nextkey) => {

       
        if (next) {
            props.getMoreCategories(next)
            props.setNext(next,nextkey)   
        }
      
        }, []);



const renderFooter = () => isLoading && (<View style = {{marginTop:14}} ><ActivityIndicator color = "blue" size = "large" /></View>)

const renderItem = ({item}) => (

  <CategoryItem openModal = {openModal} handleFilterLinks = {handleFilterLinks}  item = {item} />

)


    return (
      <View style = {STYLES.container} >
              
        <View  style = {{marginBottom:300}} >
       
            <EditCategory setInput = {setInput} input={input} updateCategory = {props.updateCategory} category = {category} isVisible ={isVisible} toggleModal = {toggleModal} />
            <Card>
               <Input value ={input} onChangeText = {(text) => setInput(text)} label = " Category" placeholder = 'Enter Category' />
               <Text  style ={STYLES.helpText} >Must be less than 60 charcters</Text>
               <Button onPress= { handleCategory } buttonStyle = {{backgroundColor:"#393e42",marginTop:10}} title = "Add Category" />
           </Card>
            
            

          
       
    
           
   {
  categories.length ?
 
           <Card  containerStyle = {{marginBottom:250}} >
     
        <FlatList ListFooterComponent = {renderFooter} onEndReached = {() => handleGetMore(props.next,'nextCategory')} onEndReachedThreshold = {.05} keyExtractor = {(item) => item.id.toString()} data = {categories}  renderItem ={renderItem}/>
      
        <Divider />
        </Card> : null
        }
        
        </View>

        
       
  
        </View>
    )
}

const mapStateToProps = (state) => ({
    categories:selectUniqueCategory(state),
    next:state.nexts.nextCategory,
    category:state.categories.category,
    links:state.links.links,
    isLoading:state.categories.isLoading
    
})

const mapDispatchToProps = {
    postCategory,
    deleteCategory,
    updateCategory,
    getFilterLinks,
    setNext,
    getMoreCategories,
    getCategories,

}


export default connect(mapStateToProps,mapDispatchToProps) (Categories)

