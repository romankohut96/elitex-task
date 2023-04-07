import { FC, memo } from 'react'
import styles from './pagination.module.scss'

interface PaginationProps {
  currentPage: number
  total: number
  limit: number
  onPageChange: (value: number) => void
}

const range = (start: number, end: number) => {
  return [...Array(end).keys()].map((el) => el + start)
}

const Pagination: FC<PaginationProps> = memo(
  ({ currentPage, total, limit, onPageChange }) => {
    const pagesCount = Math.ceil(total / limit)
    const pages = range(1, pagesCount)
    return (
      <div className={styles.pagination}>
        {pages.map((page) => (
          <button
            key={page}
            className={`${styles.button} ${
              currentPage === page ? styles.active : ''
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
    )
  },
)

export default Pagination
