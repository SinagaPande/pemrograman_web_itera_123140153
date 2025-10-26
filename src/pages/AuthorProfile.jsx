import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'

const AuthorProfile = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const { data: user, loading, error, refetch } = useFetch(
    id ? `https://jsonplaceholder.typicode.com/users/${id}` : null
  )

  const { data: userPosts } = useFetch(
    id ? `https://jsonplaceholder.typicode.com/posts?userId=${id}` : null
  )

  const handleBack = () => {
    navigate(-1)
  }

  if (loading) {
    return <LoadingSpinner text="Loading author profile..." />
  }

  if (error) {
    return (
      <ErrorMessage 
        message={`Failed to load author profile: ${error}`} 
        onRetry={refetch} 
      />
    )
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Author Not Found
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
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <button
          onClick={handleBack}
          className="flex items-center text-blue-500 hover:text-blue-600 transition-colors mb-4"
        >
          ← Go Back
        </button>
      </div>

      {/* Author Profile Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32"></div>
        
        <div className="px-6 pb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start -mt-16">
            <div className="w-32 h-32 bg-white dark:bg-gray-700 rounded-full border-4 border-white dark:border-gray-800 shadow-lg flex items-center justify-center mb-4 md:mb-0 md:mr-6">
              <span className="text-4xl text-gray-600 dark:text-gray-300">
                👤
              </span>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                {user.name}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
                {user.email}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div>
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Contact</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    <strong>Phone:</strong> {user.phone}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    <strong>Website:</strong> {user.website}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Address</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {user.address.street}, {user.address.city}
                  </p>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Company</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  <strong>{user.company.name}</strong>
                </p>
                <p className="text-gray-600 dark:text-gray-400 italic">
                  "{user.company.catchPhrase}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Author's Articles */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Articles by {user.name} ({userPosts?.length || 0})
        </h2>
        
        {userPosts && userPosts.length > 0 ? (
          <div className="grid gap-4">
            {userPosts.slice(0, 5).map(post => (
              <div 
                key={post.id} 
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
              >
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  {post.body.substring(0, 100)}...
                </p>
                <Link
                  to={`/articles/${post.id}`}
                  className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                >
                  Read full article →
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-gray-600 dark:text-gray-400">
              No articles found for this author.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}

export default AuthorProfile