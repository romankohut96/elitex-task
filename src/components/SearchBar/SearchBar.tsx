import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useDebounce } from '../../hooks/useDebounce'
import { Close2, Search } from '../../assets'
import styles from './search.module.scss'

const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const q = searchParams.get('q')
  const [searchItem, setSearchItem] = useState(q || '')
  const debouncedSearchItem = useDebounce(searchItem, 300)

  useEffect(() => {
    if (!debouncedSearchItem) {
      searchParams.delete('q')
      setSearchParams(searchParams)
    } else {
      setSearchParams({ q: debouncedSearchItem })
    }
  }, [debouncedSearchItem])

  return (
    <div className={styles.search}>
      <img
        src={Search}
        alt='search'
        height={30}
        width={30}
        onClick={() => setSearchItem('')}
      />
      <input
        placeholder='Search...'
        type={'search'}
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
      />
      <img
        src={Close2}
        alt='search'
        height={30}
        width={30}
        onClick={() => setSearchItem('')}
      />
    </div>
  )
}

export default SearchBar
