import { initialState } from '../initialState'
import { SET_SEARCH } from '../types'

export const searchReducer = (state = initialState.searchLine, action) => {
  switch (action.type) {
    case SET_SEARCH:
      return action.payload

    default:
      return state
  }
}
