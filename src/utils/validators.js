import { z } from 'zod'

/**
 * Form1 Validation Schemas using Zod
 * Complete validation rules for Welder Management System Form1
 * ✅ FIXED: Flexible thickness validation to handle all number formats
 */

// ============================================
// SECTION 1: BASIC INFORMATION
// ============================================
export const basicInfoSchema = z.object({
  // Required fields (9 total)
  certificateNo: z.string()
    .min(1, 'Certificate number is required')
    .max(50, 'Certificate number too long'),
  
  welderName: z.string()
    .min(1, 'Welder name is required')
    .max(100, 'Welder name too long'),
  
  welderNameShort: z.string()
    .min(1, 'Welder name (short) is required')
    .max(50, 'Welder name (short) too long'),
  
  symbolStampNo: z.string()
    .min(1, 'Symbol/Stamp number is required')
    .max(50, 'Symbol/Stamp number too long'),
  
  clientContractor: z.string()
    .min(1, 'Client/Contractor is required')
    .max(100, 'Client/Contractor too long'),
  
  clientNameShort: z.string()
    .min(1, 'Client name (short) is required')
    .max(50, 'Client name (short) too long'),
  
  iqamaPassport: z.string()
    .min(10, 'Iqama/Passport must be at least 10 characters')
    .max(20, 'Iqama/Passport must not exceed 20 characters')
    .regex(/^[0-9]+$/, 'Iqama/Passport must contain only numbers'),
  
  dateWelded: z.string()
    .min(1, 'Date welded is required')
    .refine((date) => {
      const d = new Date(date)
      return !isNaN(d.getTime())
    }, 'Invalid date format'),
  
  dateOfBirth: z.string()
    .min(1, 'Date of birth is required')
    .refine((date) => {
      const d = new Date(date)
      return !isNaN(d.getTime()) && d < new Date()
    }, 'Date of birth must be in the past'),
  
  // Optional fields
  designation: z.string().max(100).optional().or(z.literal('')),
  
  dateOfJoining: z.string()
    .optional()
    .or(z.literal(''))
    .refine((date) => {
      if (!date || date === '') return true
      const d = new Date(date)
      return !isNaN(d.getTime())
    }, 'Invalid date format'),
  
  // File upload fields
  photoUrl: z.string().url().optional().or(z.literal('')).nullable(),
  signatureUrl: z.string().url().optional().or(z.literal('')).nullable(),
  photo: z.any().optional().nullable(),
  signature: z.any().optional().nullable(),
})

// ============================================
// SECTION 2: TEST DESCRIPTION
// ✅ FIXED: Flexible thickness validation
// ============================================
export const testDescriptionSchema = z.object({
  // Required fields
  wpsIdentification: z.string()
    .min(1, 'WPS Identification is required')
    .max(100, 'WPS Identification too long'),
  
  wpsType: z.enum(['test-coupon', 'production-weld'], {
    errorMap: () => ({ message: 'Please select WPS type (Test Coupon or Production Weld)' })
  }),
  
  baseMetalSpec: z.string()
    .min(1, 'Base metal specification is required')
    .max(100, 'Base metal specification too long'),
  
  // ✅ FIXED: Optional thickness field with flexible validation
  // Accepts: numbers, decimals (8.56, 8.5, 8), integers (8), or empty string
  thicknessMm: z.union([
    z.string().optional(),
    z.number(),
    z.literal(''),
    z.null()
  ]).transform((val) => {
    // If empty, null, or undefined, return empty string
    if (val === '' || val === null || val === undefined) {
      return ''
    }
    
    // If already a number, convert to string
    if (typeof val === 'number') {
      return val.toString()
    }
    
    // Return as-is if string
    return val
  }).refine((val) => {
    // Allow empty values
    if (!val || val === '') return true
    
    // Convert to string and clean
    const strVal = String(val).trim()
    if (strVal === '') return true
    
    // Check if it's a valid number (integer or decimal)
    // Accepts: 8, 8.5, 8.56, 25.25, 100, etc.
    const num = parseFloat(strVal)
    return !isNaN(num) && num > 0 && isFinite(num)
  }, 'Thickness must be a positive number (e.g., 8, 8.5, 8.56)')
})

