import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { BookProvider } from './context/BookContext'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import AddBookPage from './pages/AddBookPage'
import EditBookPage from './pages/EditBookPage'

function App() {
  return (
    <BookProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add" element={<AddBookPage />} />
            <Route path="/edit/:id" element={<EditBookPage />} />
            {/* Fallback route */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Layout>
      </Router>
    </BookProvider>
  )
}

export default App