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
  const [touched, setTouched] = useState({
    name: false,
    published: false,
    authore: false,
  })

  const validate = (values: IBook) => {
    const errors: any = {}
    const isNameRequired = !values.name && touched.name
    const isNameInvalid = values.name.length > 70 && touched.name
    const isPublishedRequired = !values.published && touched.published
    const isPusblisedInvalid =
      (Number(values.published) < 1900 ||
        Number(values.published) > new Date().getFullYear()) &&
      touched.published
    const isAuthoreRequired = !values.authore && touched.authore
    const isAuthoreInvalid = values.authore.length > 120 && touched.authore

    if (isNameRequired) {
      errors.name = 'Field is required'
    }
    if (isNameInvalid) {
      errors.name = 'Must be 70 characters or less'
    }
    if (isPusblisedInvalid) {
      errors.published = `Min value 1900, max value ${new Date().getFullYear()}`
    }
    if (isPublishedRequired) {
      errors.published = 'Field is required'
    }

    if (isAuthoreRequired) {
      errors.authore = 'Field is required'
    }
    if (isAuthoreInvalid) {
      errors.authore = 'Must be 120 characters or less'
    }

    //counter start from 1 because book has id key
    let counter = 1
    //check if value is changed
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
    }

    if (!Object.keys(errors).length && disabled) {
      if (isEditMode) {
        setDisabled(false)
      } else {
        const isFieldEmpty = Object.values(touched).some((item) => !item)
        !isFieldEmpty && setDisabled(false)
      }
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
            onFocus={() => setTouched({ ...touched, name: true })}
            onChange={formik.handleChange}
            value={formik.values.name}
            className={formik.errors.name && touched.name ? styles.error : ''}
          />
          {formik.errors.name && touched.name ? (
            <span>{formik.errors.name}</span>
          ) : null}
        </div>
        <div>
          <label htmlFor='published'>Published year</label>
          <input
            id='published'
            name='published'
            type='number'
            onFocus={() => setTouched({ ...touched, published: true })}
            onChange={formik.handleChange}
            value={formik.values.published}
            className={
              formik.errors.published && touched.published ? styles.error : ''
            }
          />
          {formik.errors.published && touched.published ? (
            <span>{formik.errors.published}</span>
          ) : null}
        </div>
        <div>
          <label htmlFor='authore'>Authore</label>
          <input
            id='authore'
            name='authore'
            type='text'
            onFocus={() => setTouched({ ...touched, authore: true })}
            onChange={formik.handleChange}
            value={formik.values.authore}
            className={
              formik.errors.authore && touched.authore ? styles.error : ''
            }
          />
          {formik.errors.authore && touched.authore ? (
            <span>{formik.errors.authore}</span>
          ) : null}
        </div>

        <button disabled={disabled} type='submit'>
          Submit
        </button>
      </form>
    </Modal>
  )
}

export default BookForm
