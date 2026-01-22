import { supabase } from '../lib/supabase'

/**
 * WPQ Service - WPQ Record CRUD operations
 * Handles Form1 (WPQ Certificate) data management
 * 
 * ✅ FIXED: Supabase query syntax for search
 * ✅ ENHANCED: Better error handling
 */

class WPQService {
  /**
   * Get all WPQ records with welder details
   * @returns {Promise<{data: Array|null, error: string|null}>}
   */
  async getAllWPQRecords() {
    try {
      const { data, error } = await supabase
        .from('wpq_records')
        .select(`
          *,
          welder:welders!inner (
            id,
            certificate_no,
            symbol_stamp_no,
            welder_name,
            welder_name_short,
            iqama_passport_no,
            photo_url,
            designation,
            date_of_birth,
            date_of_joining,
            signature_url,
            client_contractor,
            client_name_short,
            status,
            is_deleted
          )
        `)
        .eq('welder.is_deleted', false)
        .order('created_at', { ascending: false })

      if (error) throw error

      // Filter out records where welder is null (safety check)
      const filteredData = (data || []).filter(record => record.welder !== null)

      return { data: filteredData, error: null }
    } catch (error) {
      console.error('❌ Get all WPQ records error:', error)
      return { data: null, error: error.message }
    }
  }

  /**
   * Get WPQ record by ID with full details
   * @param {string} id - WPQ record UUID
   * @returns {Promise<{data: Object|null, error: string|null}>}
   */
  async getWPQRecordById(id) {
    try {
      const { data, error } = await supabase
        .from('wpq_records')
        .select(`
          *,
          welder:welders (
            *
          ),
          continuity_records (
            *
          )
        `)
        .eq('id', id)
        .single()

      if (error) throw error

      return { data, error: null }
    } catch (error) {
      console.error('❌ Get WPQ record error:', error)
      return { data: null, error: error.message }
    }
  }

