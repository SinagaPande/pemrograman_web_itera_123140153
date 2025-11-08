import React from 'react'

const FormInput = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder = '',
  required = false,
  error = '',
  className = '',
  disabled = false,
  options = [] // untuk select input
}) => {
  const inputId = `input-${name}`

  const renderInput = () => {
    if (type === 'textarea') {
      return (
        <textarea
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`form-input ${error ? 'error' : ''} ${className}`}
          rows="4"
          style={{
            resize: 'vertical',
            minHeight: '100px'
          }}
        />
      )
    }

    if (type === 'select') {
      return (
        <select
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={`form-select ${error ? 'error' : ''} ${className}`}
        >
          <option value="">{placeholder || 'Select an option...'}</option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )
    }

    return (
      <input
        id={inputId}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`form-input ${error ? 'error' : ''} ${className}`}
      />
    )
  }

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
          {required && <span style={{ color: 'red', marginLeft: '4px' }}>*</span>}
        </label>
      )}
      
      {renderInput()}
      
      {error && (
        <div style={{
          color: '#dc3545',
          fontSize: '14px',
          marginTop: '5px'
        }}>
          {error}
        </div>
      )}
    </div>
  )
}

export default FormInput