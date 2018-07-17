import axios from 'axios'
import { Actions } from 'react-native-router-flux'
import { TO_LOGIN } from './types'

export const toLogin = () => {
  return (dispatch) => {
    axios.get('https://www.scavengerhunt.com/app/ios_ajax_json_hunt_locations.php/ios_ajax_hunt_locations.php?password=asf4fvadfv31das')
      .then(response => {
        dispatch({ type: TO_LOGIN, payload: response.data })
    }).catch( error => {
      console.log('error from apiGetRequest ==>', error);
    })
  }
}
