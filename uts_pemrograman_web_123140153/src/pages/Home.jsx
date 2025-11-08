import React from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const Home = () => {
  const { isLoggedIn, user } = useApp()

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
          Welcome to Blog Viewer
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Explore amazing articles from JSONPlaceholder API.
        </p>
        
        {isLoggedIn && user && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-8 inline-block">
            <p className="text-green-800 dark:text-green-300">
              Welcome back, <strong>{user.name}</strong>!
            </p>
          </div>
        )}
        
        <Link
          to="/articles"
          className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
        >
          Browse Articles
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
          Features
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Article List
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Browse through all available articles.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👤</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Author Profiles
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Learn more about the authors.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎨</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Modern Design
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Clean, responsive design with dark mode.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home