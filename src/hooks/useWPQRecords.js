import { useState, useEffect, useCallback } from 'react'
import wpqService from '../services/wpqService'

/**
 * Custom hook for WPQ records management
 * Provides CRUD operations with loading and error states
 */

export function useWPQRecords() {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  /**
   * Fetch all WPQ records
   */
  const fetchRecords = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const { data, error: fetchError } = await wpqService.getAllWPQRecords()

      if (fetchError) {
        throw new Error(fetchError)
      }

      setRecords(data || [])
    } catch (err) {
      console.error('Fetch records error:', err)
      setError(err.message || 'Failed to load records')
      setRecords([])
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Search WPQ records
   */
  const searchRecords = useCallback(async (term) => {
    setLoading(true)
    setError(null)
    setSearchTerm(term)

    try {
      const { data, error: searchError } = await wpqService.searchWPQRecords(term)

      if (searchError) {
        throw new Error(searchError)
      }

      setRecords(data || [])
    } catch (err) {
      console.error('Search records error:', err)
      setError(err.message || 'Search failed')
      setRecords([])
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Refresh records (re-fetch)
   */
  const refresh = useCallback(() => {
    if (searchTerm) {
      searchRecords(searchTerm)
    } else {
      fetchRecords()
    }
  }, [searchTerm, searchRecords, fetchRecords])

  /**
   * Clear search and reload all
   */
  const clearSearch = useCallback(() => {
    setSearchTerm('')
    fetchRecords()
  }, [fetchRecords])

  // Initial load
  useEffect(() => {
    fetchRecords()
  }, [fetchRecords])

  return {
    records,
    loading,
    error,
    searchTerm,
    fetchRecords,
    searchRecords,
    refresh,
    clearSearch,
  }
}