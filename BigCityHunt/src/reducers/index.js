import { LOGIN_FACEBOOK } from '../actions/types'


const INITIAL_STATE = {
  home: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type){
    case LOGIN_FACEBOOK:
    return { ...state, home: pressed}
  }
}
