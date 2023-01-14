import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // value: JSON.parse(localStorage.getItem('store')).liked.value,
  value: localStorage.getItem('store') !== null ? JSON.parse(localStorage.getItem('store')).liked.value : [],

}

const likeSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {
    setLike: {
      reducer(state, action) {
        const id = action.payload
        if (state.value.includes(id)) {
          state.value = state.value.filter((e) => e !== action.payload)
        } else {
          state.value = [...state.value, id]
        }
      },
    },
  },
})

export const { setLike } = likeSlice.actions

export const likesReducer = likeSlice.reducer
