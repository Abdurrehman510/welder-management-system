import { useState } from 'react'
import storageService from '../services/storageService'

/**
 * Custom hook for file upload operations
 * NOTE: This hook validates files but does NOT upload them immediately
 * Uploads happen only during form submission via welderService
 */
export function useFileUpload() {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)

  /**
   * Validate file without uploading
   * Returns file object if valid, null if invalid
   * @param {File} file - File to validate
   * @param {string} type - 'photo' or 'signature'
   * @returns {Promise<{file: File|null, error: string|null}>}
   */
  const validateFile = async (file, type = 'photo') => {
    setUploading(false) // Not actually uploading, just validating
    setError(null)

    try {
      // Use storage service validation
      const validation = storageService.validateFile(file, type)

      if (!validation.valid) {
        setError(validation.error)
        return { file: null, error: validation.error }
      }

      // File is valid, return it for preview/storage
      return { file, error: null }
    } catch (err) {
      const errorMessage = err.message || 'File validation failed'
      setError(errorMessage)
      return { file: null, error: errorMessage }
    }
  }

  /**
   * DEPRECATED: This function now only validates, doesn't upload
   * Kept for backward compatibility with existing code
   * Actual uploads happen in welderService.createWelder()
   * 
   * @param {File} file - File to validate
   * @param {string} type - 'photo' or 'signature'
   * @returns {Promise<{url: null, error: string|null, file: File|null}>}
   */
  const uploadFile = async (file, type = 'photo') => {
    setUploading(false)
    setError(null)

    try {
      // Validate file
      const validation = storageService.validateFile(file, type)

      if (!validation.valid) {
        throw new Error(validation.error)
      }

      // Return file object for temporary storage
      // Actual upload happens during form submission
      return { url: null, error: null, file }
    } catch (err) {
      setError(err.message)
      return { url: null, error: err.message, file: null }
    }
  }

  /**
   * Actually upload file to storage (used by welderService)
   * @param {File} file - File to upload
   * @param {string} type - 'photo' or 'signature'
   * @returns {Promise<{url: string|null, error: string|null}>}
   */
  const uploadToStorage = async (file, type = 'photo') => {
    setUploading(true)
    setError(null)

    try {
      // Validate first
      const validation = storageService.validateFile(file, type)
      if (!validation.valid) {
        throw new Error(validation.error)
      }

      // Upload based on type
      const { url, error: uploadError } = type === 'signature'
        ? await storageService.uploadSignature(file)
        : await storageService.uploadPhoto(file)

      if (uploadError) {
        throw new Error(uploadError)
      }

      setUploading(false)
      return { url, error: null }
    } catch (err) {
      setError(err.message)
      setUploading(false)
      return { url: null, error: err.message }
    }
  }

  return {
    uploading,
    error,
    validateFile,
    uploadFile,
    uploadToStorage, // New method for actual uploads
  }
}