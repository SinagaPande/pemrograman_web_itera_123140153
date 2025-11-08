import React, { useState, useEffect } from 'react'

const SearchBar = ({
  onSearch,
  onFilterChange,
  placeholder = "Search books...",
  className = "",
  showFilter = true,
  showSort = true,
  initialSearchTerm = "",
  initialFilter = "all",
  initialSort = "newest"
}) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm)
  const [filter, setFilter] = useState(initialFilter)
  const [sort, setSort] = useState(initialSort)

  // Debounce search untuk performance
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm)
    }, 300) // 300ms delay

    return () => clearTimeout(timer)
  }, [searchTerm, onSearch])

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
  }

  const handleFilterChange = (e) => {
    const value = e.target.value
    setFilter(value)
    onFilterChange(value)
  }

  const handleSortChange = (e) => {
    const value = e.target.value
    setSort(value)
    // Jika perlu sorting, bisa ditambahkan callback
  }

  const clearSearch = () => {
    setSearchTerm('')
    onSearch('')
  }

  const statusOptions = [
    { value: 'all', label: '📚 All Books' },
    { value: 'milik', label: '✅ Owned' },
    { value: 'baca', label: '📖 Reading' },
    { value: 'beli', label: '⭐ Wishlist' }
  ]

  const sortOptions = [
    { value: 'newest', label: '🆕 Newest First' },
    { value: 'oldest', label: '📅 Oldest First' },
    { value: 'title-asc', label: '🔤 Title (A-Z)' },
    { value: 'title-desc', label: '🔤 Title (Z-A)' },
    { value: 'author-asc', label: '👤 Author (A-Z)' }
  ]

  return (
    <div className={`card ${className}`} style={{
      padding: '25px',
      marginBottom: '25px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        <div>
          <h3 style={{ margin: 0, color: 'white' }}>🔍 Search & Filter</h3>
          <p style={{ margin: '5px 0 0 0', opacity: 0.9, fontSize: '14px' }}>
            Find your books quickly
          </p>
        </div>
        
        {(searchTerm || filter !== 'all') && (
          <button
            onClick={() => {
              setSearchTerm('')
              setFilter('all')
              setSort('newest')
              onSearch('')
              onFilterChange('all')
            }}
            className="btn"
            style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.3)'
            }}
          >
            🗑️ Clear All
          </button>
        )}
      </div>

      {/* Search and Filter Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: showFilter && showSort ? '2fr 1fr 1fr' : showFilter ? '2fr 1fr' : '1fr',
        gap: '15px',
        alignItems: 'end'
      }}>
        {/* Search Input */}
        <div style={{ position: 'relative' }}>
          <label className="form-label" style={{ color: 'white' }}>
            🔎 Search Books
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder={placeholder}
              className="form-input"
              style={{
                paddingRight: '40px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px'
              }}
            />
            {searchTerm ? (
              <button
                onClick={clearSearch}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  fontSize: '18px',
                  color: '#999',
                  cursor: 'pointer',
                  padding: '0',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ×
              </button>
            ) : (
              <div style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#999'
              }}>
                🔍
              </div>
            )}
          </div>
          <div style={{
            fontSize: '12px',
            color: 'rgba(255,255,255,0.8)',
            marginTop: '5px'
          }}>
            Search by title, author, or description
          </div>
        </div>

        {/* Filter Dropdown */}
        {showFilter && (
          <div>
            <label className="form-label" style={{ color: 'white' }}>
              📊 Filter by Status
            </label>
            <select
              value={filter}
              onChange={handleFilterChange}
              className="form-select"
              style={{
                border: 'none',
                borderRadius: '8px'
              }}
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Sort Dropdown */}
        {showSort && (
          <div>
            <label className="form-label" style={{ color: 'white' }}>
              🔄 Sort By
            </label>
            <select
              value={sort}
              onChange={handleSortChange}
              className="form-select"
              style={{
                border: 'none',
                borderRadius: '8px'
              }}
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Active Filters Display */}
      {(searchTerm || filter !== 'all') && (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          marginTop: '15px',
          paddingTop: '15px',
          borderTop: '1px solid rgba(255,255,255,0.2)'
        }}>
          <strong style={{ color: 'white', fontSize: '14px' }}>Active Filters:</strong>
          
          {searchTerm && (
            <span style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '12px',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}>
              🔍 Search: "{searchTerm}"
              <button
                onClick={() => {
                  setSearchTerm('')
                  onSearch('')
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  padding: '0',
                  marginLeft: '5px'
                }}
              >
                ×
              </button>
            </span>
          )}
          
          {filter !== 'all' && (
            <span style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '12px',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}>
              📊 Status: {statusOptions.find(opt => opt.value === filter)?.label}
              <button
                onClick={() => {
                  setFilter('all')
                  onFilterChange('all')
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  padding: '0',
                  marginLeft: '5px'
                }}
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}

      {/* Search Tips */}
      <div style={{
        fontSize: '12px',
        color: 'rgba(255,255,255,0.8)',
        marginTop: '15px',
        paddingTop: '15px',
        borderTop: '1px solid rgba(255,255,255,0.2)'
      }}>
        <strong>💡 Search Tips:</strong> You can search by book title, author name, or any keyword in the description.
      </div>
    </div>
  )
}

export default SearchBar