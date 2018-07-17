import React from 'react'
import { Scene, Router, Actions } from 'react-native-router-flux'

import Home from './Home'
import Login from './Login'
import Maps from './Maps'


const FluxRouter=()=>{
  return (
    <Router>
      <Scene key='root' hideNavBar>
        <Scene
            hideNavBar
            navBar={null}
            key="home"
            component={ Home }/>
        <Scene key="login"
          hideNavBar
          navBar={null}
          component={ Login }
          />
        <Scene key="maps"
          hideNavBar
          navBar={null}
          component={ Maps }
          />
      </Scene>
    </Router>
  )
}

export default FluxRouter
