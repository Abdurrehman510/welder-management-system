
import { supabase } from '../lib/supabase'
import storageService from './storageService'

/**
 * Welder Service - CRUD operations with enhanced error handling
 * NOW WITH: Duplicate key detection, network error handling
 */

class WelderService {
  /**
   * Upload pending files to storage
   */
  async uploadPendingFiles(formData) {
    const uploadedData = {
      photoUrl: null,
      signatureUrl: null,
      continuitySignatures: []
    }

    try {
      // 1. Upload welder photo if it's a File object
      if (formData.basicInfo.photo && formData.basicInfo.photo instanceof File) {
        console.log('Uploading welder photo...')
        const { url, error } = await storageService.uploadPhoto(formData.basicInfo.photo)
        if (error) {
          throw new Error(`Photo upload failed: ${error}`)
        }
        uploadedData.photoUrl = url
        console.log('✓ Photo uploaded:', url)
      } else if (formData.basicInfo.photoUrl) {
        uploadedData.photoUrl = formData.basicInfo.photoUrl
      }

      // 2. Upload welder signature if it's a File object
      if (formData.basicInfo.signature && formData.basicInfo.signature instanceof File) {
        console.log('Uploading welder signature...')
        const { url, error } = await storageService.uploadSignature(formData.basicInfo.signature)
        if (error) {
          throw new Error(`Signature upload failed: ${error}`)
        }
        uploadedData.signatureUrl = url
        console.log('✓ Signature uploaded:', url)
      } else if (formData.basicInfo.signatureUrl) {
        uploadedData.signatureUrl = formData.basicInfo.signatureUrl
      }

      // 3. Upload continuity signatures
      if (formData.continuity?.continuityRecords?.length > 0) {
        console.log(`Uploading continuity signatures for ${formData.continuity.continuityRecords.length} records...`)
        
        for (let i = 0; i < formData.continuity.continuityRecords.length; i++) {
          const record = formData.continuity.continuityRecords[i]
          const uploadedRecord = { ...record }

          // Upload verifier signature
          if (record.verifierSignature && record.verifierSignature instanceof File) {
            const { url, error } = await storageService.uploadSignature(record.verifierSignature)
            if (error) {
              console.error(`Verifier signature upload failed for record ${i}:`, error)
            } else {
              uploadedRecord.verifierSignatureUrl = url
              console.log(`✓ Verifier signature ${i} uploaded`)
            }
          }

          // Upload QC signature
          if (record.qcSignature && record.qcSignature instanceof File) {
            const { url, error } = await storageService.uploadSignature(record.qcSignature)
            if (error) {
              console.error(`QC signature upload failed for record ${i}:`, error)
            } else {
              uploadedRecord.qcSignatureUrl = url
              console.log(`✓ QC signature ${i} uploaded`)
            }
          }

          uploadedData.continuitySignatures.push(uploadedRecord)
        }
      }

      return uploadedData
    } catch (error) {
      console.error('File upload error:', error)
      throw error
    }
  }

  /**
   * Create new welder with comprehensive error handling
   */
  async createWelder(formData) {
    try {
      // Check network connection
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        throw new Error('No internet connection. Please check your network and try again.')
      }

      // Get current authenticated user
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        throw new Error('User not authenticated')
      }

      console.log('📄 Starting welder creation process...')

      // STEP 0: Upload all pending files first
      console.log('📤 Uploading files...')
      const uploadedFiles = await this.uploadPendingFiles(formData)
      console.log('✅ All files uploaded successfully')

      // 1. Create welder record
      const welderData = {
        certificate_no: formData.basicInfo.certificateNo,
        symbol_stamp_no: formData.basicInfo.symbolStampNo || null,
        welder_name: formData.basicInfo.welderName,
        welder_name_short: formData.basicInfo.welderNameShort || null,
        iqama_passport_no: formData.basicInfo.iqamaPassport,
        photo_url: uploadedFiles.photoUrl,
        designation: formData.basicInfo.designation || null,
        date_of_birth: formData.basicInfo.dateOfBirth || null,
        date_of_joining: formData.basicInfo.dateOfJoining || null,
        signature_url: uploadedFiles.signatureUrl,
        client_contractor: formData.basicInfo.clientContractor || null,
        client_name_short: formData.basicInfo.clientNameShort || null,
        status: 'active',
        created_by: user.id,
      }

      console.log('Creating welder record...')

      const { data: welder, error: welderError } = await supabase
        .from('welders')
        .insert(welderData)
        .select()
        .single()

