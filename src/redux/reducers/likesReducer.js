import { initialState } from '../initialState'
import { ADD_LIKE } from '../types'

export const likesReducer = (state = initialState.liked, action) => {
  const id = action.payload
  switch (action.type) {
    case ADD_LIKE:
      if (state.includes(id)) {
        return state.filter((e) => e !== action.payload)
      }
      return [...state, action.payload]

    default:
      return state
  }
}
