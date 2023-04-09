import { FC, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Edit, EyeOpen, Trash } from '../../assets'
import { IBook } from '../../types/book'
import styles from './booksList.module.scss'

interface TableProps {
  books: IBook[]
  handleDeleteBook: (book: IBook) => void
}

const columns = ['Name', 'Published', 'Authore', 'Actions']

const BooksList: FC<TableProps> = ({ books, handleDeleteBook }) => {
  const navigate = useNavigate()
  const [sortBy, setSortBy] = useState('name')

  const booksList = useMemo(() => {
    if (books && books.length) {
      const arrayForSort = [...books]
      arrayForSort.sort((a: any, b: any) => {
        let firstItem = a[sortBy]
        let secondItem = b[sortBy]

        if (sortBy !== 'published') {
          firstItem = a[sortBy].toLowerCase()
          secondItem = b[sortBy].toLowerCase()
        }

        if (firstItem > secondItem) {
          return 1
        }
        if (firstItem < secondItem) {
          return -1
        }
        return 0
      })
      return arrayForSort
    }
  }, [books, sortBy])

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th
              key={column}
              className={sortBy === column.toLowerCase() ? styles.active : ''}
              onClick={() => {
                if (index + 1 !== columns.length) {
                  setSortBy(column.toLowerCase())
                }
              }}
            >
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {booksList?.map((book) => (
          <tr key={book.id}>
            <td>{book.name}</td>
            <td className={styles.textCenter}>{book.published}</td>
            <td className={styles.textCenter}>{book.authore}</td>
            <td className={styles.actions}>
              <img
                src={Trash}
                alt='delete'
                onClick={() => handleDeleteBook(book)}
              />
              <img
                src={Edit}
                alt='edit'
                onClick={() => navigate(`/books/${book.id}/edit`)}
              />
              <img
                src={EyeOpen}
                alt='preview'
                onClick={() => navigate(`/books/${book.id}`)}
              />
            </td>
          </tr>
        ))}
        {!booksList?.length ? (
          <tr>
            <td colSpan={columns.length} className={styles.textCenter}>
              No data
            </td>
          </tr>
        ) : (
          ''
        )}
      </tbody>
    </table>
  )
}

export default BooksList
