import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // value: JSON.parse(localStorage.getItem('store')).token.value,
  value: localStorage.getItem('store') !== null ? JSON.parse(localStorage.getItem('store')).token.value : '',
}

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: {
      reducer(state, action) {
        state.value = action.payload
      },
    },
  },
})

export const { setToken } = tokenSlice.actions

export const tokenReducer = tokenSlice.reducer
