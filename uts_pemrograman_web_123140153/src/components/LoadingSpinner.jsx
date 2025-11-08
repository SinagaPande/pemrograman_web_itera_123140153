import React from 'react'
import PropTypes from 'prop-types'

const LoadingSpinner = ({ size = 'medium', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-10 h-10',
    large: 'w-16 h-16'
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div 
        className={`loading-spinner ${sizeClasses[size]} border-blue-500 border-t-blue-500`}
      ></div>
      <p className="mt-4 text-gray-600 dark:text-gray-400">{text}</p>
    </div>
  )
}

// PropTypes untuk validasi props
LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  text: PropTypes.string
}

export default LoadingSpinner