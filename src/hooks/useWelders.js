import { useState, useEffect, useCallback } from 'react'
import welderService from '../services/welderService'

/**
 * Custom hook for Welders management
 * Provides CRUD operations with loading and error states
 */

export function useWelders() {
  const [welders, setWelders] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  /**
   * Fetch all welders
   */
  const fetchWelders = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const { data, error: fetchError } = await welderService.getAllWelders()

      if (fetchError) {
        throw new Error(fetchError)
      }

      setWelders(data || [])
    } catch (err) {
      console.error('Fetch welders error:', err)
      setError(err.message || 'Failed to load welders')
      setWelders([])
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Search welders (client-side search for all fields)
   */
  const searchWelders = useCallback(async (term) => {
    setLoading(true)
    setError(null)
    setSearchTerm(term)

    try {
      // First, get all welders
      const { data, error: fetchError } = await welderService.getAllWelders()

      if (fetchError) {
        throw new Error(fetchError)
      }

      // Then filter client-side to include designation and other fields
      const searchLower = term.toLowerCase().trim()
      const filtered = (data || []).filter(welder => 
        welder.welder_name?.toLowerCase().includes(searchLower) ||
        welder.certificate_no?.toLowerCase().includes(searchLower) ||
        welder.client_contractor?.toLowerCase().includes(searchLower) ||
        welder.designation?.toLowerCase().includes(searchLower) ||
        welder.welder_name_short?.toLowerCase().includes(searchLower) ||
        welder.iqama_passport_no?.toLowerCase().includes(searchLower)
      )

      setWelders(filtered)
    } catch (err) {
      console.error('Search welders error:', err)
      setError(err.message || 'Search failed')
      setWelders([])
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Refresh welders (re-fetch)
   */
  const refresh = useCallback(() => {
    if (searchTerm) {
      searchWelders(searchTerm)
    } else {
      fetchWelders()
    }
  }, [searchTerm, searchWelders, fetchWelders])

  /**
   * Clear search and reload all
   */
  const clearSearch = useCallback(() => {
    setSearchTerm('')
    fetchWelders()
  }, [fetchWelders])

  // Initial load
  useEffect(() => {
    fetchWelders()
  }, [fetchWelders])

  return {
    welders,
    loading,
    error,
    searchTerm,
    fetchWelders,
    searchWelders,
    refresh,
    clearSearch,
  }
}