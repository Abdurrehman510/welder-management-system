import { supabase } from '../lib/supabase'

/**
 * File upload service for Supabase Storage
 * Enhanced with comprehensive validation
 */

class StorageService {
  /**
   * Validate file before upload
   * @param {File} file - File to validate
   * @param {string} type - Type of file ('photo' or 'signature')
   * @returns {{valid: boolean, error: string|null}}
   */
  validateFile(file, type = 'photo') {
    const maxSize = type === 'photo' ? 5 * 1024 * 1024 : 2 * 1024 * 1024 // 5MB or 2MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    const typeLabel = type === 'photo' ? 'Photo' : 'Signature'

    // Check if file exists
    if (!file) {
      return {
        valid: false,
        error: `${typeLabel} file is missing`
      }
    }

    // Check file type
    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: `Invalid File Type: ${typeLabel} must be JPEG, JPG, PNG, or WEBP. Your file type: ${file.type}`
      }
    }

    // Check file size
    if (file.size > maxSize) {
      const maxSizeMB = (maxSize / 1024 / 1024).toFixed(1)
      const fileSizeMB = (file.size / 1024 / 1024).toFixed(2)
      
      return {
        valid: false,
        error: `Invalid File Size: The selected ${typeLabel.toLowerCase()} (${fileSizeMB}MB) exceeds the ${maxSizeMB}MB limit. Please compress the file and try again.`
      }
    }

    return { valid: true, error: null }
  }

  /**
   * Upload file to Supabase Storage with validation
   * @param {string} bucket - Bucket name
   * @param {File} file - File to upload
   * @param {string} path - Storage path (optional)
   * @param {string} type - Type for validation ('photo' or 'signature')
   * @returns {Promise<{url: string, error: null} | {url: null, error: string}>}
   */
  async uploadFile(bucket, file, path = null, type = 'photo') {
    try {
      // Validate file first
      const validation = this.validateFile(file, type)
      if (!validation.valid) {
        console.error('File validation failed:', validation.error)
        return { url: null, error: validation.error }
      }

      // Generate unique filename
      const timestamp = Date.now()
      const randomStr = Math.random().toString(36).substring(7)
      const fileExt = file.name.split('.').pop()
      const fileName = path || `${timestamp}-${randomStr}.${fileExt}`

      console.log(`Uploading ${type} to ${bucket}:`, fileName)

      // Upload file
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) {
        console.error('Supabase upload error:', error)
        throw error
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName)

      console.log(`Successfully uploaded ${type}:`, publicUrl)
      return { url: publicUrl, error: null }
    } catch (error) {
      console.error('Storage service error:', error)
      return { 
        url: null, 
        error: error.message || `Failed to upload ${type}. Please try again.`
      }
    }
  }

  /**
   * Upload photo to welder-photos bucket
   * @param {File} file - Photo file
   * @returns {Promise<{url: string, error: null} | {url: null, error: string}>}
   */
  async uploadPhoto(file) {
    return this.uploadFile('welder-photos', file, null, 'photo')
  }

  /**
   * Upload signature to signatures bucket
   * @param {File} file - Signature file
   * @returns {Promise<{url: string, error: null} | {url: null, error: string}>}
   */
  async uploadSignature(file) {
    return this.uploadFile('signatures', file, null, 'signature')
  }

  /**
   * Delete file from storage
   * @param {string} bucket - Bucket name
   * @param {string} path - File path
   * @returns {Promise<{error: null} | {error: string}>}
   */
  async deleteFile(bucket, path) {
    try {
      const { error } = await supabase.storage
        .from(bucket)
        .remove([path])

      if (error) throw error

      console.log(`Successfully deleted file from ${bucket}:`, path)
      return { error: null }
    } catch (error) {
      console.error('Delete file error:', error)
      return { error: error.message || 'Failed to delete file' }
    }
  }

  /**
   * Get file extension from filename
   * @param {string} filename - Filename
   * @returns {string} File extension
   */
  getFileExtension(filename) {
    return filename.split('.').pop().toLowerCase()
  }

  /**
   * Check if file is an image
   * @param {File} file - File to check
   * @returns {boolean}
   */
  isImage(file) {
    const imageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    return imageTypes.includes(file.type)
  }

  /**
   * Format file size for display
   * @param {number} bytes - File size in bytes
   * @returns {string} Formatted file size
   */
  formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  }
}

export default new StorageService()