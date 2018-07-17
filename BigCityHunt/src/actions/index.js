import axios from 'axios'
import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'
import { TO_LOGIN, REVIEW_TEXT, SUBMIT_REVIEW, CURRENT_USER } from './types'

export const currentUser = (id) => {
  return{
      type: CURRENT_USER,
      payload: id
  }
}

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

export const reviewText = (text) => {
  return(dispatch)=>{
    dispatch({
      type: REVIEW_TEXT,
      payload: text
    })
  }
}

export const submitReview = (text, huntID, user) => {
  console.log(text, huntID, user)
  firebase.database().ref('reviews/' + huntID).set({
    user: text
  });
}
