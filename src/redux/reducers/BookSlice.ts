import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { booksList } from '../../mocks/books'
import { IBook } from '../../types/book'

interface IinitialState {
  books: IBook[]
  limit: number
}

const initialState: IinitialState = {
  books: [...booksList],
  limit: 10,
}

export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    bookAdd(state, action: PayloadAction<IBook>) {
      state.books.unshift(action.payload)
    },
    bookUpdate(state, action: PayloadAction<IBook>) {
      const newProducts = state.books.map((book) => {
        if (book.id === action.payload.id) {
          return { ...action.payload }
        }
        return book
      })
      state.books = newProducts
    },
    bookDelete(state, action: PayloadAction<number>) {
      const newProducts = state.books.filter(
        (book) => book.id !== action.payload,
      )
      state.books = newProducts
    },
  },
})

export const { bookAdd, bookUpdate, bookDelete } = bookSlice.actions

export default bookSlice.reducer
