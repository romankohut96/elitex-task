import { FC, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

import { Plus } from '../../assets'
import { Pagination, BookForm, BooksList, ConfirmModal } from '../../components'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { bookAdd, bookDelete } from '../../redux/reducers/BookSlice'
import { IBook } from '../../types/book'

import styles from './books.module.scss'
import 'react-toastify/dist/ReactToastify.css'

const Books: FC = () => {
  const [searchParams] = useSearchParams()
  const dispatch = useAppDispatch()
  const searchItem = searchParams.get('q') || ''
  let { books, limit } = useAppSelector((state) => state.books)
  const [currentPage, setCurrentPage] = useState(1)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showBookModal, setShowBookModal] = useState(false)
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null)
  const [total, setTotal] = useState<number>(0)

  const booksList = useMemo(() => {
    const skip = (limit || 0) * (currentPage - 1)
    let bookArr = books.filter(
      (book) =>
        book.name
          .trim()
          .toLocaleLowerCase()
          .includes(searchItem.trim().toLocaleLowerCase()) ||
        book.published
          .trim()
          .toLocaleLowerCase()
          .includes(searchItem.trim().toLocaleLowerCase()) ||
        book.authore
          .trim()
          .toLocaleLowerCase()
          .includes(searchItem.trim().toLocaleLowerCase()),
    )
    setTotal(bookArr.length)
    if (bookArr.length <= skip) {
      setCurrentPage(1)
    }
    return bookArr.slice(skip, limit + skip)
  }, [currentPage, searchItem, books, total])

  const onClose = () => {
    showBookModal && setShowBookModal(false)
    showConfirmModal && setShowConfirmModal(false)
    selectedBook && setSelectedBook(null)
  }

  const handleAddBook = () => {
    setShowBookModal(true)
  }

  const handleDeleteBook = (product: IBook) => {
    setSelectedBook(product)
    setShowConfirmModal(true)
  }

  const notify = (message: string) => {
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    })
  }

  const onSubmit = async ({ data, id }: { data?: IBook; id?: number }) => {
    if (!data) {
      dispatch(bookDelete(id || 0))
      notify('Book successful deleted !')
    } else {
      dispatch(bookAdd(data))
      notify('Book successful added !')
    }
    onClose()
  }

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={() => handleAddBook()}>
        <img src={Plus} />
        <p>Add</p>
      </button>
      <BooksList books={booksList} handleDeleteBook={handleDeleteBook} />
      {total ? (
        <Pagination
          currentPage={currentPage}
          total={total}
          limit={limit || 0}
          onPageChange={setCurrentPage}
        />
      ) : (
        ' '
      )}
      {showBookModal ? (
        <BookForm
          book={selectedBook}
          isEditMode={false}
          onSubmit={onSubmit}
          onClose={onClose}
        />
      ) : (
        ''
      )}
      {showConfirmModal ? (
        <ConfirmModal
          onClose={onClose}
          onSubmit={() => onSubmit({ id: selectedBook?.id })}
          title={'Confirm delete'}
          description={`Are you sure you want to remove book "${selectedBook?.name}"`}
        />
      ) : (
        ''
      )}
      <ToastContainer
        position='bottom-center'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </div>
  )
}

export default Books
