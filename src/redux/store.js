import { configureStore, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import {
  addToCart, cartReducer, decrementInCart, incrementInCart, removeFromCart, selectInCart,
} from './slices/cartSlice'
import { likesReducer, setLike } from './slices/likesSlice'
import { searchReducer } from './slices/searchSlice'
import { setToken, tokenReducer } from './slices/tokenSlice'

const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
  matcher: isAnyOf(addToCart, removeFromCart, incrementInCart, decrementInCart, selectInCart, setLike, setToken),
  effect: (action, listenerApi) => {
    const state = listenerApi.getState()
    localStorage.setItem('store', JSON.stringify(state))
  },
})

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    liked: likesReducer,
    searchLine: searchReducer,
    token: tokenReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})
