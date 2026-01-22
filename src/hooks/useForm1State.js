import { useState, useCallback, useMemo, useEffect } from 'react'

/**
 * Custom hook to manage Form1 state and logic
 * ✅ WITH: Form persistence + 3 new signature fields
 */

const STORAGE_KEY = 'welder_form1_draft'

const getInitialFormData = () => {
  // Try to restore from localStorage
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        console.log('✅ Restored form data from localStorage')
        return parsed
      }
    } catch (error) {
      console.error('Failed to restore form data:', error)
    }
  }

  // Default initial state
  return {
    basicInfo: {
      photo: null,
      photoUrl: null,
      clientContractor: '',
      clientNameShort: '',
      certificateNo: '',
      symbolStampNo: '',
      welderName: '',
      welderNameShort: '',
      iqamaPassport: '',
      dateWelded: '',
      designation: '',
      dateOfBirth: '',
      dateOfJoining: '',
      signature: null,
      signatureUrl: null,
    },
    testDescription: {
      wpsIdentification: '',
      wpsType: 'test-coupon',
      baseMetalSpec: '',
      thicknessMm: '',
    },
    testingVars1: {
      weldingProcessesActual: '',
      weldingProcessesRange: '',
      weldingTypeActual: '',
      weldingTypeRange: '',
      platePipeType: 'plate',
      backingTypeActual: '',
      backingTypeRange: '',
      platePipeActual: '',
      platePipeRange: '',
      baseMetalPnoActual: '',
      baseMetalPnoRange: '',
      fillerMetalAdditionActual: '',
      fillerMetalAdditionRange: '',
      fillerSpecificationActual: '',
      fillerSpecificationRange: '',
      electrodeClassificationActual: '',
      electrodeClassificationRange: '',
      fillerMetalFnoActual: '',
      fillerMetalFnoRange: '',
    },
    testingVars2: {
      consumableInsertActual: '',
      consumableInsertRange: '',
      fillerProductFormActual: '',
      fillerProductFormRange: '',
      process1: '',
      process1_3layers: false,
      process2: '',
      process2_3layers: false,
      depositedThicknessActual: '',
      depositedThicknessRange: '',
      process1Actual: '',
      process1Range: '',
      process2Actual: '',
      process2Range: '',
      positionActual: '',
      positionRange: '',
      verticalProgressionActual: '',
      verticalProgressionRange: '',
      fuelGasTypeActual: '',
      fuelGasTypeRange: '',
      inertGasBackingActual: '',
      inertGasBackingRange: '',
      transferModeActual: '',
      transferModeRange: '',
      gtawPolarityActual: '',
      gtawPolarityRange: '',
    },
    results: {
      visualExam: '',
      testTypes: [],
      testResults: [
        { type: '', result: '' },
        { type: '', result: '' },
        { type: '', result: '' },
        { type: '', result: '' },
        { type: '', result: '' },
        { type: '', result: '' },
      ],
      altVolumetricResult: '',
      altVolumetricType: 'RT',
      filletWeldTest: '',
      defectLength: '',
      filletWelds: 'None',
      macroExam: '',
      filletSize: '',
      concavityConvexity: '',
      otherTests: '',
      filmEvaluatedBy: '',
      evaluatorCompany: '',
      mechanicalTestsConductor: '',
      testCertNo: '',
      weldingSupervisedBy: '',
    },
    continuity: {
      continuityRecords: [
        {
          id: crypto.randomUUID(),
          date: '',
          verifier: '',
          verifierSignature: null,
          verifierSignatureUrl: null,
          company: '',
          reference: '',
          qcName: '',
          qcSignature: null,
          qcSignatureUrl: null,
        },
      ],
      codeYear: new Date().getFullYear().toString(),
      certifiedDate: '',
      certifiedName: '',
      certifiedCertNo: '',
      // ✅ NEW: Certifier signature fields
      certifierSignature: null,
      certifierSignatureUrl: null,
      certifierSignaturePreview: null,
      reviewedDate: '',
      reviewedName: '',
      // ✅ NEW: Reviewer signature fields
      reviewerSignature: null,
      reviewerSignatureUrl: null,
      reviewerSignaturePreview: null,
      clientRepDate: '',
      clientRepName: '',
      // ✅ NEW: Client rep signature fields
      clientRepSignature: null,
      clientRepSignatureUrl: null,
      clientRepSignaturePreview: null,
      formNo: '',
      dateOfIssue: '',
    },
  }
}

