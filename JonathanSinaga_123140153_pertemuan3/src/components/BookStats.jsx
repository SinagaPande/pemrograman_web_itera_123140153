import React from 'react'
import { useBook } from '../context/BookContext'

const BookStats = () => {
  const { booksStats } = useBook()

  const stats = [
    {
      label: 'Total Books',
      value: booksStats.total,
      color: '#1976d2',
      bgColor: '#e3f2fd',
      icon: '📚'
    },
    {
      label: 'Owned',
      value: booksStats.owned,
      color: '#2e7d32',
      bgColor: '#e8f5e8',
      icon: '✅'
    },
    {
      label: 'Reading',
      value: booksStats.reading,
      color: '#ef6c00',
      bgColor: '#fff3e0',
      icon: '📖'
    },
    {
      label: 'Wishlist',
      value: booksStats.wishlist,
      color: '#c2185b',
      bgColor: '#fce4ec',
      icon: '⭐'
    }
  ]

  return (
    <div className="card">
      <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>Book Collection Statistics</h3>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
        gap: '15px' 
      }}>
        {stats.map((stat, index) => (
          <div 
            key={index}
            style={{ 
              textAlign: 'center', 
              padding: '20px 15px',
              background: stat.bgColor,
              borderRadius: '10px',
              border: `2px solid ${stat.color}20`,
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            <div style={{ 
              fontSize: '28px', 
              marginBottom: '8px' 
            }}>
              {stat.icon}
            </div>
            <div style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              color: stat.color,
              marginBottom: '5px'
            }}>
              {stat.value}
            </div>
            <div style={{ 
              fontSize: '14px', 
              color: '#666',
              fontWeight: '500'
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
      
      {/* Progress Bar untuk persentase */}
      {booksStats.total > 0 && (
        <div style={{ 
          marginTop: '20px', 
          paddingTop: '20px', 
          borderTop: '1px solid #eee' 
        }}>
          <h4 style={{ marginBottom: '15px', textAlign: 'center' }}>Collection Overview</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { label: 'Owned', value: booksStats.owned, color: '#2e7d32' },
              { label: 'Reading', value: booksStats.reading, color: '#ef6c00' },
              { label: 'Wishlist', value: booksStats.wishlist, color: '#c2185b' }
            ].map((item, index) => {
              const percentage = booksStats.total > 0 
                ? Math.round((item.value / booksStats.total) * 100) 
                : 0
              
              return (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ 
                    fontSize: '12px', 
                    fontWeight: 'bold', 
                    color: item.color,
                    minWidth: '60px'
                  }}>
                    {item.label}
                  </span>
                  <div style={{ 
                    flex: 1, 
                    height: '8px', 
                    backgroundColor: '#f0f0f0',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div 
                      style={{ 
                        height: '100%', 
                        backgroundColor: item.color,
                        width: `${percentage}%`,
                        transition: 'width 0.5s ease',
                        borderRadius: '4px'
                      }}
                    />
                  </div>
                  <span style={{ 
                    fontSize: '12px', 
                    color: '#666',
                    minWidth: '30px',
                    textAlign: 'right'
                  }}>
                    {percentage}%
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default BookStats