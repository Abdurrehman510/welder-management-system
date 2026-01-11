import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ChevronDown, ChevronUp, Upload, X, CheckCircle2, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

export default function Section1_BasicInfo({ 
  data, 
  onChange, 
  expanded, 
  onToggle, 
  errors, 
  sectionStatus,
  attemptedSubmit 
}) {
  const [photoPreview, setPhotoPreview] = useState(data.photoUrl || null)
  const [signaturePreview, setSignaturePreview] = useState(data.signatureUrl || null)

  const handleChange = (field, value) => {
    onChange({ [field]: value })
  }

  // File validation helper
  const validateFile = (file, type) => {
    const maxSize = type === 'photo' ? 5 * 1024 * 1024 : 2 * 1024 * 1024 // 5MB or 2MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    
    // Check file size
    if (file.size > maxSize) {
      const sizeMB = type === 'photo' ? 5 : 2
      toast.error('Invalid File Size', {
        description: `The selected ${type === 'photo' ? 'image' : 'signature'} exceeds the ${sizeMB}MB limit. Please compress the file and try again.`,
        duration: 5000,
      })
      return false
    }
    
    // Check file type
    if (!allowedTypes.includes(file.type)) {
      toast.error('Invalid File Type', {
        description: `Please select a valid image file (JPG, PNG, or WEBP).`,
        duration: 5000,
      })
      return false
    }
    
    return true
  }

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file
    if (!validateFile(file, 'photo')) {
      e.target.value = '' // Reset input
      return
    }

    // Show preview immediately (base64 - temporary)
    const reader = new FileReader()
    reader.onloadend = () => {
      setPhotoPreview(reader.result)
      // Store file object and preview (NOT uploaded to server yet)
      onChange({ 
        photo: file, 
        photoUrl: reader.result // Base64 preview
      })
      toast.success('Photo Selected', {
        description: 'Photo will be uploaded when you submit the form.',
        duration: 3000,
      })
    }
    reader.readAsDataURL(file)
  }

  const handleSignatureUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file
    if (!validateFile(file, 'signature')) {
      e.target.value = '' // Reset input
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setSignaturePreview(reader.result)
      onChange({ 
        signature: file, 
        signatureUrl: reader.result // Base64 preview
      })
      toast.success('Signature Selected', {
        description: 'Signature will be uploaded when you submit the form.',
        duration: 3000,
      })
    }
    reader.readAsDataURL(file)
  }

  const removePhoto = () => {
    setPhotoPreview(null)
    onChange({ photo: null, photoUrl: null })
    toast.info('Photo Removed', {
      description: 'Photo has been removed from the form.',
    })
  }

  const removeSignature = () => {
    setSignaturePreview(null)
    onChange({ signature: null, signatureUrl: null })
    toast.info('Signature Removed', {
      description: 'Signature has been removed from the form.',
    })
  }

  const { hasError, isComplete } = sectionStatus

  // Helper to show error border only after submit attempt
  const getInputClassName = (fieldName) => {
    const hasFieldError = errors[fieldName]
    if (attemptedSubmit && hasFieldError) {
      return 'border-red-400 focus:border-red-500 focus:ring-red-500'
    }
    return ''
  }

  return (
    <Card className={`transition-all shadow-md hover:shadow-lg ${
      hasError ? 'border-red-300 bg-red-50/30' : 
      isComplete ? 'border-green-300 bg-green-50/30' : 
      'border-gray-200'
    }`}>
      <CardHeader 
        className="cursor-pointer hover:bg-gray-50/50 transition-colors rounded-t-lg"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${
              hasError ? 'bg-red-100 ring-2 ring-red-300' : 
              isComplete ? 'bg-green-100 ring-2 ring-green-300' : 
              'bg-blue-100 ring-2 ring-blue-200'
            }`}>
              {hasError ? (
                <AlertCircle className="w-5 h-5 text-red-600" />
              ) : isComplete ? (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              ) : (
                <span className="text-blue-600 font-bold text-lg">1</span>
              )}
            </div>
            <div>
              <CardTitle className="text-xl font-bold">Section 1: Header & Basic Information</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Company details, welder information, and photo</p>
            </div>
          </div>
          {expanded ? 
            <ChevronUp className="w-6 h-6 text-gray-500" /> : 
            <ChevronDown className="w-6 h-6 text-gray-500" />
          }
        </div>
      </CardHeader>

      {expanded && (
        <CardContent className="space-y-6 pt-6">
          {/* Company Logo & Welder Photo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Logo (Static) */}
            <div>
              <Label className="font-semibold">Company Logo</Label>
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gradient-to-br from-gray-50 to-gray-100">
                <img 
                  src="/iss-logo.png" 
                  alt="ISS Logo" 
                  className="h-20 mx-auto object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
                <p className="text-center text-xs text-gray-600 mt-2 font-medium">Industrial Support Services Co.</p>
              </div>
            </div>

            {/* Welder Photo Upload */}
            <div>
              <Label htmlFor="photo" className="font-semibold">Welder Photo (Optional)</Label>
              {!photoPreview ? (
                <div className="mt-2">
                  <input
                    type="file"
                    id="photo"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="photo"
                    className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 transition-all bg-gray-50"
                  >
                    <Upload className="w-10 h-10 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-700 font-medium">
                      Click to upload photo
                    </span>
                    <span className="text-xs text-gray-500 mt-1">JPG, PNG, WEBP (Max 5MB)</span>
                  </label>
                </div>
              ) : (
                <div className="mt-2 relative border-2 border-gray-300 rounded-lg p-2 bg-white shadow-sm">
                  <img src={photoPreview} alt="Preview" className="w-full h-36 object-cover rounded" />
                  <button
                    onClick={removePhoto}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 shadow-lg transition-colors"
                    type="button"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Client/Contractor Information - NOW REQUIRED */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="clientContractor" className="font-semibold">
                Client/Contractor <span className="text-red-500">*</span>
              </Label>
              <Input
                id="clientContractor"
                value={data.clientContractor}
                onChange={(e) => handleChange('clientContractor', e.target.value)}
                placeholder="e.g., ALMUZAIN"
                className={getInputClassName('clientContractor')}
                required
              />
              {attemptedSubmit && errors.clientContractor && (
                <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.clientContractor}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="clientNameShort" className="font-semibold">
                Client Name (Short) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="clientNameShort"
                value={data.clientNameShort}
                onChange={(e) => handleChange('clientNameShort', e.target.value)}
                placeholder="e.g., MZN"
                className={getInputClassName('clientNameShort')}
                required
              />
              {attemptedSubmit && errors.clientNameShort && (
                <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.clientNameShort}
                </p>
              )}
            </div>
          </div>

          {/* Certificate Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="certificateNo" className="font-semibold">
                Certificate Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="certificateNo"
                value={data.certificateNo}
                onChange={(e) => handleChange('certificateNo', e.target.value)}
                placeholder="e.g., 25161-0756"
                className={getInputClassName('certificateNo')}
                required
              />
              {attemptedSubmit && errors.certificateNo && (
                <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.certificateNo}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="symbolStampNo" className="font-semibold">
                Symbol/Stamp Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="symbolStampNo"
                value={data.symbolStampNo}
                onChange={(e) => handleChange('symbolStampNo', e.target.value)}
                placeholder="e.g., MZN-383"
                className={getInputClassName('symbolStampNo')}
                required
              />
              {attemptedSubmit && errors.symbolStampNo && (
                <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.symbolStampNo}
                </p>
              )}
            </div>
          </div>

          {/* Welder Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="welderName" className="font-semibold">
                Welder Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="welderName"
                value={data.welderName}
                onChange={(e) => handleChange('welderName', e.target.value)}
                placeholder="e.g., ANANDHABABU THULASI"
                className={getInputClassName('welderName')}
                required
              />
              {attemptedSubmit && errors.welderName && (
                <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.welderName}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="welderNameShort" className="font-semibold">
                Welder Name (Short) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="welderNameShort"
                value={data.welderNameShort}
                onChange={(e) => handleChange('welderNameShort', e.target.value)}
                placeholder="e.g., A Thulasi"
                className={getInputClassName('welderNameShort')}
                required
              />
              {attemptedSubmit && errors.welderNameShort && (
                <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.welderNameShort}
                </p>
              )}
            </div>
          </div>

          {/* Iqama and Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="iqamaPassport" className="font-semibold">
                Iqama/Passport Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="iqamaPassport"
                value={data.iqamaPassport}
                onChange={(e) => handleChange('iqamaPassport', e.target.value)}
                placeholder="e.g., 2468077942"
                className={getInputClassName('iqamaPassport')}
                maxLength={20}
                required
              />
              {attemptedSubmit && errors.iqamaPassport && (
                <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.iqamaPassport}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="dateWelded" className="font-semibold">
                Date Welded <span className="text-red-500">*</span>
              </Label>
              <Input
                id="dateWelded"
                type="date"
                value={data.dateWelded}
                onChange={(e) => handleChange('dateWelded', e.target.value)}
                className={getInputClassName('dateWelded')}
                required
              />
              {attemptedSubmit && errors.dateWelded && (
                <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.dateWelded}
                </p>
              )}
            </div>
          </div>

          {/* Additional Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="designation" className="font-semibold">Designation</Label>
              <Input
                id="designation"
                value={data.designation}
                onChange={(e) => handleChange('designation', e.target.value)}
                placeholder="e.g., Senior Welder"
              />
            </div>
            <div>
              <Label htmlFor="dateOfBirth" className="font-semibold">
                Date of Birth <span className="text-red-500">*</span>
              </Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={data.dateOfBirth}
                onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                className={getInputClassName('dateOfBirth')}
                required
              />
              {attemptedSubmit && errors.dateOfBirth && (
                <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.dateOfBirth}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="dateOfJoining" className="font-semibold">Date of Joining</Label>
              <Input
                id="dateOfJoining"
                type="date"
                value={data.dateOfJoining}
                onChange={(e) => handleChange('dateOfJoining', e.target.value)}
              />
            </div>
          </div>

          {/* Signature Upload */}
          <div>
            <Label htmlFor="signature" className="font-semibold">Welder Signature (Optional)</Label>
            {!signaturePreview ? (
              <div className="mt-2">
                <input
                  type="file"
                  id="signature"
                  accept="image/*"
                  onChange={handleSignatureUpload}
                  className="hidden"
                />
                <label
                  htmlFor="signature"
                  className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 transition-all bg-gray-50"
                >
                  <Upload className="w-8 h-8 text-gray-400 mb-1" />
                  <span className="text-sm text-gray-700 font-medium">
                    Click to upload signature
                  </span>
                  <span className="text-xs text-gray-500 mt-1">PNG preferred (Max 2MB)</span>
                </label>
              </div>
            ) : (
              <div className="mt-2 relative border-2 border-gray-300 rounded-lg p-3 bg-white inline-block shadow-sm">
                <img src={signaturePreview} alt="Signature" className="h-20 object-contain" />
                <button
                  onClick={removeSignature}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 shadow-lg transition-colors"
                  type="button"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Required Fields Note */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 rounded-lg p-4 shadow-sm">
            <p className="text-sm text-blue-900 font-medium">
              <strong className="text-blue-700">📋 Required fields (*):</strong> Certificate Number, Symbol/Stamp Number, 
              Client/Contractor, Client Name (Short), Welder Name, Welder Name (Short), Iqama/Passport Number, Date Welded, and Date of Birth
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  )
}