import { TO_LOGIN, REVIEW_TEXT, SUBMIT_REVIEW, CURRENT_USER } from '../actions/types'

const INITIAL_STATE = {
  hunts: {},
  review: '',
  userID: ''
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type){
    case TO_LOGIN:
      return { ...state, hunts: action.payload}
    case CURRENT_USER:
      return { ...state, userID: action.payload}
    case REVIEW_TEXT:
      return { ...state, review: action.payload}
    case SUBMIT_REVIEW:
      return { ...state, review: ''}
    default:
       return state
  }
}
