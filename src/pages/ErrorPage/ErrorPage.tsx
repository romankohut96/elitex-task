import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './errorPage.module.scss'

const ErrorPage: FC = () => {
  return (
    <div className={styles.container}>
      <div>
        <h1>404</h1>
        <h2>This page could not be found.</h2>
      </div>
      <NavLink to={'/books'}>Go to main page</NavLink>
    </div>
  )
}

export default ErrorPage
