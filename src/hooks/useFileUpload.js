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
  const validateFile=(file, type = 'photo') => {
  const maxSize = type === 'photo' ? 10 * 1024 * 1024 : 10 * 1024 * 1024 // 10MB for both
  
  // ✅ Strict validation - Common image types only
  const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/webp'
  ]
  
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp']
  
  const typeLabel = type === 'photo' ? 'Photo' : 'Signature'

  // Check if file exists
  if (!file) {
    return {
      valid: false,
      error: `${typeLabel} file is missing`
    }
  }

  // Get file extension
  const fileExtension = file.name.split('.').pop().toLowerCase()

  // ✅ STRICT: Check file extension first
  if (!allowedExtensions.includes(fileExtension)) {
    return {
      valid: false,
      error: `Invalid File Type: ${typeLabel} must be JPG, JPEG, PNG. Your file has extension: .${fileExtension}`
    }
  }

  // ✅ Check MIME type (some PDFs might have wrong extension)
  if (file.type && !allowedMimeTypes.includes(file.type.toLowerCase())) {
    return {
      valid: false,
      error: `Invalid File Type: ${typeLabel} must be JPG, JPEG, PNG. Detected type: ${file.type}`
    }
  }

  // Check file size
  if (file.size > maxSize) {
    const maxSizeMB = (maxSize / 1024 / 1024).toFixed(1)
    const fileSizeMB = (file.size / 1024 / 1024).toFixed(2)
    
    return {
      valid: false,
      error: `File Size Too Large: The selected ${typeLabel.toLowerCase()} (${fileSizeMB}MB) exceeds the ${maxSizeMB}MB limit.`
    }
  }

  return { valid: true, error: null }
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