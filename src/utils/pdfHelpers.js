import { format, parseISO, isValid } from 'date-fns'

/**
 * PDF Helper Utilities - FIXED VERSION
 * ✅ Fixed test types mapping
 * ✅ Fixed checkbox/radio data handling
 */

/**
 * Format date for PDF display
 */
export const formatDate = (date, formatStr = 'dd MMM yyyy') => {
  if (!date) return 'N/A'
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    if (!isValid(dateObj)) return 'N/A'
    return format(dateObj, formatStr)
  } catch (error) {
    console.error('Date formatting error:', error)
    return 'N/A'
  }
}

export const formatCertDate = (date) => formatDate(date, 'dd MMM yyyy')
export const formatFormDate = (date) => formatDate(date, 'dd MMM yyyy')

/**
 * Safe field value getter
 */
export const safeValue = (value, defaultValue = 'N/A') => {
  if (value === null || value === undefined || value === '') {
    return defaultValue
  }
  return String(value).trim() || defaultValue
}

/**
 * Truncate long text for PDF display
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return 'N/A'
  const str = String(text)
  if (str.length <= maxLength) return str
  return str.substring(0, maxLength - 3) + '...'
}

/**
 * Get welder initials from name
 */
export const getInitials = (name) => {
  if (!name) return 'WL'
  const parts = name.trim().split(' ')
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
}

/**
 * Format test results for PDF (ensures 6 rows)
 */
export const formatTestResults = (testResults) => {
  const defaultResults = Array(6).fill({ type: 'None', result: 'None' })
  
  if (!testResults || !Array.isArray(testResults)) {
    return defaultResults
  }

  return testResults.map((result, index) => ({
    type: safeValue(result?.type, 'None'),
    result: safeValue(result?.result, 'None')
  })).concat(defaultResults).slice(0, 6)
}

/**
 * ✅ FIXED: Format test types checkboxes
 * Maps database values to PDF checkbox states
 * 
 * Database format: ["side", "transverse", "plate", "pipe-macro", "pipe"]
 * PDF format: { sideBend: true, transverseBend: true, ... }
 */
export const formatTestTypes = (testTypes) => {
  console.log('🔧 formatTestTypes input:', testTypes)
  
  const defaultTypes = {
    transverseBend: false,
    longitudinalBend: false,
    sideBend: false,
    pipeBendSpecimen: false,
    plateBendSpecimen: false,
    pipeMacroFusion: false,
    plateMacroFusion: false
  }

  if (!testTypes || !Array.isArray(testTypes) || testTypes.length === 0) {
    console.log('❌ No test types found, returning all false')
    return defaultTypes
  }

  // ✅ MAPPING: Database keys → PDF checkbox keys
  const mapping = {
    'side': 'sideBend',
    'transverse': 'transverseBend',
    'longitudinal': 'longitudinalBend',
    'pipe': 'pipeBendSpecimen',
    'plate': 'plateBendSpecimen',
    'pipe-macro': 'pipeMacroFusion',
    'plate-macro': 'plateMacroFusion'
  }

  const result = { ...defaultTypes }

  // Convert database format to checkbox format
  testTypes.forEach(dbKey => {
    const pdfKey = mapping[dbKey]
    if (pdfKey) {
      result[pdfKey] = true
      console.log(`✓ Mapped "${dbKey}" → "${pdfKey}" = true`)
    } else {
      console.warn(`⚠️ Unknown test type: "${dbKey}"`)
    }
  })

  console.log('✅ formatTestTypes output:', result)
  return result
}

/**
 * Transform welder data for Form1 PDF
 */
