import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { useForm1State } from '../../../hooks/useForm1State'
import Section1_BasicInfo from './Section1_BasicInfo'
import Section2_TestDescription from './Section2_TestDescription'
import Section3_TestingVars1 from './Section3_TestingVars1'
import Section4_TestingVars2 from './Section4_TestingVars2'
import Section5_Results from './Section5_Results'
import Section6_Continuity from './Section6_Continuity'
import FormActions from './FormActions'
import { Card } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { AlertCircle, FileWarning, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import welderService from '../../../services/welderService'
import { validateSection } from '../../../utils/validators'
import { toast } from 'sonner'

export default function Form1Container() {
  const navigate = useNavigate()
  const { signOut } = useAuth()
  
  // Use custom hook for form state management
  const { formData, updateSection, resetForm, progress } = useForm1State()

  // Refs for auto-scroll
  const sectionRefs = useRef({
    section1: null,
    section2: null,
    section3: null,
    section4: null,
    section5: null,
    section6: null,
  })

  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [attemptedSubmit, setAttemptedSubmit] = useState(false)

  const scrollToSection = (section) => {
    const sectionElement = sectionRefs.current[section]
    if (sectionElement) {
      sectionElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      })
      window.scrollBy({ top: -80, behavior: 'smooth' })
    }
  }

  // Validate all sections with detailed field-level errors
  const validateForm = () => {
    const sectionErrors = {}
    let hasErrors = false

    // Validate Section 1: Basic Info
    try {
      const validation = validateSection('basicInfo', formData.basicInfo)
      if (!validation.success) {
        sectionErrors.basicInfo = validation.errors
        hasErrors = true
      }
    } catch (error) {
      console.error('Validation error for basicInfo:', error)
      sectionErrors.basicInfo = { _error: 'Validation failed' }
      hasErrors = true
    }

    // Validate Section 2: Test Description
    try {
      const validation = validateSection('testDescription', formData.testDescription)
      if (!validation.success) {
        sectionErrors.testDescription = validation.errors
        hasErrors = true
      }
    } catch (error) {
      console.error('Validation error for testDescription:', error)
      sectionErrors.testDescription = { _error: 'Validation failed' }
      hasErrors = true
    }

    // Validate Section 5: Results
    try {
      const validation = validateSection('results', formData.results)
      if (!validation.success) {
        sectionErrors.results = validation.errors
        hasErrors = true
      }
    } catch (error) {
      console.error('Validation error for results:', error)
      sectionErrors.results = { _error: 'Validation failed' }
      hasErrors = true
    }

    // Validate Section 6: Continuity
    try {
      const validation = validateSection('continuity', { 
        continuityRecords: formData.continuity.continuityRecords || [],
        codeYear: formData.continuity.codeYear || '',
        certifiedDate: formData.continuity.certifiedDate || '',
        certifiedName: formData.continuity.certifiedName || '',
        formNo: formData.continuity.formNo || '',
      })
      if (!validation.success) {
        sectionErrors.continuity = validation.errors
        hasErrors = true
      }
    } catch (error) {
      console.error('Validation error for continuity:', error)
      sectionErrors.continuity = { _error: 'Validation failed' }
      hasErrors = true
    }

    setErrors(sectionErrors)
    return !hasErrors
  }

  // Handle submit with comprehensive error handling
  const handleSubmit = async (action) => {
    setAttemptedSubmit(true)
    setErrors({})

    // Validate form
    if (!validateForm()) {
      toast.error('Validation Failed', {
        description: 'Please correct the highlighted errors before submitting',
        duration: 5000,
      })
      
      // Auto-expand first section with errors and scroll to it
      const errorSectionMap = {
        basicInfo: 'section1',
        testDescription: 'section2',
        results: 'section5',
        continuity: 'section6',
      }
      
      const firstErrorSection = Object.keys(errors)[0]
      if (firstErrorSection) {
        const sectionKey = errorSectionMap[firstErrorSection]
        if (sectionKey) {
          scrollToSection(sectionKey)
        }
      }
      
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    setSubmitting(true)

    try {
      const { data, error } = await welderService.createWelder(formData)

      if (error) {
        // Check for duplicate certificate number
        if (error.includes('duplicate') || error.includes('unique') || error.includes('certificate_no')) {
          toast.error('Certificate Number Already Exists', {
            description: 'This certificate number is already in use. Please use a unique number.',
            duration: 6000,
          })
          
          // Focus on Section 1
          scrollToSection('section1')
          setErrors({
            basicInfo: {
              certificateNo: 'This certificate number already exists'
            }
          })
          return
        }
        
        // Check for network errors
        if (error.includes('fetch') || error.includes('network') || error.includes('Failed to fetch')) {
          toast.error('Network Error', {
            description: 'Unable to connect to the server. Please check your internet connection and try again.',
            duration: 6000,
          })
          return
        }
        
        throw new Error(error)
      }

      toast.success('Form Submitted Successfully', {
        description: 'Welder record has been created and saved to the database',
        duration: 4000,
      })

      // Reset form and clear localStorage
      setAttemptedSubmit(false)
      resetForm()
      setErrors({})

      // Handle different actions
      if (action === 'save-and-new') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else if (action === 'save-and-logout') {
        await signOut()
        navigate('/login')
      }
    } catch (error) {
      console.error('Submit error:', error)
      
      // Network error fallback
      if (!navigator.onLine) {
        toast.error('No Internet Connection', {
          description: 'Please check your connection and try again.',
          duration: 6000,
        })
      } else {
        toast.error('Submission Failed', {
          description: error.message || 'Unable to save the form. Please try again.',
          duration: 5000,
        })
      }
    } finally {
      setSubmitting(false)
    }
  }

  // Get section completion status - FIX for Section 6
  const getSectionStatus = (sectionName) => {
    const hasError = errors[sectionName] && Object.keys(errors[sectionName]).length > 0
    
    let isComplete = false
    
    if (sectionName === 'basicInfo') {
      const required = ['certificateNo', 'welderName', 'welderNameShort', 'symbolStampNo', 
                       'clientContractor', 'clientNameShort', 'iqamaPassport', 'dateWelded', 'dateOfBirth']
      isComplete = required.every(field => {
        const value = formData.basicInfo[field]
        if (field === 'iqamaPassport') {
          return value && value.length >= 10
        }
        return value && value.toString().trim() !== ''
      })
    } else if (sectionName === 'testDescription') {
      isComplete = formData.testDescription.wpsIdentification?.trim() && 
                   formData.testDescription.baseMetalSpec?.trim()
    } else if (sectionName === 'results') {
      isComplete = formData.results.visualExam?.trim()
    } else if (sectionName === 'continuity') {
      // FIX: Check if at least one continuity record is fully filled
      const hasValidContinuityRecord = formData.continuity.continuityRecords.some(record => 
        record.date?.trim()
      )
      
      const certificationComplete = 
        formData.continuity.codeYear?.trim() &&
        formData.continuity.certifiedDate?.trim() &&
        formData.continuity.certifiedName?.trim() &&
        formData.continuity.formNo?.trim()
      
      isComplete = hasValidContinuityRecord && certificationComplete
    }
    
    return { hasError, isComplete }
  }

  const errorCount = Object.keys(errors).length
  
  const getSectionDisplayName = (sectionKey) => {
    const names = {
      basicInfo: 'Basic Information',
      testDescription: 'Test Description',
      results: 'Results',
      continuity: 'Continuity & Certification'
    }
    return names[sectionKey] || sectionKey
  }

  // Count actual field errors in a section
  const countFieldErrors = (sectionKey) => {
    const sectionErrors = errors[sectionKey]
    if (!sectionErrors) return 0
    
    // Filter out non-field errors (like _error, _section)
    return Object.keys(sectionErrors).filter(key => 
      !key.startsWith('_') && 
      typeof sectionErrors[key] === 'string'
    ).length
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 py-8">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
              <FileWarning className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Form 1: WPQ Certificate
              </h1>
              <p className="text-gray-600 mt-1">
                Welder Performance Qualification Record
              </p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <Card className="p-6 mb-6 shadow-lg border-blue-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              {progress === 100 ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  Form Complete
                </>
              ) : (
                <>Form Completion</>
              )}
            </span>
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              {progress}%
            </span>
          </div>
          <Progress value={progress} className="h-3" />
          <p className="text-xs text-gray-600 mt-2 flex items-center gap-1">
            {progress === 100 ? (
              <>
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                All 17 required fields completed! Ready to submit.
              </>
            ) : (
              <>
                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                {17 - Math.round((progress / 100) * 17)} required fields remaining
              </>
            )}
          </p>
        </Card>

        {/* Professional Error Summary - FIX: Show actual field counts */}
        {errorCount > 0 && attemptedSubmit && (
          <Alert variant="destructive" className="mb-6 border-red-300 bg-red-50 shadow-lg">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle className="text-lg font-bold">
              {errorCount} {errorCount === 1 ? 'Section' : 'Sections'} Need{errorCount === 1 ? 's' : ''} Attention
            </AlertTitle>
            <AlertDescription className="mt-2">
              <p className="text-sm text-red-800 mb-3">
                Please review and correct the following sections before submitting:
              </p>
              <div className="space-y-2">
                {Object.keys(errors).map((section, idx) => {
                  const fieldErrorCount = countFieldErrors(section)
                  return (
                    <div key={section} className="flex items-start gap-2">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-600 text-white text-xs font-bold flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div className="flex-1">
                        <p className="font-semibold text-red-900">
                          {getSectionDisplayName(section)}
                        </p>
                        <p className="text-xs text-red-700 mt-0.5">
                          {fieldErrorCount > 0 
                            ? `${fieldErrorCount} ${fieldErrorCount === 1 ? 'field' : 'fields'} ${fieldErrorCount === 1 ? 'requires' : 'require'} correction`
                            : 'Please review this section'
                          }
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs h-7 border-red-300 hover:bg-red-100"
                        onClick={() => {
                          const sectionMap = {
                            basicInfo: 'section1',
                            testDescription: 'section2',
                            results: 'section5',
                            continuity: 'section6',
                          }
                          const sectionKey = sectionMap[section]
                          if (sectionKey) {
                            scrollToSection(sectionKey)
                          }
                        }}
                      >
                        Fix Now
                      </Button>
                    </div>
                  )
                })}
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Single Card Form Body */}
        <Card className="p-6 md:p-8 shadow-lg border-gray-200">
          <div className="space-y-10">
            <div ref={el => sectionRefs.current.section1 = el} className="space-y-6">
              <Section1_BasicInfo
                data={formData.basicInfo}
                onChange={(data) => updateSection('basicInfo', data)}
                errors={errors.basicInfo || {}}
                sectionStatus={getSectionStatus('basicInfo')}
                attemptedSubmit={attemptedSubmit}
                collapsible={false}
                embedded
              />
            </div>

            <div ref={el => sectionRefs.current.section2 = el} className="space-y-6 border-t pt-10">
              <Section2_TestDescription
                data={formData.testDescription}
                onChange={(data) => updateSection('testDescription', data)}
                errors={errors.testDescription || {}}
                sectionStatus={getSectionStatus('testDescription')}
                attemptedSubmit={attemptedSubmit}
                collapsible={false}
                embedded
              />
            </div>

            <div ref={el => sectionRefs.current.section3 = el} className="space-y-6 border-t pt-10">
              <Section3_TestingVars1
                data={formData.testingVars1}
                onChange={(data) => updateSection('testingVars1', data)}
                sectionStatus={{ hasError: false, isComplete: true }}
                collapsible={false}
                embedded
              />
            </div>

            <div ref={el => sectionRefs.current.section4 = el} className="space-y-6 border-t pt-10">
              <Section4_TestingVars2
                data={formData.testingVars2}
                onChange={(data) => updateSection('testingVars2', data)}
                sectionStatus={{ hasError: false, isComplete: true }}
                collapsible={false}
                embedded
              />
            </div>

            <div ref={el => sectionRefs.current.section5 = el} className="space-y-6 border-t pt-10">
              <Section5_Results
                data={formData.results}
                onChange={(data) => updateSection('results', data)}
                errors={errors.results || {}}
                sectionStatus={getSectionStatus('results')}
                attemptedSubmit={attemptedSubmit}
                collapsible={false}
                embedded
              />
            </div>

            <div ref={el => sectionRefs.current.section6 = el} className="space-y-6 border-t pt-10">
              <Section6_Continuity
                data={formData.continuity}
                onChange={(data) => updateSection('continuity', data)}
                errors={errors.continuity || {}}
                sectionStatus={getSectionStatus('continuity')}
                attemptedSubmit={attemptedSubmit}
                collapsible={false}
                embedded
              />
            </div>
          </div>
        </Card>

        {/* Form Actions */}
        <FormActions
          onSubmit={handleSubmit}
          onCancel={() => {
            if (confirm('Are you sure you want to discard all changes?')) {
              resetForm()
              navigate(-1)
            }
          }}
          submitting={submitting}
          disabled={submitting}
        />
      </div>
    </div>
  )
}
