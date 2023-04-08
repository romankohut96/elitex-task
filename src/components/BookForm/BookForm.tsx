import { useFormik } from 'formik'
import { FC, useState } from 'react'
import { IBook } from '../../types/book'
import Modal from '../Modal/Modal'
import styles from './form.module.scss'

interface BookFormProps {
  book: IBook | null
  isEditMode: boolean
  onSubmit: ({ data, id }: { data: any; id?: number }) => void
  onClose: () => void
}

const BookForm: FC<BookFormProps> = ({
  book,
  isEditMode,
  onSubmit,
  onClose,
}) => {
  const [disabled, setDisabled] = useState(true)

  const validate = (values: IBook) => {
    const errors: any = {}

    if (!values.name) {
      errors.name = 'Field is required'
    }
    if (values.name.length > 70) {
      errors.name = 'Must be 70 characters or less'
    }

    if (!values.published) {
      errors.published = 'Field is required'
    }
    if (
      Number(values.published) < 1900 ||
      Number(values.published) > new Date().getFullYear()
    ) {
      errors.published = `Min value 1900, max value ${new Date().getFullYear()}`
    }

    if (!values.authore) {
      errors.authore = 'Field is required'
    }
    if (values.authore.length > 120) {
      errors.authore = 'Must be 120 characters or less'
    }

    //counter start from 1 because book has id key
    let counter = 1

    if (book) {
      for (const key in values) {
        // @ts-ignore
        if (values[key] == book[key]) {
          counter++
        }
      }
    }

    // @ts-ignore
    if (
      Object.keys(errors).length ||
      (book && counter === Object.keys(book).length)
    ) {
      setDisabled(true)
    } else {
      disabled && setDisabled(false)
    }

    return errors
  }

  const formik = useFormik({
    initialValues: {
      name: book?.name || '',
      published: book?.published || '',
      authore: book?.authore || '',
    },
    validate,
    onSubmit: (values: IBook) => {
      if (book && isEditMode) {
        onSubmit({ data: values, id: book.id })
      } else {
        onSubmit({ data: { ...values, id: Number(new Date()) } })
      }
    },
  })

  return (
    <Modal onClose={onClose} title={isEditMode ? 'Edit book' : 'Add book'}>
      <form className={styles.container} onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor='name'>Name</label>
          <input
            id='name'
            name='name'
            type='text'
            onChange={formik.handleChange}
            value={formik.values.name}
            className={formik.errors.name ? styles.error : ''}
          />
          {formik.errors.name ? <span>{formik.errors.name}</span> : null}
        </div>
        <div>
          <label htmlFor='published'>Published year</label>
          <input
            id='published'
            name='published'
            type='number'
            onChange={formik.handleChange}
            value={formik.values.published}
            className={formik.errors.published ? styles.error : ''}
          />
          {formik.errors.published ? (
            <span>{formik.errors.published}</span>
          ) : null}
        </div>
        <div>
          <label htmlFor='authore'>Authore</label>
          <input
            id='authore'
            name='authore'
            type='text'
            onChange={formik.handleChange}
            value={formik.values.authore}
            className={formik.errors.authore ? styles.error : ''}
          />
          {formik.errors.authore ? <span>{formik.errors.authore}</span> : null}
        </div>

        <button disabled={disabled} type='submit'>
          Submit
        </button>
      </form>
    </Modal>
  )
}

export default BookForm