export const transformForm1Data = (welderData) => {
  if (!welderData) return null

  const welder = welderData.welder || welderData
  const wpq = welderData.wpq_records?.[0] || welderData.wpqRecord || {}
  const continuity = welderData.continuity_records || welderData.continuityRecords || []

  console.log('🔄 Transforming Form1 data...')
  console.log('   - Welder:', welder.welder_name)
  console.log('   - WPQ test_types (raw):', wpq.test_types)
  console.log('   - Plate/Pipe type:', wpq.plate_pipe_type)
  console.log('   - Process 1 3-layers:', wpq.process1_3layers_minimum, typeof wpq.process1_3layers_minimum)
  console.log('   - Process 2 3-layers:', wpq.process2_3layers_minimum, typeof wpq.process2_3layers_minimum)

  return {
    // Basic Info
    clientContractor: safeValue(welder.client_contractor),
    clientNameShort: safeValue(welder.client_name_short),
    welderName: safeValue(welder.welder_name),
    welderNameShort: safeValue(welder.welder_name_short),
    certificateNo: safeValue(welder.certificate_no),
    symbolStampNo: safeValue(welder.symbol_stamp_no),
    iqamaPassport: safeValue(welder.iqama_passport_no),
    dateWelded: formatFormDate(wpq.date_welded),
    photoUrl: welder.photo_url || null,
    designation: safeValue(welder.designation),
    dateOfBirth: formatFormDate(welder.date_of_birth),
    dateOfJoining: formatFormDate(welder.date_of_joining),
    signatureUrl: welder.signature_url || null,

    // Test Description
    wpsIdentification: safeValue(wpq.wps_identification),
    wpsType: safeValue(wpq.wps_identification_type),
    baseMetalSpec: safeValue(wpq.base_metal_specification),
    thickness: wpq.thickness_mm ? `${wpq.thickness_mm} mm` : 'N/A',

    // Testing Variables Part 1
    weldingProcessesActual: safeValue(wpq.welding_processes_actual),
    weldingProcessesRange: safeValue(wpq.welding_processes_range),
    weldingTypeActual: safeValue(wpq.welding_type_actual),
    weldingTypeRange: safeValue(wpq.welding_type_range),
    platePipeType: safeValue(wpq.plate_pipe_type, 'pipe'), // ✅ Default to 'pipe' if missing
    backingTypeActual: safeValue(wpq.backing_type_actual),
    backingTypeRange: safeValue(wpq.backing_type_range),
    platePipeActual: safeValue(wpq.plate_pipe_actual),
    platePipeRange: safeValue(wpq.plate_pipe_range),
    baseMetalPnoActual: safeValue(wpq.base_metal_pno_actual),
    baseMetalPnoRange: safeValue(wpq.base_metal_pno_range),
    fillerMetalAdditionActual: safeValue(wpq.filler_metal_addition_actual),
    fillerMetalAdditionRange: safeValue(wpq.filler_metal_addition_range),
    fillerSpecificationActual: safeValue(wpq.filler_specification_actual),
    fillerSpecificationRange: safeValue(wpq.filler_specification_range),
    electrodeClassificationActual: safeValue(wpq.electrode_classification_actual),
    electrodeClassificationRange: safeValue(wpq.electrode_classification_range),
    fillerMetalFnoActual: safeValue(wpq.filler_metal_fno_actual),
    fillerMetalFnoRange: safeValue(wpq.filler_metal_fno_range),

    // Testing Variables Part 2
    consumableInsertActual: safeValue(wpq.consumable_insert_actual),
    consumableInsertRange: safeValue(wpq.consumable_insert_range),
    fillerProductFormActual: safeValue(wpq.filler_product_form_actual),
    fillerProductFormRange: safeValue(wpq.filler_product_form_range),
    process1: safeValue(wpq.process1),
    process1_3layers: wpq.process1_3layers_minimum === true, // ✅ Strict boolean check
    process2: safeValue(wpq.process2),
    process2_3layers: wpq.process2_3layers_minimum === true, // ✅ Strict boolean check
    depositedThicknessActual: safeValue(wpq.deposited_thickness_actual),
    depositedThicknessRange: safeValue(wpq.deposited_thickness_range),
    process1Actual: safeValue(wpq.process1_actual),
    process1Range: safeValue(wpq.process1_range),
    process2Actual: safeValue(wpq.process2_actual),
    process2Range: safeValue(wpq.process2_range),
    positionActual: safeValue(wpq.position_actual),
    positionRange: safeValue(wpq.position_range),
    verticalProgressionActual: safeValue(wpq.vertical_progression_actual),
    verticalProgressionRange: safeValue(wpq.vertical_progression_range),
    fuelGasTypeActual: safeValue(wpq.fuel_gas_type_actual),
    fuelGasTypeRange: safeValue(wpq.fuel_gas_type_range),
    inertGasBackingActual: safeValue(wpq.inert_gas_backing_actual),
    inertGasBackingRange: safeValue(wpq.inert_gas_backing_range),
    transferModeActual: safeValue(wpq.transfer_mode_actual),
    transferModeRange: safeValue(wpq.transfer_mode_range),
    gtawPolarityActual: safeValue(wpq.gtaw_polarity_actual),
    gtawPolarityRange: safeValue(wpq.gtaw_polarity_range),

    // Results - ✅ FIXED: Use corrected formatTestTypes function
    visualExam: safeValue(wpq.visual_exam_complete),
    testTypes: formatTestTypes(wpq.test_types),
    testResults: formatTestResults(wpq.test_results),
    altVolumetricResult: safeValue(wpq.alt_volumetric_exam_result),
    altVolumetricType: safeValue(wpq.alt_volumetric_exam_result_type),
    filletWeldTest: safeValue(wpq.fillet_weld_fracture_test),
    defectLength: safeValue(wpq.defect_length_percent),
    filletWelds: safeValue(wpq.fillet_welds),
    macroExam: safeValue(wpq.macro_examination),
    filletSize: safeValue(wpq.fillet_size),
    concavityConvexity: safeValue(wpq.concavity_convexity_in),
    otherTests: safeValue(wpq.other_tests),
    filmEvaluatedBy: safeValue(wpq.film_evaluated_by),
    evaluatorCompany: safeValue(wpq.evaluator_company_name),
    mechanicalTestsConductor: safeValue(wpq.mechanical_tests_conduct),
    testCertNo: safeValue(wpq.test_cert_no),
    weldingSupervisedBy: safeValue(wpq.welding_supervised_by),

    // Certification
    codeYear: safeValue(wpq.code_year, new Date().getFullYear().toString()),
    certifiedDate: formatFormDate(wpq.certified_date),
    certifiedName: safeValue(wpq.certified_print_name),
    certifiedCertNo: safeValue(wpq.certified_by_cert_no),
    reviewedDate: formatFormDate(wpq.reviewed_date),
    reviewedName: safeValue(wpq.reviewed_by_name),
    clientRepDate: formatFormDate(wpq.client_rep_date),
    clientRepName: safeValue(wpq.client_rep_name),
    formNo: safeValue(wpq.form_no),
    dateOfIssue: formatFormDate(wpq.date_of_issue),

    // Continuity Records
    continuityRecords: continuity.map(record => ({
      date: formatFormDate(record.continuity_date),
      verifierName: safeValue(record.verifier_name),
      verifierSignatureUrl: record.verifier_signature_url || null,
      company: safeValue(record.company),
      reference: safeValue(record.reference),
      qcName: safeValue(record.qc_name),
      qcSignatureUrl: record.qc_signature_url || null
    }))
  }
}

