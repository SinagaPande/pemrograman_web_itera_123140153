import React from 'react'
import Header from './Header'

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="container" style={{ paddingTop: '20px' }}>
        {children}
      </main>
    </div>
  )
}

export default Layout