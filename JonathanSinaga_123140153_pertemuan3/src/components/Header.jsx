import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header style={{
      background: '#2c3e50',
      color: 'white',
      padding: '1rem 0',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Link to="/" style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '1.5rem',
            fontWeight: 'bold'
          }}>
            📚 Personal Book Manager
          </Link>
          <nav>
            <Link to="/" className="btn btn-secondary" style={{ marginRight: '10px' }}>
              Home
            </Link>
            <Link to="/add" className="btn btn-primary">
              Add Book
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header