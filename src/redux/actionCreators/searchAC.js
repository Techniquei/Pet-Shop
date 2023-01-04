import { SET_SEARCH } from '../types'

export const setSearchAC = (line) => ({
  type: SET_SEARCH,
  payload: line,
})
