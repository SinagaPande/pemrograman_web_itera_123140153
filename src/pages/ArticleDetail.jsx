import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'

const ArticleDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const { data: post, loading, error, refetch } = useFetch(
    id ? `https://jsonplaceholder.typicode.com/posts/${id}` : null
  )

  const handleBack = () => {
    navigate(-1)
  }

  if (loading) {
    return <LoadingSpinner text="Loading article..." />
  }

  if (error) {
    return (
      <ErrorMessage 
        message={`Failed to load article: ${error}`} 
        onRetry={refetch} 
      />
    )
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Article Not Found
        </h2>
        <button
          onClick={handleBack}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
        >
          Go Back
        </button>
      </div>
    )
  }

  return (
    <article className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={handleBack}
          className="flex items-center text-blue-500 hover:text-blue-600 transition-colors"
        >
          ← Back to Articles
        </button>
        
        <Link
          to={`/authors/${post.userId}`}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
        >
          View Author Profile
        </Link>
      </div>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
          {post.title}
        </h1>
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <span>By User {post.userId}</span>
          <span className="mx-2">•</span>
          <span>Article ID: {post.id}</span>
        </div>
      </header>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          {post.body}
        </p>
      </div>
    </article>
  )
}

export default ArticleDetail