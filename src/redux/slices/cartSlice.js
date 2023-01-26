import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'

const initialState = {
  value: localStorage.getItem('store') !== null ? JSON.parse(localStorage.getItem('store')).cart.value : [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: {
      reducer(state, action) {
        const id = action.payload
        const newProduct = { id, count: 1, checked: true }
        state.value = _.uniqBy([...state.value, newProduct], 'id')
      },
    },
    removeFromCart: {
      reducer(state, action) {
        state.value = state.value.filter((e) => e.id !== action.payload)
      },
    },
    incrementInCart: {
      reducer(state, action) {
        state.value = state.value.map((e) => {
          if (e.id === action.payload) {
            return { ...e, count: e.count + 1 }
          }
          return e
        })
      },
    },
    decrementInCart: {
      reducer(state, action) {
        state.value = state.value.map((e) => {
          if (e.id === action.payload && e.count > 1) {
            return { ...e, count: e.count - 1 }
          }
          return e
        })
      },
    },
    selectInCart: {
      reducer(state, action) {
        state.value = state.value.map((e) => {
          if (e.id === action.payload) {
            return { ...e, checked: !e.checked }
          }
          return e
        })
      },
    },
  },
})

export const {
  addToCart, removeFromCart, incrementInCart, decrementInCart, selectInCart,
} = cartSlice.actions

export const cartReducer = cartSlice.reducer
