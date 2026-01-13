import { supabase } from '../lib/supabase'
import storageService from './storageService'

/**
 * Continuity Service - Manage continuity records
 */

class ContinuityService {
  /**
   * Get continuity records by welder ID
   * @param {string} welderId - Welder UUID
   * @returns {Promise<{data: Array|null, error: string|null}>}
   */
  async getContinuityRecordsByWelderId(welderId) {
    try {
      const { data, error } = await supabase
        .from('continuity_records')
        .select('*')
        .eq('welder_id', welderId)
        .order('continuity_date', { ascending: false })

      if (error) throw error

      return { data, error: null }
    } catch (error) {
      console.error('Get continuity records error:', error)
      return { data: null, error: error.message }
    }
  }

  /**
   * Get continuity records by WPQ record ID
   * @param {string} wpqRecordId - WPQ record UUID
   * @returns {Promise<{data: Array|null, error: string|null}>}
   */
  async getContinuityRecordsByWPQId(wpqRecordId) {
    try {
      const { data, error } = await supabase
        .from('continuity_records')
        .select('*')
        .eq('wpq_record_id', wpqRecordId)
        .order('continuity_date', { ascending: false })

      if (error) throw error

      return { data, error: null }
    } catch (error) {
      console.error('Get continuity records by WPQ error:', error)
      return { data: null, error: error.message }
    }
  }

  /**
   * Update continuity records for a welder
   * @param {string} welderId - Welder UUID
   * @param {string} wpqRecordId - WPQ record UUID
   * @param {Array} continuityRecords - Updated continuity records
   * @returns {Promise<{data: Array|null, error: string|null}>}
   */
  async updateContinuityRecords(welderId, wpqRecordId, continuityRecords) {
    try {
      // Delete existing continuity records for this WPQ
      const { error: deleteError } = await supabase
        .from('continuity_records')
        .delete()
        .eq('wpq_record_id', wpqRecordId)

      if (deleteError) throw deleteError

      // If no new records, return
      if (!continuityRecords || continuityRecords.length === 0) {
        return { data: [], error: null }
      }

      // Upload signatures if needed
      const recordsWithUrls = []
      for (const record of continuityRecords) {
        const uploadedRecord = { ...record }

        // Upload verifier signature if it's a File
        if (record.verifierSignature && record.verifierSignature instanceof File) {
          const { url, error } = await storageService.uploadSignature(record.verifierSignature)
          if (!error) {
            uploadedRecord.verifierSignatureUrl = url
          }
        }

        // Upload QC signature if it's a File
        if (record.qcSignature && record.qcSignature instanceof File) {
          const { url, error } = await storageService.uploadSignature(record.qcSignature)
          if (!error) {
            uploadedRecord.qcSignatureUrl = url
          }
        }

        recordsWithUrls.push(uploadedRecord)
      }

      // Insert new continuity records
      const continuityData = recordsWithUrls.map(record => ({
        welder_id: welderId,
        wpq_record_id: wpqRecordId,
        continuity_date: record.date,
        verifier_name: record.verifier || null,
        verifier_signature_url: record.verifierSignatureUrl || null,
        company: record.company || null,
        reference: record.reference || null,
        qc_name: record.qcName || null,
        qc_signature_url: record.qcSignatureUrl || null,
      }))

      const { data, error } = await supabase
        .from('continuity_records')
        .insert(continuityData)
        .select()

      if (error) throw error

      return { data, error: null }
    } catch (error) {
      console.error('Update continuity records error:', error)
      return { data: null, error: error.message }
    }
  }

  /**
   * Delete continuity record
   * @param {string} id - Continuity record UUID
   * @returns {Promise<{error: string|null}>}
   */
  async deleteContinuityRecord(id) {
    try {
      const { error } = await supabase
        .from('continuity_records')
        .delete()
        .eq('id', id)

      if (error) throw error

      return { error: null }
    } catch (error) {
      console.error('Delete continuity record error:', error)
      return { error: error.message }
    }
  }
}

export default new ContinuityService()