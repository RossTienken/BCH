import { TO_LOGIN } from '../actions/types'

const INITIAL_STATE = {
  hunts: {},
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type){
    case TO_LOGIN:
      return { ...state, hunts: action.payload}
    default:
       return state
  }
}
