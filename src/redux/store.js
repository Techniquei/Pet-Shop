import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { initialState } from './initialState'
import { rootReducer } from './reducers/rootReducer'

export const store = createStore(rootReducer, initialState, composeWithDevTools())