// ============================================
// SECTION 3 & 4: TESTING VARIABLES
// ============================================
export const testingVarsSchema = z.object({
  // Section 3 fields
  weldingProcessesActual: z.string().optional().or(z.literal('')),
  weldingProcessesRange: z.string().optional().or(z.literal('')),
  weldingTypeActual: z.string().optional().or(z.literal('')),
  weldingTypeRange: z.string().optional().or(z.literal('')),
  platePipeType: z.string().optional().or(z.literal('')),
  backingTypeActual: z.string().optional().or(z.literal('')),
  backingTypeRange: z.string().optional().or(z.literal('')),
  platePipeActual: z.string().optional().or(z.literal('')),
  platePipeRange: z.string().optional().or(z.literal('')),
  baseMetalPnoActual: z.string().optional().or(z.literal('')),
  baseMetalPnoRange: z.string().optional().or(z.literal('')),
  fillerMetalAdditionActual: z.string().optional().or(z.literal('')),
  fillerMetalAdditionRange: z.string().optional().or(z.literal('')),
  fillerSpecificationActual: z.string().optional().or(z.literal('')),
  fillerSpecificationRange: z.string().optional().or(z.literal('')),
  electrodeClassificationActual: z.string().optional().or(z.literal('')),
  electrodeClassificationRange: z.string().optional().or(z.literal('')),
  fillerMetalFnoActual: z.string().optional().or(z.literal('')),
  fillerMetalFnoRange: z.string().optional().or(z.literal('')),
  
  // Section 4 fields
  consumableInsertActual: z.string().optional().or(z.literal('')),
  consumableInsertRange: z.string().optional().or(z.literal('')),
  fillerProductFormActual: z.string().optional().or(z.literal('')),
  fillerProductFormRange: z.string().optional().or(z.literal('')),
  process1: z.string().optional().or(z.literal('')),
  process1_3layers: z.boolean().optional(),
  process2: z.string().optional().or(z.literal('')),
  process2_3layers: z.boolean().optional(),
  depositedThicknessActual: z.string().optional().or(z.literal('')),
  depositedThicknessRange: z.string().optional().or(z.literal('')),
  process1Actual: z.string().optional().or(z.literal('')),
  process1Range: z.string().optional().or(z.literal('')),
  process2Actual: z.string().optional().or(z.literal('')),
  process2Range: z.string().optional().or(z.literal('')),
  positionActual: z.string().optional().or(z.literal('')),
  positionRange: z.string().optional().or(z.literal('')),
  verticalProgressionActual: z.string().optional().or(z.literal('')),
  verticalProgressionRange: z.string().optional().or(z.literal('')),
  fuelGasTypeActual: z.string().optional().or(z.literal('')),
  fuelGasTypeRange: z.string().optional().or(z.literal('')),
  inertGasBackingActual: z.string().optional().or(z.literal('')),
  inertGasBackingRange: z.string().optional().or(z.literal('')),
  transferModeActual: z.string().optional().or(z.literal('')),
  transferModeRange: z.string().optional().or(z.literal('')),
  gtawPolarityActual: z.string().optional().or(z.literal('')),
  gtawPolarityRange: z.string().optional().or(z.literal('')),
}).passthrough()

// ============================================
// SECTION 5: RESULTS
// ============================================
export const resultsSchema = z.object({
  visualExam: z.enum(['Accepted', 'Rejected'], {
    errorMap: () => ({ message: 'Visual examination result is required' })
  }),
  
  testTypes: z.array(z.string()).optional(),
  
  testResults: z.array(z.object({
    type: z.string().optional(),
    result: z.string().optional(),
  })).optional(),
  
  altVolumetricResult: z.string().optional().or(z.literal('')),
  altVolumetricType: z.enum(['RT', 'UT', '']).optional(),
  filletWeldTest: z.string().optional().or(z.literal('')),
  defectLength: z.string().optional().or(z.literal('')),
  filletWelds: z.enum(['Plate', 'Pipe', 'None', '']).optional(),
  macroExam: z.string().optional().or(z.literal('')),
  filletSize: z.string().optional().or(z.literal('')),
  concavityConvexity: z.string().optional().or(z.literal('')),
  otherTests: z.string().optional().or(z.literal('')),
  filmEvaluatedBy: z.string().optional().or(z.literal('')),
  evaluatorCompany: z.string().optional().or(z.literal('')),
  mechanicalTestsConductor: z.string().optional().or(z.literal('')),
  testCertNo: z.string().optional().or(z.literal('')),
  weldingSupervisedBy: z.string().optional().or(z.literal('')),
})