/**
 * Transform welder data for Form2 PDF (Continuity Record)
 */
export const transformForm2Data = (welderData) => {
  if (!welderData) return null

  const welder = welderData.welder || welderData
  const wpq = welderData.wpq_records?.[0] || welderData.wpqRecord || {}
  const continuity = welderData.continuity_records || welderData.continuityRecords || []

  return {
    certificateNo: safeValue(welder.certificate_no),
    wpsNo: safeValue(wpq.wps_identification),
    welderName: safeValue(welder.welder_name),
    dateWelded: formatFormDate(wpq.date_welded),
    symbolStampNo: safeValue(welder.symbol_stamp_no),
    dateOfIssue: formatFormDate(wpq.date_of_issue),
    iqamaPassport: safeValue(welder.iqama_passport_no),
    photoUrl: welder.photo_url || null,
    continuityRecords: continuity.map(record => ({
      date: formatFormDate(record.continuity_date),
      verifierName: safeValue(record.verifier_name),
      verifierSignatureUrl: record.verifier_signature_url || null,
      company: safeValue(record.company),
      reference: safeValue(record.reference),
      qcName: safeValue(record.qc_name),
      qcSignatureUrl: record.qc_signature_url || null
    }))
  }
}

/**
 * Transform welder data for Certificate PDF (ID Card)
 */
