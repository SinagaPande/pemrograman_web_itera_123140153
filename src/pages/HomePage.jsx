import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useBook } from '../context/BookContext'
import BookStats from '../components/BookStats'
import SearchBar from '../components/SearchBar'
import BookCard from '../components/BookCard'

const HomePage = () => {
  const { 
    books, 
    filteredBooks, 
    searchTerm, 
    setSearchTerm, 
    statusFilter, 
    setStatusFilter,
    deleteBook,
    clearAllBooks,
    exportBooks
  } = useBook()

  // Statistics untuk filtered books
  const filteredStats = useMemo(() => {
    const filtered = filteredBooks
    return {
      total: filtered.length,
      owned: filtered.filter(book => book.status === 'milik').length,
      reading: filtered.filter(book => book.status === 'baca').length,
      wishlist: filtered.filter(book => book.status === 'beli').length
    }
  }, [filteredBooks])

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleFilterChange = (filter) => {
    setStatusFilter(filter)
  }

  const handleDeleteBook = (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      deleteBook(id)
    }
  }

  const handleExport = () => {
    exportBooks()
  }

  const handleClearAll = () => {
    clearAllBooks()
  }

  // Get status label
  const getStatusLabel = (status) => {
    const labels = {
      milik: 'Owned',
      baca: 'Reading', 
      beli: 'Wishlist'
    }
    return labels[status] || status
  }

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1>📚 My Books Collection</h1>
        <p style={{ color: '#666', marginTop: '10px' }}>
          Manage your personal book collection with powerful search and filters
        </p>
      </div>

      {/* Enhanced Search and Filter */}
      <SearchBar
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        initialSearchTerm={searchTerm}
        initialFilter={statusFilter}
        placeholder="Search by title, author, or description..."
        showFilter={true}
        showSort={true}
      />

      {/* Filter Results Summary */}
      {(searchTerm || statusFilter !== 'all') && (
        <div className="card" style={{ 
          background: '#f8f9fa',
          borderLeft: '4px solid #007bff'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h4 style={{ margin: 0, color: '#007bff' }}>Filter Results</h4>
              <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '14px' }}>
                {searchTerm && `Search: "${searchTerm}"`}
                {searchTerm && statusFilter !== 'all' && ' • '}
                {statusFilter !== 'all' && `Status: ${getStatusLabel(statusFilter)}`}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <span style={{
                background: '#007bff',
                color: 'white',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'} found
              </span>
              <button 
                className="btn btn-outline-secondary"
                onClick={() => {
                  setSearchTerm('')
                  setStatusFilter('all')
                }}
                style={{
                  border: '1px solid #6c757d',
                  color: '#6c757d',
                  background: 'transparent'
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Statistics */}
      <BookStats />

      {/* Quick Actions */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <strong>Collection Summary:</strong>
            <span style={{ marginLeft: '10px', color: '#666' }}>
              {books.length} total books • {filteredBooks.length} showing
            </span>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Link to="/add" className="btn btn-primary">
              ➕ Add New Book
            </Link>
            {books.length > 0 && (
              <>
                <button 
                  className="btn btn-success"
                  onClick={handleExport}
                >
                  📤 Export Collection
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={handleClearAll}
                >
                  🗑️ Clear All Books
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
          <h3 style={{ margin: 0 }}>
            {filteredBooks.length === books.length ? 'All Books' : 'Filtered Books'}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
            <div style={{ 
              fontSize: '14px', 
              color: '#666',
              background: '#f8f9fa',
              padding: '6px 12px',
              borderRadius: '20px'
            }}>
              <strong>{filteredBooks.length}</strong> of <strong>{books.length}</strong> books
            </div>
          </div>
        </div>

        {filteredBooks.length === 0 ? (
          <div className="empty-state">
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>🔍</div>
            <h3>No books found</h3>
            <p style={{ marginBottom: '10px' }}>
              {books.length === 0 
                ? "You don't have any books in your collection yet."
                : "No books match your search criteria."}
            </p>
            {books.length === 0 ? (
              <Link to="/add" className="btn btn-primary">
                Add Your First Book
              </Link>
            ) : (
              <button 
                className="btn btn-secondary"
                onClick={() => {
                  setSearchTerm('')
                  setStatusFilter('all')
                }}
              >
                Clear Search & Filters
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Filtered Books Statistics */}
            {filteredBooks.length !== books.length && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: '10px',
                marginBottom: '20px',
                padding: '15px',
                background: '#f8f9fa',
                borderRadius: '8px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1976d2' }}>
                    {filteredStats.total}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>Total</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#2e7d32' }}>
                    {filteredStats.owned}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>Owned</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#ef6c00' }}>
                    {filteredStats.reading}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>Reading</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#c2185b' }}>
                    {filteredStats.wishlist}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>Wishlist</div>
                </div>
              </div>
            )}

            {/* Books Grid */}
            <div className="grid grid-3">
              {filteredBooks.map(book => (
                <BookCard
                  key={book.id}
                  book={book}
                  onDelete={handleDeleteBook}
                  className="fade-in"
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default HomePage