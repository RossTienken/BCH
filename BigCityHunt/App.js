import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import firebase from 'firebase'
import ReduxThunk from 'redux-thunk'
import reducers from './src/reducers'
import config from './firebaseConfig'

import FluxRouter from './src/components/FluxRouter'

class App extends Component {
  componentWillMount(){
    if (!firebase.apps.length) {
      firebase.initializeApp(config)
    }
  }

  render() {
    console.disableYellowBox = true
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))
    return (
      <Provider store={ store }>
        <FluxRouter />
      </Provider>
    )
  }
}

export default App
