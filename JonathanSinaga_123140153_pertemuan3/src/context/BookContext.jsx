import React, { createContext, useContext, useState, useEffect } from 'react'

// Create Context
const BookContext = createContext()

// Custom Hook untuk menggunakan context
export const useBook = () => {
  const context = useContext(BookContext)
  if (!context) {
    throw new Error('useBook must be used within a BookProvider')
  }
  return context
}

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Load books from localStorage on component mount
  useEffect(() => {
    const loadBooksFromStorage = () => {
      try {
        const savedBooks = localStorage.getItem('personalBooks')
        if (savedBooks) {
          const parsedBooks = JSON.parse(savedBooks)
          setBooks(parsedBooks)
        }
      } catch (error) {
        console.error('Error loading books from localStorage:', error)
        // Jika ada error, set books ke array kosong
        setBooks([])
      }
    }

    loadBooksFromStorage()
  }, [])

  // Save books to localStorage whenever books change
  useEffect(() => {
    const saveBooksToStorage = () => {
      try {
        localStorage.setItem('personalBooks', JSON.stringify(books))
      } catch (error) {
        console.error('Error saving books to localStorage:', error)
      }
    }

    saveBooksToStorage()
  }, [books])

  // Add new book
  const addBook = (bookData) => {
    const newBook = {
      ...bookData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    setBooks(prevBooks => {
      const updatedBooks = [...prevBooks, newBook]
      return updatedBooks
    })

    return newBook.id // Return ID untuk redirect
  }

  // Edit existing book
  const editBook = (id, updatedBookData) => {
    setBooks(prevBooks =>
      prevBooks.map(book =>
        book.id === id 
          ? { 
              ...updatedBookData, 
              id, 
              createdAt: book.createdAt, // Pertahankan createdAt asli
              updatedAt: new Date().toISOString() 
            }
          : book
      )
    )
  }

  // Delete book
  const deleteBook = (id) => {
    setBooks(prevBooks => prevBooks.filter(book => book.id !== id))
  }

  // Get book by ID
  const getBookById = (id) => {
    return books.find(book => book.id === id)
  }

  // Filter and search books
  const getFilteredBooks = () => {
    let filtered = books

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(book => book.status === statusFilter)
    }

    // Apply search term
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase()
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(lowercasedSearch) ||
        book.author.toLowerCase().includes(lowercasedSearch)
      )
    }

    return filtered
  }

  // Get books statistics
  const getBooksStats = () => {
    const total = books.length
    const owned = books.filter(book => book.status === 'milik').length
    const reading = books.filter(book => book.status === 'baca').length
    const wishlist = books.filter(book => book.status === 'beli').length

    return {
      total,
      owned,
      reading,
      wishlist
    }
  }

  // Clear all books (optional feature)
  const clearAllBooks = () => {
    if (window.confirm('Are you sure you want to delete all books? This action cannot be undone.')) {
      setBooks([])
    }
  }

  // Export books to JSON (optional feature)
  const exportBooks = () => {
    const dataStr = JSON.stringify(books, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `book-collection-${new Date().toISOString().split('T')[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  // Import books from JSON (optional feature)
  const importBooks = (importedBooks) => {
    if (Array.isArray(importedBooks)) {
      // Validasi struktur data yang diimpor
      const validBooks = importedBooks.filter(book => 
        book.title && book.author && book.status
      ).map(book => ({
        ...book,
        id: book.id || Date.now().toString() + Math.random().toString(36).substr(2, 9),
        createdAt: book.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }))

      setBooks(prevBooks => [...prevBooks, ...validBooks])
      return validBooks.length
    }
    return 0
  }

  const value = {
    // State
    books,
    searchTerm,
    statusFilter,
    
    // Setters
    setSearchTerm,
    setStatusFilter,
    
    // CRUD Operations
    addBook,
    editBook,
    deleteBook,
    getBookById,
    
    // Filtered Data
    filteredBooks: getFilteredBooks(),
    
    // Statistics
    booksStats: getBooksStats(),
    
    // Utility Functions
    clearAllBooks,
    exportBooks,
    importBooks
  }

  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  )
}