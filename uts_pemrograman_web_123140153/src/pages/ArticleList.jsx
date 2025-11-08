import React from 'react'
import useFetch from '../hooks/useFetch'
import ArticleCard from '../components/ArticleCard'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'

const ArticleList = () => {
  const { data: posts, loading, error, refetch } = useFetch('https://jsonplaceholder.typicode.com/posts')

  if (loading) {
    return <LoadingSpinner text="Loading articles..." />
  }

  if (error) {
    return (
      <ErrorMessage 
        message={`Failed to load articles: ${error}`} 
        onRetry={refetch} 
      />
    )
  }

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          All Articles
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Discover {posts?.length || 0} amazing articles
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts?.map(post => (
          <ArticleCard key={post.id} post={post} />
        ))}
      </div>

      {posts && posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No articles found.
          </p>
        </div>
      )}
    </div>
  )
}

export default ArticleList