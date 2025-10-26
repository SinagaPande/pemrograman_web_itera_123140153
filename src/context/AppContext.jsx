import React, { createContext, useContext, useState, useCallback } from 'react'

// 1. Buat Context
const AppContext = createContext()

// 2. Buat Custom Hook untuk menggunakan context
export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

// 3. Buat Provider Component
export const AppProvider = ({ children }) => {
  // State untuk tema (light/dark)
  const [theme, setTheme] = useState('light')
  
  // State untuk status login
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  // State untuk data user
  const [user, setUser] = useState(null)

  // useCallback untuk toggle theme - optimasi performa
  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }, [])

  // useCallback untuk login
  const login = useCallback((userData) => {
    setIsLoggedIn(true)
    setUser(userData)
  }, [])

  // useCallback untuk logout
  const logout = useCallback(() => {
    setIsLoggedIn(false)
    setUser(null)
  }, [])

  // Value yang akan disediakan ke seluruh app
  const value = React.useMemo(() => ({
    theme,
    isLoggedIn,
    user,
    toggleTheme,
    login,
    logout
  }), [theme, isLoggedIn, user, toggleTheme, login, logout])

  return (
    <AppContext.Provider value={value}>
      {/* Wrapper untuk dark mode */}
      <div className={theme === 'dark' ? 'dark' : ''}>
        {children}
      </div>
    </AppContext.Provider>
  )
}

export default AppContext