  /**
   * Get WPQ record by welder ID
   * @param {string} welderId - Welder UUID
   * @returns {Promise<{data: Object|null, error: string|null}>}
   */
  async getWPQRecordByWelderId(welderId) {
    try {
      const { data, error } = await supabase
        .from('wpq_records')
        .select(`
          *,
          continuity_records (
            *
          )
        `)
        .eq('welder_id', welderId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (error) throw error

      return { data, error: null }
    } catch (error) {
      console.error('❌ Get WPQ record by welder ID error:', error)
      return { data: null, error: error.message }
    }
  }

  /**
   * Update WPQ record
   * @param {string} id - WPQ record UUID
   * @param {Object} wpqData - Updated WPQ data
   * @returns {Promise<{data: Object|null, error: string|null}>}
   */
  async updateWPQRecord(id, wpqData) {
    try {
      const updateData = {
        date_welded: wpqData.date_welded,
        
        // Section 2: Test Description
        wps_identification: wpqData.wps_identification || null,
        wps_identification_type: wpqData.wps_identification_type || null,
        base_metal_specification: wpqData.base_metal_specification || null,
        thickness_mm: wpqData.thickness_mm || null,
        
        // Section 3 & 4: Testing Variables
        welding_processes_actual: wpqData.welding_processes_actual || null,
        welding_processes_range: wpqData.welding_processes_range || null,
        welding_type_actual: wpqData.welding_type_actual || null,
        welding_type_range: wpqData.welding_type_range || null,
        plate_pipe_type: wpqData.plate_pipe_type || null,
        backing_type_actual: wpqData.backing_type_actual || null,
        backing_type_range: wpqData.backing_type_range || null,
        plate_pipe_actual: wpqData.plate_pipe_actual || null,
        plate_pipe_range: wpqData.plate_pipe_range || null,
        base_metal_pno_actual: wpqData.base_metal_pno_actual || null,
        base_metal_pno_range: wpqData.base_metal_pno_range || null,
        filler_metal_addition_actual: wpqData.filler_metal_addition_actual || null,
        filler_metal_addition_range: wpqData.filler_metal_addition_range || null,
        filler_specification_actual: wpqData.filler_specification_actual || null,
        filler_specification_range: wpqData.filler_specification_range || null,
        electrode_classification_actual: wpqData.electrode_classification_actual || null,
        electrode_classification_range: wpqData.electrode_classification_range || null,
        filler_metal_fno_actual: wpqData.filler_metal_fno_actual || null,
        filler_metal_fno_range: wpqData.filler_metal_fno_range || null,
        
        consumable_insert_actual: wpqData.consumable_insert_actual || null,
        consumable_insert_range: wpqData.consumable_insert_range || null,
        filler_product_form_actual: wpqData.filler_product_form_actual || null,
        filler_product_form_range: wpqData.filler_product_form_range || null,
        process1: wpqData.process1 || null,
        process1_3layers_minimum: wpqData.process1_3layers_minimum || false,
        process2: wpqData.process2 || null,
        process2_3layers_minimum: wpqData.process2_3layers_minimum || false,
        deposited_thickness_actual: wpqData.deposited_thickness_actual || null,
        deposited_thickness_range: wpqData.deposited_thickness_range || null,
        process1_actual: wpqData.process1_actual || null,
        process1_range: wpqData.process1_range || null,
        process2_actual: wpqData.process2_actual || null,
        process2_range: wpqData.process2_range || null,
        position_actual: wpqData.position_actual || null,
        position_range: wpqData.position_range || null,
        vertical_progression_actual: wpqData.vertical_progression_actual || null,
        vertical_progression_range: wpqData.vertical_progression_range || null,
        fuel_gas_type_actual: wpqData.fuel_gas_type_actual || null,
        fuel_gas_type_range: wpqData.fuel_gas_type_range || null,
        inert_gas_backing_actual: wpqData.inert_gas_backing_actual || null,
        inert_gas_backing_range: wpqData.inert_gas_backing_range || null,
        transfer_mode_actual: wpqData.transfer_mode_actual || null,
        transfer_mode_range: wpqData.transfer_mode_range || null,
        gtaw_polarity_actual: wpqData.gtaw_polarity_actual || null,
        gtaw_polarity_range: wpqData.gtaw_polarity_range || null,
        
        // Section 5: Results
        visual_exam_complete: wpqData.visual_exam_complete || null,
        test_types: wpqData.test_types || null,
        test_results: wpqData.test_results || null,
        alt_volumetric_exam_result: wpqData.alt_volumetric_exam_result || null,
        alt_volumetric_exam_result_type: wpqData.alt_volumetric_exam_result_type || null,
        fillet_weld_fracture_test: wpqData.fillet_weld_fracture_test || null,
        defect_length_percent: wpqData.defect_length_percent || null,
        fillet_welds: wpqData.fillet_welds || null,
        macro_examination: wpqData.macro_examination || null,
        fillet_size: wpqData.fillet_size || null,
        concavity_convexity_in: wpqData.concavity_convexity_in || null,
        other_tests: wpqData.other_tests || null,
        film_evaluated_by: wpqData.film_evaluated_by || null,
        evaluator_company_name: wpqData.evaluator_company_name || null,
        mechanical_tests_conduct: wpqData.mechanical_tests_conduct || null,
        test_cert_no: wpqData.test_cert_no || null,
        welding_supervised_by: wpqData.welding_supervised_by || null,
        
        // Section 6: Certification
        code_year: wpqData.code_year || null,
        certified_date: wpqData.certified_date || null,
        certified_print_name: wpqData.certified_print_name || null,
        certified_by_cert_no: wpqData.certified_by_cert_no || null,
        certifier_signature_url: wpqData.certifier_signature_url || null,  // ✅ NEW
        reviewed_date: wpqData.reviewed_date || null,
        reviewed_by_name: wpqData.reviewed_by_name || null,
        reviewer_signature_url: wpqData.reviewer_signature_url || null,    // ✅ NEW
        client_rep_date: wpqData.client_rep_date || null,
        client_rep_name: wpqData.client_rep_name || null,
        client_rep_signature_url: wpqData.client_rep_signature_url || null, // ✅ NEW
        form_no: wpqData.form_no || null,
        date_of_issue: wpqData.date_of_issue || null,
        
        updated_at: new Date().toISOString(),
      }

      const { data, error } = await supabase
        .from('wpq_records')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      console.log('✅ WPQ record updated successfully')
      return { data, error: null }
    } catch (error) {
      console.error('❌ Update WPQ record error:', error)
      return { data: null, error: error.message }
    }
  }

  /**
   * ✅ FIXED: Search WPQ records by welder name, client, or certificate number
   * Uses proper Supabase filter syntax with inner join
   * 
   * @param {string} searchTerm - Search query
   * @returns {Promise<{data: Array|null, error: string|null}>}
   */
  async searchWPQRecords(searchTerm) {
    try {
      if (!searchTerm || searchTerm.trim() === '') {
        return this.getAllWPQRecords()
      }

      const cleanTerm = searchTerm.trim()

      // ✅ FIXED: Use inner join and proper filter syntax
      const { data, error } = await supabase
        .from('wpq_records')
        .select(`
          *,
          welder:welders!inner (
            id,
            certificate_no,
            symbol_stamp_no,
            welder_name,
            welder_name_short,
            iqama_passport_no,
            photo_url,
            designation,
            date_of_birth,
            date_of_joining,
            signature_url,
            client_contractor,
            client_name_short,
            status,
            is_deleted
          )
        `)
        .eq('welder.is_deleted', false)
        .or(`welder_name.ilike.%${cleanTerm}%,certificate_no.ilike.%${cleanTerm}%,client_contractor.ilike.%${cleanTerm}%`, { 
          foreignTable: 'welder' 
        })
        .order('created_at', { ascending: false })

      if (error) throw error

      // Filter out any null welders (safety check)
      const filteredData = (data || []).filter(record => record.welder !== null)

      console.log(`✅ Search found ${filteredData.length} records for "${cleanTerm}"`)
      return { data: filteredData, error: null }
    } catch (error) {
      console.error('❌ Search WPQ records error:', error)
      return { data: null, error: error.message }
    }
  }
}

export default new WPQService()