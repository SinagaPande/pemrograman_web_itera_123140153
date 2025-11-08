import React from 'react'
import { Link } from 'react-router-dom'

const BookCard = ({ 
  book, 
  onDelete, 
  showActions = true,
  className = '' 
}) => {
  const { id, title, author, status, createdAt } = book

  const getStatusInfo = (status) => {
    const statusMap = {
      milik: { label: 'Owned', color: '#28a745', bgColor: '#d4edda' },
      baca: { label: 'Reading', color: '#ffc107', bgColor: '#fff3cd' },
      beli: { label: 'Wishlist', color: '#17a2b8', bgColor: '#d1ecf1' }
    }
    return statusMap[status] || { label: status, color: '#6c757d', bgColor: '#e2e3e5' }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const statusInfo = getStatusInfo(status)

  return (
    <div className={`card ${className}`} style={{
      borderLeft: `4px solid ${statusInfo.color}`,
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)'
      e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)'
      e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
        <h3 style={{ 
          margin: 0, 
          fontSize: '1.3rem',
          color: '#2c3e50',
          lineHeight: '1.4'
        }}>
          {title}
        </h3>
        
        <span style={{
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: 'bold',
          backgroundColor: statusInfo.bgColor,
          color: statusInfo.color,
          border: `1px solid ${statusInfo.color}`
        }}>
          {statusInfo.label}
        </span>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <p style={{ 
          margin: '5px 0', 
          color: '#666',
          fontSize: '1rem'
        }}>
          <strong>Author:</strong> {author}
        </p>
        
        <p style={{ 
          margin: '5px 0', 
          color: '#999',
          fontSize: '0.85rem'
        }}>
          Added: {formatDate(createdAt)}
        </p>
      </div>

      {showActions && (
        <div style={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'flex-end',
          borderTop: '1px solid #eee',
          paddingTop: '15px',
          marginTop: '15px'
        }}>
          <Link 
            to={`/edit/${id}`} 
            className="btn btn-secondary"
            style={{ fontSize: '12px', padding: '6px 12px' }}
          >
            Edit
          </Link>
          
          <button
            onClick={() => onDelete(id)}
            className="btn btn-danger"
            style={{ fontSize: '12px', padding: '6px 12px' }}
            onMouseOver={(e) => {
              e.target.style.transform = 'scale(1.05)'
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'scale(1)'
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  )
}

export default BookCard