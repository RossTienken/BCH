import { HOME_PRESSED } from '../actions/types'


const INITIAL_STATE = {
  home: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type){
    case HOME_PRESSED:
    return { ...state, home: pressed}
  }
}