      if (welderError) {
        console.error('Welder creation error:', welderError)
        
        // Check for duplicate certificate number
        if (welderError.code === '23505' || welderError.message.includes('duplicate') || welderError.message.includes('unique')) {
          throw new Error('duplicate_certificate_no')
        }
        
        throw welderError
      }

      console.log('✅ Welder created:', welder.id)

      // 2. Create WPQ record
      const wpqData = {
        welder_id: welder.id,
        date_welded: formData.basicInfo.dateWelded,
        
        // Section 2: Test Description
        wps_identification: formData.testDescription.wpsIdentification || null,
        wps_identification_type: formData.testDescription.wpsType || null,
        base_metal_specification: formData.testDescription.baseMetalSpec || null,
        thickness_mm: formData.testDescription.thicknessMm || null,
        
        // Section 3 & 4: Testing Variables (all optional fields)
        welding_processes_actual: formData.testingVars1?.weldingProcessesActual || null,
        welding_processes_range: formData.testingVars1?.weldingProcessesRange || null,
        welding_type_actual: formData.testingVars1?.weldingTypeActual || null,
        welding_type_range: formData.testingVars1?.weldingTypeRange || null,
        plate_pipe_type: formData.testingVars1?.platePipeType || null,
        backing_type_actual: formData.testingVars1?.backingTypeActual || null,
        backing_type_range: formData.testingVars1?.backingTypeRange || null,
        plate_pipe_actual: formData.testingVars1?.platePipeActual || null,
        plate_pipe_range: formData.testingVars1?.platePipeRange || null,
        base_metal_pno_actual: formData.testingVars1?.baseMetalPnoActual || null,
        base_metal_pno_range: formData.testingVars1?.baseMetalPnoRange || null,
        filler_metal_addition_actual: formData.testingVars1?.fillerMetalAdditionActual || null,
        filler_metal_addition_range: formData.testingVars1?.fillerMetalAdditionRange || null,
        filler_specification_actual: formData.testingVars1?.fillerSpecificationActual || null,
        filler_specification_range: formData.testingVars1?.fillerSpecificationRange || null,
        electrode_classification_actual: formData.testingVars1?.electrodeClassificationActual || null,
        electrode_classification_range: formData.testingVars1?.electrodeClassificationRange || null,
        filler_metal_fno_actual: formData.testingVars1?.fillerMetalFnoActual || null,
        filler_metal_fno_range: formData.testingVars1?.fillerMetalFnoRange || null,
        
        consumable_insert_actual: formData.testingVars2?.consumableInsertActual || null,
        consumable_insert_range: formData.testingVars2?.consumableInsertRange || null,
        filler_product_form_actual: formData.testingVars2?.fillerProductFormActual || null,
        filler_product_form_range: formData.testingVars2?.fillerProductFormRange || null,
        process1: formData.testingVars2?.process1 || null,
        process1_3layers_minimum: formData.testingVars2?.process1_3layers || false,
        process2: formData.testingVars2?.process2 || null,
        process2_3layers_minimum: formData.testingVars2?.process2_3layers || false,
        deposited_thickness_actual: formData.testingVars2?.depositedThicknessActual || null,
        deposited_thickness_range: formData.testingVars2?.depositedThicknessRange || null,
        process1_actual: formData.testingVars2?.process1Actual || null,
        process1_range: formData.testingVars2?.process1Range || null,
        process2_actual: formData.testingVars2?.process2Actual || null,
        process2_range: formData.testingVars2?.process2Range || null,
        position_actual: formData.testingVars2?.positionActual || null,
        position_range: formData.testingVars2?.positionRange || null,
        vertical_progression_actual: formData.testingVars2?.verticalProgressionActual || null,
        vertical_progression_range: formData.testingVars2?.verticalProgressionRange || null,
        fuel_gas_type_actual: formData.testingVars2?.fuelGasTypeActual || null,
        fuel_gas_type_range: formData.testingVars2?.fuelGasTypeRange || null,
        inert_gas_backing_actual: formData.testingVars2?.inertGasBackingActual || null,
        inert_gas_backing_range: formData.testingVars2?.inertGasBackingRange || null,
        transfer_mode_actual: formData.testingVars2?.transferModeActual || null,
        transfer_mode_range: formData.testingVars2?.transferModeRange || null,
        gtaw_polarity_actual: formData.testingVars2?.gtawPolarityActual || null,
        gtaw_polarity_range: formData.testingVars2?.gtawPolarityRange || null,
        
        // Section 5: Results
        visual_exam_complete: formData.results?.visualExam || null,
        test_types: formData.results?.testTypes || null,
        test_results: formData.results?.testResults || null,
        alt_volumetric_exam_result: formData.results?.altVolumetricResult || null,
        alt_volumetric_exam_result_type: formData.results?.altVolumetricType || null,
        fillet_weld_fracture_test: formData.results?.filletWeldTest || null,
        defect_length_percent: formData.results?.defectLength || null,
        fillet_welds: formData.results?.filletWelds || null,
        macro_examination: formData.results?.macroExam || null,
        fillet_size: formData.results?.filletSize || null,
        concavity_convexity_in: formData.results?.concavityConvexity || null,
        other_tests: formData.results?.otherTests || null,
        film_evaluated_by: formData.results?.filmEvaluatedBy || null,
        evaluator_company_name: formData.results?.evaluatorCompany || null,
        mechanical_tests_conduct: formData.results?.mechanicalTestsConductor || null,
        test_cert_no: formData.results?.testCertNo || null,
        welding_supervised_by: formData.results?.weldingSupervisedBy || null,
        
        // Section 6: Certification
        code_year: formData.continuity?.codeYear || new Date().getFullYear().toString(),
        certified_date: formData.continuity?.certifiedDate || null,
        certified_print_name: formData.continuity?.certifiedName || null,
        certified_by_cert_no: formData.continuity?.certifiedCertNo || null,
        reviewed_date: formData.continuity?.reviewedDate || null,
        reviewed_by_name: formData.continuity?.reviewedName || null,
        client_rep_date: formData.continuity?.clientRepDate || null,
        client_rep_name: formData.continuity?.clientRepName || null,
        form_no: formData.continuity?.formNo || null,
        date_of_issue: formData.continuity?.dateOfIssue || null,
      }

