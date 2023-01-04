import { SET_TOKEN } from '../types'

export const setTokenAC = (token) => ({
  type: SET_TOKEN,
  payload: {
    token,
  },
})
