import axios from 'axios'
import { Actions } from 'react-native-router-flux'
import { HOME_PRESSED } from './types'

export function signInWithFacebook(facebookToken, successCB, errorCB) {
  return (dispatch) => {
    api.signInWithFacebook(facebookToken, function (success, data, error) {
      if (success) {
        if (data.exists) dispatch({type: t.LOGGED_IN, data: data.user})
        successCB(data)
      }else if (error) errorCB(error)
    })
  }
}