      console.log('Creating WPQ record...')

      const { data: wpqRecord, error: wpqError } = await supabase
        .from('wpq_records')
        .insert(wpqData)
        .select()
        .single()

      if (wpqError) {
        console.error('WPQ record creation error:', wpqError)
        throw wpqError
      }

      console.log('✅ WPQ record created:', wpqRecord.id)

      // 3. Create continuity records with uploaded signatures
      if (uploadedFiles.continuitySignatures.length > 0) {
        const continuityData = uploadedFiles.continuitySignatures.map(record => ({
          welder_id: welder.id,
          wpq_record_id: wpqRecord.id,
          continuity_date: record.date,
          verifier_name: record.verifier || null,
          verifier_signature_url: record.verifierSignatureUrl || null,
          company: record.company || null,
          reference: record.reference || null,
          qc_name: record.qcName || null,
          qc_signature_url: record.qcSignatureUrl || null,
        }))

        console.log(`Creating ${continuityData.length} continuity records...`)

        const { error: continuityError } = await supabase
          .from('continuity_records')
          .insert(continuityData)

        if (continuityError) {
          console.error('Continuity records creation error:', continuityError)
          throw continuityError
        }

        console.log('✅ Continuity records created')
      }

      console.log('🎉 All records created successfully!')

      return { 
        data: { welder, wpqRecord }, 
        error: null 
      }
    } catch (error) {
      console.error('❌ Create welder error:', error)
      
      // Return user-friendly error messages
      if (error.message === 'duplicate_certificate_no') {
        return { data: null, error: 'duplicate_certificate_no' }
      }
      
      if (error.message?.includes('network') || error.message?.includes('fetch')) {
        return { data: null, error: 'network_error' }
      }
      
      return { 
        data: null, 
        error: error.message || 'Failed to create welder record'
      }
    }
  }

  /**
   * Get welder by ID with all related records
   * @param {string} id - Welder UUID
   * @returns {Promise<{data: Object|null, error: string|null}>}
   */
  async getWelderById(id) {
    try {
      const { data, error } = await supabase
        .from('welders')
        .select(`
          *,
          wpq_records (*),
          continuity_records (*)
        `)
        .eq('id', id)
        .eq('is_deleted', false)
        .single()

      if (error) throw error

      return { data, error: null }
    } catch (error) {
      console.error('Get welder error:', error)
      return { data: null, error: error.message }
    }
  }

  /**
   * Get all welders (not deleted)
   * @returns {Promise<{data: Array|null, error: string|null}>}
   */
  async getAllWelders() {
    try {
      const { data, error } = await supabase
        .from('welders')
        .select('*')
        .eq('is_deleted', false)
        .order('created_at', { ascending: false })

      if (error) throw error

      return { data, error: null }
    } catch (error) {
      console.error('Get all welders error:', error)
      return { data: null, error: error.message }
    }
  }

  /**
   * Update welder information
   * @param {string} id - Welder UUID
   * @param {Object} formData - Updated form data
   * @returns {Promise<{data: Object|null, error: string|null}>}
   */
  async updateWelder(id, formData) {
    try {
      // Upload pending files if any
      const uploadedFiles = await this.uploadPendingFiles(formData)

      // Update welder basic info
      const welderData = {
        symbol_stamp_no: formData.basicInfo.symbolStampNo || null,
        welder_name: formData.basicInfo.welderName,
        welder_name_short: formData.basicInfo.welderNameShort || null,
        iqama_passport_no: formData.basicInfo.iqamaPassport,
        photo_url: uploadedFiles.photoUrl,
        designation: formData.basicInfo.designation || null,
        date_of_birth: formData.basicInfo.dateOfBirth || null,
        date_of_joining: formData.basicInfo.dateOfJoining || null,
        signature_url: uploadedFiles.signatureUrl,
        client_contractor: formData.basicInfo.clientContractor || null,
        client_name_short: formData.basicInfo.clientNameShort || null,
        updated_at: new Date().toISOString(),
      }

      const { error: welderError } = await supabase
        .from('welders')
        .update(welderData)
        .eq('id', id)

      if (welderError) throw welderError

      return { data: { success: true }, error: null }
    } catch (error) {
      console.error('Update welder error:', error)
      return { data: null, error: error.message }
    }
  }

  /**
   * Delete welder (soft delete)
   * @param {string} id - Welder UUID
   * @returns {Promise<{error: string|null}>}
   */
  async deleteWelder(id) {
    try {
      const { error } = await supabase
        .from('welders')
        .update({ 
          is_deleted: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)

      if (error) throw error

      return { error: null }
    } catch (error) {
      console.error('Delete welder error:', error)
      return { error: error.message }
    }
  }

  /**
   * Search welders by name, certificate number, or client
   * @param {string} searchTerm - Search query
   * @returns {Promise<{data: Array|null, error: string|null}>}
   */
  async searchWelders(searchTerm) {
    try {
      if (!searchTerm || searchTerm.trim() === '') {
        return this.getAllWelders()
      }

      const { data, error } = await supabase
        .from('welders')
        .select('*')
        .eq('is_deleted', false)
        .or(`welder_name.ilike.%${searchTerm}%,certificate_no.ilike.%${searchTerm}%,client_contractor.ilike.%${searchTerm}%`)
        .order('created_at', { ascending: false })

      if (error) throw error

      return { data, error: null }
    } catch (error) {
      console.error('Search welders error:', error)
      return { data: null, error: error.message }
    }
  }

  /**
   * Search by company name or certificate number (for Search Page)
   * @param {string} searchTerm - Company name or certificate number
   * @returns {Promise<{data: Array|null, error: string|null}>}
   */
  async searchByCompanyOrCert(searchTerm) {
    try {
      if (!searchTerm || searchTerm.trim() === '') {
        return { data: [], error: null }
      }

      const { data, error } = await supabase
        .from('welders')
        .select('*')
        .eq('is_deleted', false)
        .or(`client_contractor.ilike.%${searchTerm}%,certificate_no.ilike.%${searchTerm}%`)
        .order('created_at', { ascending: false })

      if (error) throw error

      return { data, error: null }
    } catch (error) {
      console.error('Search by company/cert error:', error)
      return { data: null, error: error.message }
    }
  }

  /**
   * Check if certificate number already exists
   * @param {string} certificateNo - Certificate number to check
   * @param {string} excludeId - Welder ID to exclude (for updates)
   * @returns {Promise<{exists: boolean, error: string|null}>}
   */
  async checkCertificateExists(certificateNo, excludeId = null) {
    try {
      let query = supabase
        .from('welders')
        .select('id')
        .eq('certificate_no', certificateNo)
        .eq('is_deleted', false)

      if (excludeId) {
        query = query.neq('id', excludeId)
      }

      const { data, error } = await query

      if (error) throw error

      return { exists: data.length > 0, error: null }
    } catch (error) {
      console.error('Check certificate exists error:', error)
      return { exists: false, error: error.message }
    }
  }
}

export default new WelderService()