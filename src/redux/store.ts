import { combineReducers, configureStore } from '@reduxjs/toolkit'
import BookSlice from './reducers/BookSlice'

const rootReducer = combineReducers({
  books: BookSlice,
})

export const store = configureStore({ reducer: rootReducer })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
