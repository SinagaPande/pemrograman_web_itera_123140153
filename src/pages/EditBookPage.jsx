import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useBook } from '../context/BookContext'
import FormInput from '../components/FormInput'

const EditBookPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { getBookById, editBook } = useBook()

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    status: 'milik'
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [book, setBook] = useState(null)

  const statusOptions = [
    { value: 'milik', label: 'Owned' },
    { value: 'baca', label: 'Reading' },
    { value: 'beli', label: 'Wishlist' }
  ]

  // Load book data when component mounts
  useEffect(() => {
    const bookToEdit = getBookById(id)
    if (bookToEdit) {
      setBook(bookToEdit)
      setFormData({
        title: bookToEdit.title,
        author: bookToEdit.author,
        status: bookToEdit.status
      })
    } else {
      // Redirect to home if book not found
      navigate('/')
    }
  }, [id, getBookById, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Author is required'
    }

    if (!formData.status) {
      newErrors.status = 'Status is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call delay
      setTimeout(() => {
        editBook(id, formData)
        setIsSubmitting(false)
        
        // Show success message
        alert('Book updated successfully!')
        
        // Redirect to home page
        navigate('/')
      }, 500)
    } catch (error) {
      setIsSubmitting(false)
      alert('Error updating book. Please try again.')
    }
  }

  const handleReset = () => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        status: book.status
      })
    }
    setErrors({})
  }

  if (!book) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <div>Loading book information...</div>
        <button 
          onClick={() => navigate('/')}
          className="btn btn-secondary"
          style={{ marginTop: '20px' }}
        >
          Back to Home
        </button>
      </div>
    )
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Edit Book</h1>
        <button 
          onClick={() => navigate('/')}
          className="btn btn-secondary"
        >
          Back to Home
        </button>
      </div>

      <div className="card">
        <div style={{ 
          padding: '15px', 
          background: '#e3f2fd', 
          borderRadius: '8px', 
          marginBottom: '20px',
          fontSize: '14px'
        }}>
          <strong>Editing:</strong> {book.title} by {book.author}
        </div>

        <form onSubmit={handleSubmit}>
          <FormInput
            label="Book Title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter book title"
            required={true}
            error={errors.title}
          />

          <FormInput
            label="Author"
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
            required={true}
            error={errors.author}
          />

          <FormInput
            label="Status"
            type="select"
            name="status"
            value={formData.status}
            onChange={handleChange}
            options={statusOptions}
            required={true}
            error={errors.status}
          />

          <div style={{ 
            display: 'flex', 
            gap: '10px', 
            justifyContent: 'flex-end',
            marginTop: '30px',
            paddingTop: '20px',
            borderTop: '1px solid #eee'
          }}>
            <button
              type="button"
              onClick={handleReset}
              className="btn btn-secondary"
              disabled={isSubmitting}
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="btn btn-secondary"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
              style={{ 
                minWidth: '120px',
                opacity: isSubmitting ? 0.6 : 1
              }}
            >
              {isSubmitting ? 'Updating...' : 'Update Book'}
            </button>
          </div>
        </form>
      </div>

      {/* Book Information */}
      <div className="card">
        <h3>Book Information</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginTop: '15px' }}>
          <div>
            <strong>Created:</strong>
            <p style={{ margin: '5px 0 0 0', color: '#666' }}>
              {new Date(book.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
          {book.updatedAt && book.updatedAt !== book.createdAt && (
            <div>
              <strong>Last Updated:</strong>
              <p style={{ margin: '5px 0 0 0', color: '#666' }}>
                {new Date(book.updatedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EditBookPage