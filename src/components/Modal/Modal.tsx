import { FC, ReactNode } from 'react'
import { Close2 } from '../../assets'
import styles from './modal.module.scss'

interface ModalProps {
  onClose: () => void
  children: ReactNode
  title: string
}

const Modal: FC<ModalProps> = ({ onClose, children, title }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>{title}</h1>
          <img src={Close2} onClick={onClose} />
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal
