import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import {store,persistor} from '../Store'
import Loading from './Loading'
import ShareForm from './ShareForm'

const Share = () => {
    return (
        <Provider store = {store}>
<PersistGate loading = {<Loading />} persistor = {persistor}>
<ShareForm />
</PersistGate>

        </Provider>
    )
}

export default Share
