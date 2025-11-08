import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const Navbar = () => {
  const { theme, toggleTheme, isLoggedIn, login, logout } = useApp()
  const location = useLocation()

  // Cek apakah link sedang aktif
  const isActive = (path) => location.pathname === path

  // Simulasi login
  const handleLogin = () => {
    login({ name: 'Demo User', email: 'demo@example.com' })
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-xl font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors"
          >
            Blog Viewer
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-4">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/articles" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/articles') 
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Articles
            </Link>
          </div>

          {/* Theme Toggle dan Login */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 transition-colors"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            
            {isLoggedIn ? (
              <button
                onClick={logout}
                className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="px-4 py-2 text-sm bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
              >
                Login Demo
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar