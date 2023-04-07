import { FC, FormEvent } from 'react'
import Modal from '../Modal/Modal'
import styles from './confirmModal.module.scss'

interface ModalProps {
  onClose: () => void
  onSubmit: () => void
  title: string
  description: string
}

const ConfirmModal: FC<ModalProps> = ({
  onClose,
  onSubmit,
  title,
  description,
}) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit()
  }
  return (
    <Modal onClose={onClose} title={title}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <p>{description}</p>
        <div>
          <button className={styles.actionConfirm} type='submit'>
            Delete
          </button>
          <button className={styles.actionCancel} onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default ConfirmModal
