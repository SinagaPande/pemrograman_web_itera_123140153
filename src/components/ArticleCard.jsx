import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const ArticleCard = ({ post }) => {
  // Buat excerpt dari body
  const excerpt = post.body.length > 100 
    ? `${post.body.substring(0, 100)}...` 
    : post.body

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
        {post.title}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {excerpt}
      </p>
      
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          By User {post.userId}
        </span>
        
        <div className="flex space-x-2">
          <Link
            to={`/articles/${post.id}`}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-md transition-colors"
          >
            Read More
          </Link>
          <Link
            to={`/authors/${post.userId}`}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white text-sm rounded-md transition-colors"
          >
            View Author
          </Link>
        </div>
      </div>
    </div>
  )
}

ArticleCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired
  }).isRequired
}

export default ArticleCard