// ============================================
// SECTION 6: CONTINUITY & CERTIFICATION
// ============================================
export const continuitySchema = z.object({
  continuityRecords: z.array(z.object({
    id: z.string().optional(),
    date: z.string()
      .min(1, 'Date is required')
      .refine((date) => {
        const d = new Date(date)
        return !isNaN(d.getTime())
      }, 'Invalid date format'),
    
    verifier: z.string().optional().or(z.literal('')),
    company: z.string().optional().or(z.literal('')),
    reference: z.string().optional().or(z.literal('')),
    qcName: z.string().optional().or(z.literal('')),
    
    verifierSignatureUrl: z.string().url().optional().or(z.literal('')).nullable(),
    qcSignatureUrl: z.string().url().optional().or(z.literal('')).nullable(),
    verifierSignature: z.any().optional().nullable(),
    qcSignature: z.any().optional().nullable(),
  })).min(1, 'At least one continuity record is required'),
  
  codeYear: z.string()
    .min(1, 'Code year is required')
    .regex(/^[0-9]{4}$/, 'Code year must be a 4-digit year'),
  
  certifiedDate: z.string()
    .min(1, 'Certified date is required')
    .refine((date) => {
      const d = new Date(date)
      return !isNaN(d.getTime())
    }, 'Invalid date format'),
  
  certifiedName: z.string()
    .min(1, 'Certified by name is required')
    .max(100, 'Certified by name too long'),
  
  formNo: z.string()
    .min(1, 'Form number is required')
    .max(50, 'Form number too long'),
  
  certifiedCertNo: z.string().max(100).optional().or(z.literal('')),
  
  reviewedDate: z.string()
    .optional()
    .or(z.literal(''))
    .refine((date) => {
      if (!date || date === '') return true
      const d = new Date(date)
      return !isNaN(d.getTime())
    }, 'Invalid date format'),
  
  reviewedName: z.string().max(100).optional().or(z.literal('')),
  
  clientRepDate: z.string()
    .optional()
    .or(z.literal(''))
    .refine((date) => {
      if (!date || date === '') return true
      const d = new Date(date)
      return !isNaN(d.getTime())
    }, 'Invalid date format'),
  
  clientRepName: z.string().max(100).optional().or(z.literal('')),
  
  dateOfIssue: z.string()
    .optional()
    .or(z.literal(''))
    .refine((date) => {
      if (!date || date === '') return true
      const d = new Date(date)
      return !isNaN(d.getTime())
    }, 'Invalid date format'),
})

// ============================================
// COMPLETE FORM1 SCHEMA
// ============================================
export const form1Schema = z.object({
  basicInfo: basicInfoSchema,
  testDescription: testDescriptionSchema,
  testingVars1: testingVarsSchema,
  testingVars2: testingVarsSchema,
  results: resultsSchema,
  continuity: continuitySchema,
})

// ============================================
// VALIDATION HELPER FUNCTIONS
// ============================================

export const validateSection = (sectionName, data) => {
  try {
    if (!data) {
      return { 
        success: false, 
        errors: { _section: 'Section data is missing' } 
      }
    }

    switch (sectionName) {
      case 'basicInfo':
        basicInfoSchema.parse(data)
        return { success: true, errors: {} }
        
      case 'testDescription':
        testDescriptionSchema.parse(data)
        return { success: true, errors: {} }
        
      case 'testingVars1':
      case 'testingVars2':
        testingVarsSchema.parse(data)
        return { success: true, errors: {} }
        
      case 'results':
        resultsSchema.parse(data)
        return { success: true, errors: {} }
        
      case 'continuity':
        continuitySchema.parse(data)
        return { success: true, errors: {} }
        
      default:
        console.warn(`Unknown section: ${sectionName}`)
        return { success: true, errors: {} }
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = {}
      
      if (error.errors && Array.isArray(error.errors)) {
        error.errors.forEach((err) => {
          const path = err.path.join('.')
          errors[path] = err.message
        })
      }
      
      console.log(`Validation errors for ${sectionName}:`, errors)
      return { success: false, errors }
    }
    
    console.error('Validation error:', error)
    return { 
      success: false, 
      errors: { 
        _form: 'Validation failed. Please check your inputs.' 
      } 
    }
  }
}

export const validateCompleteForm = (formData) => {
  try {
    form1Schema.parse(formData)
    return { success: true, errors: {} }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = {}
      
      error.errors.forEach((err) => {
        const [section, ...rest] = err.path
        if (!errors[section]) {
          errors[section] = {}
        }
        const fieldPath = rest.join('.') || '_section'
        errors[section][fieldPath] = err.message
      })
      
      console.log('Form validation errors:', errors)
      return { success: false, errors }
    }
    
    return { 
      success: false, 
      errors: { 
        _form: error.message || 'Form validation failed' 
      } 
    }
  }
}

export const getErrorMessages = (errors) => {
  const messages = []
  
  Object.keys(errors).forEach(section => {
    const sectionErrors = errors[section]
    if (typeof sectionErrors === 'object') {
      Object.keys(sectionErrors).forEach(field => {
        messages.push(sectionErrors[field])
      })
    } else {
      messages.push(sectionErrors)
    }
  })
  
  return messages
}

export const hasSectionErrors = (errors, sectionName) => {
  return errors[sectionName] && Object.keys(errors[sectionName]).length > 0
}

export default {
  basicInfoSchema,
  testDescriptionSchema,
  testingVarsSchema,
  resultsSchema,
  continuitySchema,
  form1Schema,
  validateSection,
  validateCompleteForm,
  getErrorMessages,
  hasSectionErrors,
}