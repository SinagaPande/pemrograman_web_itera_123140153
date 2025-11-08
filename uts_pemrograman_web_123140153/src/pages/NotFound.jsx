import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="max-w-2xl mx-auto text-center py-16">
      <div className="mb-8">
        <h1 className="text-9xl font-bold text-gray-300 dark:text-gray-600 mb-4">
          404
        </h1>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          The page you're looking for doesn't exist.
        </p>
      </div>

      <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
        >
          Go Home
        </Link>
        <Link
          to="/articles"
          className="inline-block px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
        >
          Browse Articles
        </Link>
      </div>
    </div>
  )
}

export default NotFound