import { initialState } from '../initialState'
import { SET_TOKEN } from '../types'

export const tokenReducer = (state = initialState.token, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return action.payload

    default:
      return state
  }
}
