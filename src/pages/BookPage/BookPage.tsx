import React, { memo, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Edit } from '../../assets'
import { BackButton, BookForm } from '../../components'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { bookUpdate } from '../../redux/reducers/BookSlice'
import { IBook } from '../../types/book'
import styles from './bookPage.module.scss'

const BookPage = memo(() => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { id, mode } = useParams()
  const { books } = useAppSelector((state) => state.books)
  const [isEditMode, setIsEditMode] = useState(false)

  const handleEditBook = () => {
    setIsEditMode(true)
    navigate(`/books/${book?.id}/edit`, { replace: true })
  }

  useEffect(() => {
    if (mode) {
      handleEditBook()
    }
  }, [mode])

  useEffect(() => {}, [])
  const book = useMemo(() => {
    if (books && books.length) {
      const previewBook = books.find((book) => book.id === Number(id))
      return previewBook ? previewBook : null
    }

    return null
  }, [books])

  const onClose = () => {
    setIsEditMode(false)
    navigate(`/books/${book?.id}`, { replace: true })
  }

  const onSubmit = async ({ data }: { data?: IBook }) => {
    if (data) {
      dispatch(bookUpdate(data))
    }
    onClose()
  }

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>{book?.name}</h1>
          <button className={styles.button} onClick={() => handleEditBook()}>
            <img src={Edit} />
          </button>
        </div>
        <p>{`Published year: ${book?.published}`}</p>
        <p>{`Authore: ${book?.authore}`}</p>
        <BackButton />
        {isEditMode ? (
          <BookForm
            book={book}
            onClose={onClose}
            isEditMode={isEditMode}
            onSubmit={onSubmit}
          />
        ) : (
          ''
        )}
      </div>
    </div>
  )
})

export default BookPage