export const transformCertificateData = (welderData) => {
  if (!welderData) return null

  const welder = welderData.welder || welderData
  const wpq = welderData.wpq_records?.[0] || welderData.wpqRecord || {}

  return {
    certificateNo: safeValue(welder.certificate_no),
    welderName: safeValue(welder.welder_name),
    iqamaPassport: safeValue(welder.iqama_passport_no),
    symbolStampNo: safeValue(welder.symbol_stamp_no),
    inspectorName: safeValue(wpq.certified_print_name),
    cswipCertNo: safeValue(wpq.certified_by_cert_no),
    qcName: safeValue(wpq.reviewed_by_name),
    photoUrl: welder.photo_url || null,
    wpsIdentification: safeValue(wpq.wps_identification),
    symbolStamp: safeValue(welder.symbol_stamp_no),
    date: formatCertDate(wpq.date_welded),
    processActual: safeValue(wpq.welding_processes_actual),
    typeActual: safeValue(wpq.welding_type_actual),
    pNumberActual: safeValue(wpq.base_metal_pno_actual),
    fNumberActual: safeValue(wpq.filler_metal_fno_actual),
    fillerMetalActual: safeValue(wpq.filler_product_form_actual),
    backingActual: safeValue(wpq.backing_type_actual),
    positionActual: safeValue(wpq.position_actual),
    progressionActual: safeValue(wpq.vertical_progression_actual),
    gasBackingActual: safeValue(wpq.inert_gas_backing_actual),
    polarityActual: safeValue(wpq.gtaw_polarity_actual),
    processRange: safeValue(wpq.welding_processes_range),
    typeRange: safeValue(wpq.welding_type_range),
    pNumberRange: safeValue(wpq.base_metal_pno_range),
    fNumberRange: safeValue(wpq.filler_metal_fno_range),
    fillerMetalRange: safeValue(wpq.filler_product_form_range),
    backingRange: safeValue(wpq.backing_type_range),
    positionRange: safeValue(wpq.position_range),
    progressionRange: safeValue(wpq.vertical_progression_range),
    gasBackingRange: safeValue(wpq.inert_gas_backing_range),
    polarityRange: safeValue(wpq.gtaw_polarity_range),
    validityDate: formatCertDate(wpq.date_of_issue)
  }
}

/**
 * Validate PDF data before generation
 */
export const validatePDFData = (data, pdfType) => {
  const errors = []

  if (!data) {
    errors.push('No data provided for PDF generation')
    return { valid: false, errors }
  }

  const requiredFields = {
    form1: ['certificateNo', 'welderName', 'iqamaPassport'],
    form2: ['certificateNo', 'welderName', 'wpsNo'],
    certificate: ['certificateNo', 'welderName', 'iqamaPassport']
  }

  const required = requiredFields[pdfType] || []

  required.forEach(field => {
    if (!data[field] || data[field] === 'N/A') {
      errors.push(`Missing required field: ${field}`)
    }
  })

  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * Generate QR code data URL for certificate verification
 */
export const generateQRVerificationURL = (certificateNo, welderName) => {
  const baseUrl = import.meta.env.VITE_APP_URL || 'http://localhost:5173'
  const verificationUrl = `${baseUrl}/verify/${encodeURIComponent(certificateNo)}`
  return verificationUrl
}