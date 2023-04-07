import { FC } from 'react'
import { useLocation } from 'react-router-dom'
import BackButton from '../BackButton/BackButton'

import SearchBar from '../SearchBar/SearchBar'
import styles from './header.module.scss'

const Header: FC = () => {
  const location = useLocation()
  const isBooksPage = location.pathname.endsWith('books')
  return (
    <header className={styles.header}>
      {isBooksPage ? <SearchBar /> : ''}
    </header>
  )
}

export default Header
