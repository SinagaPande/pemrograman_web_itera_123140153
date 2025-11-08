import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBook } from '../context/BookContext'
import FormInput from '../components/FormInput'

const AddBookPage = () => {
  const navigate = useNavigate()
  const { addBook } = useBook()

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    status: 'milik'
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const statusOptions = [
    { value: 'milik', label: 'Owned' },
    { value: 'baca', label: 'Reading' },
    { value: 'beli', label: 'Wishlist' }
  ]

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
        addBook(formData)
        setIsSubmitting(false)
        
        // Show success message
        alert('Book added successfully!')
        
        // Redirect to home page
        navigate('/')
      }, 500)
    } catch (error) {
      setIsSubmitting(false)
      alert('Error adding book. Please try again.')
    }
  }

  const handleReset = () => {
    setFormData({
      title: '',
      author: '',
      status: 'milik'
    })
    setErrors({})
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Add New Book</h1>
        <button 
          onClick={() => navigate('/')}
          className="btn btn-secondary"
        >
          Back to Home
        </button>
      </div>

      <div className="card">
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
              {isSubmitting ? 'Adding...' : 'Add Book'}
            </button>
          </div>
        </form>
      </div>

      {/* Help Section */}
      <div className="card">
        <h3>About Book Status</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginTop: '15px' }}>
          <div style={{ padding: '15px', background: '#e8f5e8', borderRadius: '8px' }}>
            <strong>Owned</strong>
            <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#666' }}>
              Books you already own
            </p>
          </div>
          <div style={{ padding: '15px', background: '#fff3e0', borderRadius: '8px' }}>
            <strong>Reading</strong>
            <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#666' }}>
              Books you're currently reading
            </p>
          </div>
          <div style={{ padding: '15px', background: '#fce4ec', borderRadius: '8px' }}>
            <strong>Wishlist</strong>
            <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#666' }}>
              Books you want to buy/read
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddBookPage