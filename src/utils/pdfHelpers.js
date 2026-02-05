// src/utils/pdfHelpers.js - FIXED QR CODE LOGIC
import { format, parseISO, isValid } from 'date-fns'

/**
 * PDF Helper Utilities - UPDATED WITH CORRECT QR LOGIC
 * ✅ Form1 QR → Points to Certificate verification
 * ✅ Certificate QR → Points to Form1 verification
 */

export const formatDate = (date, formatStr = 'dd MMM yyyy') => {
  if (!date) return 'N/A'
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
    if (!isValid(dateObj)) return 'N/A'
    return format(dateObj, formatStr)
  } catch (error) {
    console.warn('Date formatting error:', error)
    return 'N/A'
  }
}

export const formatCertDate = (date) => formatDate(date, 'dd MMM yyyy')
export const formatFormDate = (date) => formatDate(date, 'dd MMM yyyy')

export const safeValue = (value, defaultValue = 'N/A') => {
  if (value === null || value === undefined || value === '') {
    return defaultValue
  }
  const strValue = String(value).trim()
  return strValue || defaultValue
}

export const truncateText = (text, maxLength = 100) => {
  if (!text) return 'N/A'
  const str = String(text)
  if (str.length <= maxLength) return str
  return str.substring(0, maxLength - 3) + '...'
}

export const getInitials = (name) => {
  if (!name) return 'WL'
  const parts = name.trim().split(' ')
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
}

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

export const formatTestTypes = (testTypes) => {
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
    return defaultTypes
  }

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

  testTypes.forEach(dbKey => {
    const pdfKey = mapping[dbKey]
    if (pdfKey) {
      result[pdfKey] = true
    }
  })

  return result
}

export const transformForm1Data = (welderData) => {
  if (!welderData) return null

  const welder = welderData.welder || welderData
  const wpq = welderData.wpq_records?.[0] || welderData.wpqRecord || {}
  const continuity = welderData.continuity_records || welderData.continuityRecords || []

  return {
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
    wpsIdentification: safeValue(wpq.wps_identification),
    wpsType: safeValue(wpq.wps_identification_type),
    baseMetalSpec: safeValue(wpq.base_metal_specification),
    thickness: wpq.thickness_mm ? `${wpq.thickness_mm} mm` : 'N/A',
    weldingProcessesActual: safeValue(wpq.welding_processes_actual),
    weldingProcessesRange: safeValue(wpq.welding_processes_range),
    weldingTypeActual: safeValue(wpq.welding_type_actual),
    weldingTypeRange: safeValue(wpq.welding_type_range),
    platePipeType: safeValue(wpq.plate_pipe_type, 'pipe'),
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
    consumableInsertActual: safeValue(wpq.consumable_insert_actual),
    consumableInsertRange: safeValue(wpq.consumable_insert_range),
    fillerProductFormActual: safeValue(wpq.filler_product_form_actual),
    fillerProductFormRange: safeValue(wpq.filler_product_form_range),
    process1: safeValue(wpq.process1),
    process1_3layers: wpq.process1_3layers_minimum === true,
    process2: safeValue(wpq.process2),
    process2_3layers: wpq.process2_3layers_minimum === true,
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
    // ================= SECTION 6 – SIGNATURE URLS (CRITICAL) =================
    certifierSignatureUrl: wpq.certifier_signature_url
      ? wpq.certifier_signature_url.replace(/^["']|["']$/g, '').trim()
      : null,

    reviewerSignatureUrl: wpq.reviewer_signature_url
      ? wpq.reviewer_signature_url.replace(/^["']|["']$/g, '').trim()
      : null,

    clientRepSignatureUrl: wpq.client_rep_signature_url
      ? wpq.client_rep_signature_url.replace(/^["']|["']$/g, '').trim()
      : null,
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
 * Transform welder data for Certificate PDF
 * ✅ FIXED: Clean malformed URLs with extra quotes
 */
export const transformCertificateData = (welderData) => {
  if (!welderData) {
    console.error('❌ No data provided for certificate')
    return null
  }

  const welder = welderData.welder || welderData
  const wpq = welderData.wpq_records?.[0] || welderData.wpqRecord || {}

  console.log('🔄 Transform Certificate - Input:', {
    welderName: welder?.welder_name,
    certificateNo: welder?.certificate_no,
    hasWpqData: !!wpq,
    wpqKeys: Object.keys(wpq || {})
  })

  // ✅ FIX: Utility to clean malformed URLs
  const cleanUrl = (url) => {
    if (!url || typeof url !== 'string') return null
    // Remove leading/trailing quotes and trim whitespace
    return url.replace(/^["']|["']$/g, '').trim()
  }

  const certificateNo = safeValue(welder.certificate_no)
  
  // Build qualifications array with fallback values
  const qualifications = [
    {
      variable: 'Welding Process',
      actual: safeValue(wpq.welding_processes_actual, ''),
      range: safeValue(wpq.welding_processes_range, '')
    },
    {
      variable: 'TYPE(Manual/Semi/Auto)',
      actual: safeValue(wpq.welding_type_actual, ''),
      range: safeValue(wpq.welding_type_range, '')
    },
    {
      variable: 'P No',
      actual: safeValue(wpq.base_metal_pno_actual, ''),
      range: safeValue(wpq.base_metal_pno_range, '')
    },
    {
      variable: 'DIAMETER(TUBE)',
      actual: wpq.plate_pipe_actual ? safeValue(wpq.plate_pipe_actual, '') : 
             (wpq.thickness_mm ? `Ø ${wpq.thickness_mm}mm` : ''),
      range: safeValue(wpq.plate_pipe_range, '')
    },
    {
      variable: 'THICKNESS(TUBE)',
      actual: wpq.thickness_mm ? `${wpq.thickness_mm} mm` : '',
      range: wpq.thickness_mm ? `Up to ${wpq.thickness_mm} mm` : ''
    },
    {
      variable: 'LIGAMENT SIZE',
      actual: '',
      range: ''
    },
    {
      variable: 'GROOVE TYPE',
      actual: '',
      range: ''
    },
    {
      variable: 'DEPTH OF GROOVE',
      actual: '',
      range: ''
    },
    {
      variable: 'FILLER METAL CLASS & F NO',
      actual: safeValue(wpq.filler_metal_fno_actual, ''),
      range: safeValue(wpq.filler_metal_fno_range, '')
    },
    {
      variable: 'FILLER METAL PRODUCT FORM',
      actual: safeValue(wpq.filler_product_form_actual, ''),
      range: safeValue(wpq.filler_product_form_range, '')
    },
    {
      variable: 'BACKING (WITH, WITHOUT)',
      actual: safeValue(wpq.backing_type_actual, ''),
      range: safeValue(wpq.backing_type_range, '')
    },
    {
      variable: 'POSITION',
      actual: safeValue(wpq.position_actual, ''),
      range: safeValue(wpq.position_range, '')
    },
    {
      variable: 'PROGRESSION',
      actual: safeValue(wpq.vertical_progression_actual, ''),
      range: safeValue(wpq.vertical_progression_range, '')
    },
    {
      variable: 'CURRENT LEVEL(1st Layer, Ø1.6MM)',
      actual: safeValue(wpq.process1_actual, ''),
      range: safeValue(wpq.process1_range, '')
    },
    {
      variable: 'CURRENT LEVEL(2nd Layer, Ø1.6MM)',
      actual: safeValue(wpq.process2_actual, ''),
      range: safeValue(wpq.process2_range, '')
    },
    {
      variable: 'PREPLACED FILLER METAL',
      actual: '',
      range: ''
    },
    {
      variable: 'INERT GAS BACKING(GTAW)',
      actual: safeValue(wpq.inert_gas_backing_actual, ''),
      range: safeValue(wpq.inert_gas_backing_range, '')
    },
    {
      variable: 'CURRENT & POLARITY(GTAW)',
      actual: safeValue(wpq.gtaw_polarity_actual, ''),
      range: safeValue(wpq.gtaw_polarity_range, '')
    }
  ]

  console.log('✅ Qualifications built:', qualifications.length, 'rows')

  const result = {
    // Required for validation
    certificateNo: certificateNo,
    welderName: safeValue(welder.welder_name),
    iqamaPassport: safeValue(welder.iqama_passport_no),

    // Front page
    cardNo: `W.Q.T - ${certificateNo}`,
    welderNo: safeValue(welder.symbol_stamp_no),
    company: safeValue(welder.client_contractor, 'International Systems & Solutions'),
    inspectorName: safeValue(wpq.certified_print_name, 'Quality Control Inspector'),
    cswipCertNo: safeValue(wpq.certified_by_cert_no),
    clientRep: safeValue(wpq.client_rep_name, 'Client Representative'),
    
    // ✅ FIXED: Clean all URLs to remove extra quotes
    photoUrl: cleanUrl(welder.photo_url),
    signatureUrl: cleanUrl(welder.signature_url),
    certifierSignatureUrl: cleanUrl(wpq.certifier_signature_url),
    reviewerSignatureUrl: cleanUrl(wpq.reviewer_signature_url),
    clientRepSignatureUrl: cleanUrl(wpq.client_rep_signature_url),
    
    // Back page
    testingWONo: safeValue(wpq.testing_wo_no),
    symbolIDNo: safeValue(welder.symbol_stamp_no),
    wpsNo: safeValue(wpq.wps_identification, 'WPS-001'),
    dateWelded: formatCertDate(wpq.date_welded),
    
    // Qualifications array
    qualifications: qualifications,
    
    // Footer
    formNo: safeValue(wpq.form_no, '001'),
    footerText: "This card on its own qualifies the welder for 6 months from the date of welded. Beyond the date welding records must be verified to ensure the welder's qualification has been maintained.",
    footerDate: `Date: ${formatCertDate(wpq.date_of_issue || new Date())}`
  }

  console.log('✅ Certificate data complete:', {
    welderName: result.welderName,
    certificateNo: result.certificateNo,
    hasQualifications: !!result.qualifications,
    qualCount: result.qualifications?.length,
    hasCertifierSignature: !!result.certifierSignatureUrl,
    certifierUrl: result.certifierSignatureUrl
  })

  return result
}

export const validatePDFData = (data, pdfType) => {
  const errors = []

  if (!data) {
    errors.push('No data provided for PDF generation')
    return { valid: false, errors }
  }

  const requiredFields = {
    form1: ['certificateNo', 'welderName', 'iqamaPassport'],
    form2: ['certificateNo', 'welderName'],
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
 * ✅ FIXED: Generate QR verification URLs
 * Form1 QR → Points to Certificate verification page
 * Certificate QR → Points to Form1 verification page
 */

// Generate QR for Form1 PDF → Should open Certificate
export const generateForm1QRCode = (certificateNo) => {
  const baseUrl = import.meta.env.VITE_APP_URL || 'http://localhost:5173'
  const encodedCertNo = encodeURIComponent(certificateNo)
  const verificationUrl = `${baseUrl}/verify/certificate/${encodedCertNo}`
  console.log('📋 Form1 QR URL (opens Certificate):', verificationUrl)
  return verificationUrl
}

// Generate QR for Certificate PDF → Should open Form1
export const generateCertificateQRCode = (certificateNo) => {
  const baseUrl = import.meta.env.VITE_APP_URL || 'http://localhost:5173'
  const encodedCertNo = encodeURIComponent(certificateNo)
  const verificationUrl = `${baseUrl}/verify/form1/${encodedCertNo}`
  console.log('🎴 Certificate QR URL (opens Form1):', verificationUrl)
  return verificationUrl
}

// Backward compatibility - defaults to Form1 QR behavior
export const generateQRVerificationURL = (certificateNo, welderName) => {
  return generateForm1QRCode(certificateNo)
}