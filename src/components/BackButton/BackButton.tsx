import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from '../../assets'
import styles from './backButton.module.scss'

const BackButton: FC = () => {
  const navigate = useNavigate()
  return (
    <>
      <button className={styles.button} onClick={() => navigate(-1)}>
        <img src={ArrowLeft} />
        <p>Go Back</p>
      </button>
    </>
  )
}

export default BackButton
