import * as React from 'react';
import { WebView } from 'react-native-webview';


const Detail = ({route} ) => {

    
    return (
     
        <WebView source = {{uri:route.params?.url }} />
     
    )
}

export default Detail
