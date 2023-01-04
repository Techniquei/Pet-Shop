import { ADD_LIKE } from '../types'

export const likeAC = (id) => ({
  type: ADD_LIKE,
  payload: id,
})
