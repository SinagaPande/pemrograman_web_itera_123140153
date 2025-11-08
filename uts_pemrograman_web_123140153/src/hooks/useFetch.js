import { useState, useEffect, useCallback } from 'react'

// Custom Hook untuk fetching data dari API
const useFetch = (url) => {
  // State untuk data, loading, dan error
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Function untuk fetch data
  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }
      
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [url])

  // useEffect akan jalan ketika url berubah
  useEffect(() => {
    if (url) {
      fetchData()
    }
  }, [url, fetchData])

  // Return value yang bisa digunakan component lain
  return { data, loading, error, refetch: fetchData }
}

export default useFetch