import { FC, ReactNode } from 'react'
import Header from '../Header/Header'
import styles from './layout.module.scss'

interface LayoutProps {
  children: ReactNode
}

const LayoutComponent: FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <div>{children}</div>
    </div>
  )
}

export default LayoutComponent
