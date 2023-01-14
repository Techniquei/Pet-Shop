import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: '',
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch: {
      reducer(state, action) {
        state.value = action.payload
      },
    },
  },
})

export const { setSearch } = searchSlice.actions

export const searchReducer = searchSlice.reducer