export function useForm1State() {
  const [formData, setFormData] = useState(getInitialFormData)

  // Save to localStorage whenever formData changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        // Create a serializable version (exclude File objects)
        const serializableData = {
          ...formData,
          basicInfo: {
            ...formData.basicInfo,
            photo: null,
            signature: null,
          },
          continuity: {
            ...formData.continuity,
            continuityRecords: formData.continuity.continuityRecords.map(record => ({
              ...record,
              verifierSignature: null,
              qcSignature: null,
            })),
            // ✅ Exclude File objects for signatures
            certifierSignature: null,
            reviewerSignature: null,
            clientRepSignature: null,
          },
        }
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(serializableData))
      } catch (error) {
        console.error('Failed to save form data to localStorage:', error)
      }
    }
  }, [formData])

  // Update section data
  const updateSection = useCallback((section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      },
    }))
  }, [])

  // Reset form to initial state and clear localStorage
  const resetForm = useCallback(() => {
    // Revoke image URLs to prevent memory leaks
    if (formData.basicInfo.photoUrl && formData.basicInfo.photoUrl.startsWith('blob:')) {
      URL.revokeObjectURL(formData.basicInfo.photoUrl)
    }
    if (formData.basicInfo.signatureUrl && formData.basicInfo.signatureUrl.startsWith('blob:')) {
      URL.revokeObjectURL(formData.basicInfo.signatureUrl)
    }
    
    // ✅ Revoke signature URLs
    if (formData.continuity.certifierSignaturePreview?.startsWith('blob:')) {
      URL.revokeObjectURL(formData.continuity.certifierSignaturePreview)
    }
    if (formData.continuity.reviewerSignaturePreview?.startsWith('blob:')) {
      URL.revokeObjectURL(formData.continuity.reviewerSignaturePreview)
    }
    if (formData.continuity.clientRepSignaturePreview?.startsWith('blob:')) {
      URL.revokeObjectURL(formData.continuity.clientRepSignaturePreview)
    }
    
    formData.continuity.continuityRecords.forEach(record => {
      if (record.verifierSignatureUrl && record.verifierSignatureUrl.startsWith('blob:')) {
        URL.revokeObjectURL(record.verifierSignatureUrl)
      }
      if (record.qcSignatureUrl && record.qcSignatureUrl.startsWith('blob:')) {
        URL.revokeObjectURL(record.qcSignatureUrl)
      }
    })

    // Clear localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY)
      console.log('✅ Form data cleared from localStorage')
    }

    // Reset to fresh state
    const freshData = {
      basicInfo: {
        photo: null,
        photoUrl: null,
        clientContractor: '',
        clientNameShort: '',
        certificateNo: '',
        symbolStampNo: '',
        welderName: '',
        welderNameShort: '',
        iqamaPassport: '',
        dateWelded: '',
        designation: '',
        dateOfBirth: '',
        dateOfJoining: '',
        signature: null,
        signatureUrl: null,
      },
      testDescription: {
        wpsIdentification: '',
        wpsType: 'test-coupon',
        baseMetalSpec: '',
        thicknessMm: '',
      },
      testingVars1: {
        weldingProcessesActual: '',
        weldingProcessesRange: '',
        weldingTypeActual: '',
        weldingTypeRange: '',
        platePipeType: 'plate',
        backingTypeActual: '',
        backingTypeRange: '',
        platePipeActual: '',
        platePipeRange: '',
        baseMetalPnoActual: '',
        baseMetalPnoRange: '',
        fillerMetalAdditionActual: '',
        fillerMetalAdditionRange: '',
        fillerSpecificationActual: '',
        fillerSpecificationRange: '',
        electrodeClassificationActual: '',
        electrodeClassificationRange: '',
        fillerMetalFnoActual: '',
        fillerMetalFnoRange: '',
      },
      testingVars2: {
        consumableInsertActual: '',
        consumableInsertRange: '',
        fillerProductFormActual: '',
        fillerProductFormRange: '',
        process1: '',
        process1_3layers: false,
        process2: '',
        process2_3layers: false,
        depositedThicknessActual: '',
        depositedThicknessRange: '',
        process1Actual: '',
        process1Range: '',
        process2Actual: '',
        process2Range: '',
        positionActual: '',
        positionRange: '',
        verticalProgressionActual: '',
        verticalProgressionRange: '',
        fuelGasTypeActual: '',
        fuelGasTypeRange: '',
        inertGasBackingActual: '',
        inertGasBackingRange: '',
        transferModeActual: '',
        transferModeRange: '',
        gtawPolarityActual: '',
        gtawPolarityRange: '',
      },
      results: {
        visualExam: '',
        testTypes: [],
        testResults: [
          { type: '', result: '' },
          { type: '', result: '' },
          { type: '', result: '' },
          { type: '', result: '' },
          { type: '', result: '' },
          { type: '', result: '' },
        ],
        altVolumetricResult: '',
        altVolumetricType: 'RT',
        filletWeldTest: '',
        defectLength: '',
        filletWelds: 'None',
        macroExam: '',
        filletSize: '',
        concavityConvexity: '',
        otherTests: '',
        filmEvaluatedBy: '',
        evaluatorCompany: '',
        mechanicalTestsConductor: '',
        testCertNo: '',
        weldingSupervisedBy: '',
      },
      continuity: {
        continuityRecords: [
          {
            id: crypto.randomUUID(),
            date: '',
            verifier: '',
            verifierSignature: null,
            verifierSignatureUrl: null,
            company: '',
            reference: '',
            qcName: '',
            qcSignature: null,
            qcSignatureUrl: null,
          },
        ],
        codeYear: new Date().getFullYear().toString(),
        certifiedDate: '',
        certifiedName: '',
        certifiedCertNo: '',
        certifierSignature: null,
        certifierSignatureUrl: null,
        certifierSignaturePreview: null,
        reviewedDate: '',
        reviewedName: '',
        reviewerSignature: null,
        reviewerSignatureUrl: null,
        reviewerSignaturePreview: null,
        clientRepDate: '',
        clientRepName: '',
        clientRepSignature: null,
        clientRepSignatureUrl: null,
        clientRepSignaturePreview: null,
        formNo: '',
        dateOfIssue: '',
      },
    }

    setFormData(freshData)
  }, [formData])

  // Calculate dynamic progress (17 required fields)
  const progress = useMemo(() => {
    let completedFields = 0
    let totalRequiredFields = 0

    // Section 1: 9 required fields
    const section1Required = [
      'certificateNo',
      'welderName',
      'welderNameShort',
      'symbolStampNo',
      'clientContractor',
      'clientNameShort',
      'iqamaPassport',
      'dateWelded',
      'dateOfBirth',
    ]
    
    section1Required.forEach(field => {
      totalRequiredFields++
      const value = formData.basicInfo[field]
      if (value && value.toString().trim() !== '') {
        if (field === 'iqamaPassport' && value.length >= 10) {
          completedFields++
        } else if (field !== 'iqamaPassport') {
          completedFields++
        }
      }
    })

    // Section 2: 2 required fields
    const section2Required = ['wpsIdentification', 'baseMetalSpec']
    section2Required.forEach(field => {
      totalRequiredFields++
      const value = formData.testDescription[field]
      if (value && value.toString().trim() !== '') {
        completedFields++
      }
    })

    // Section 5: 1 required field
    totalRequiredFields++
    if (formData.results.visualExam && formData.results.visualExam.trim() !== '') {
      completedFields++
    }

    // Section 6: 5 required fields
    totalRequiredFields++ // continuity date
    if (formData.continuity.continuityRecords[0]?.date?.trim()) {
      completedFields++
    }

    const section6Required = ['codeYear', 'certifiedDate', 'certifiedName', 'formNo']
    section6Required.forEach(field => {
      totalRequiredFields++
      const value = formData.continuity[field]
      if (value && value.toString().trim() !== '') {
        completedFields++
      }
    })

    return Math.round((completedFields / totalRequiredFields) * 100)
  }, [formData])

  return {
    formData,
    updateSection,
    resetForm,
    progress,
  }
}