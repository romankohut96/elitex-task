import { Navigate, Route, Routes } from 'react-router-dom'
import { LayoutComponent } from './components'
import { ErrorPage, BookPage, Books } from './pages'

const App = () => {
  return (
    <LayoutComponent>
      <Routes>
        <Route path='*' element={<ErrorPage />} />
        <Route path='/' element={<Navigate to={'books'} replace />} />
        <Route path='books'>
          <Route index element={<Books />} />
          <Route path=':id'>
            <Route index element={<BookPage />} />
            <Route path=':mode' element={<BookPage />} />
          </Route>
        </Route>
      </Routes>
    </LayoutComponent>
  )
}

export default App
