import { combineReducers } from 'redux'
import { cartReducer } from './cartReducer'
import { likesReducer } from './likesReducer'
import { searchReducer } from './searchReducer'
import { tokenReducer } from './tokenReducer'

export const rootReducer = combineReducers({
  token: tokenReducer,
  cart: cartReducer,
  searchLine: searchReducer,
  liked: likesReducer,
})
