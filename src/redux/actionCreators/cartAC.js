import {
  ADD_TO_CART, DECREMENT_IN_CART, INCREMENT_IN_CART, REMOVE_FROM_CART, SELECT_IN_CART,
} from '../types'

export const addToCartAC = (id) => ({
  type: ADD_TO_CART,
  payload: { id, count: 1, checked: true },
})

export const removeFromCartAC = (id) => ({
  type: REMOVE_FROM_CART,
  payload: id,
})

export const incrementInCart = (id) => ({
  type: INCREMENT_IN_CART,
  payload: id,
})

export const decrementInCart = (id) => ({
  type: DECREMENT_IN_CART,
  payload: id,
})

export const selectInCart = (id) => ({
  type: SELECT_IN_CART,
  payload: id,
})
