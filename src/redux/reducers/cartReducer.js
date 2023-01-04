import _ from 'lodash'
import { initialState } from '../initialState'
import {
  ADD_TO_CART, DECREMENT_IN_CART, INCREMENT_IN_CART, REMOVE_FROM_CART,
} from '../types'

export const cartReducer = (state = initialState.cart, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return _.uniqBy([...state, action.payload], 'id')
    case REMOVE_FROM_CART:
      return state.filter((e) => e.id !== action.payload)
    case INCREMENT_IN_CART:
      return state.map((e) => {
        if (e.id === action.payload) {
          return { ...e, count: e.count + 1 }
        }
        return e
      })
    case DECREMENT_IN_CART:
      return state.map((e) => {
        if (e.id === action.payload && e.count > 1) {
          return { ...e, count: e.count - 1 }
        }
        return e
      })
    default:
      return state
  }
}
