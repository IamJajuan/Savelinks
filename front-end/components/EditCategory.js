import React,{useState} from 'react'
import { View } from 'react-native'
import Modal from 'react-native-modal'
import {Card , Input,Button} from 'react-native-elements';




const EditCategory = (props) => {

const {isVisible, toggleModal,category} = props
const [input, setInput] = useState('')

//handleUpdate updates category and toggles modal
const handleUpdate = () => {
 props.updateCategory(category.id, {name:input} )

  toggleModal()
  setInput("  ")
  
}


    return (
        <View  >
      
         <Modal onBackdropPress = {toggleModal} isVisible={isVisible}>
        <View style={{ flex: 1 }}>
         <Card >
<Input onChangeText = {(text) => setInput(text)}  label = "Category name"  defaultValue = {category.name}/>
<Button onPress = {() => handleUpdate()} buttonStyle = {{backgroundColor:"#393e42"}} title = "Update" />

         </Card>
        </View>
      </Modal>
        </View>
    )
}

export default EditCategory
