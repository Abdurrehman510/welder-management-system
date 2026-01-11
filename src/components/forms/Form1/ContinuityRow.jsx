import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Trash2, Upload, X, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'
import storageService from '../../../services/storageService'

export default function ContinuityRow({ 
  record, 
  onChange, 
  onRemove, 
  canRemove, 
  attemptedSubmit, 
  errors 
}) {
  const [verifierSigPreview, setVerifierSigPreview] = useState(record.verifierSignatureUrl || null)
  const [qcSigPreview, setQcSigPreview] = useState(record.qcSignatureUrl || null)

  const handleChange = (field, value) => {
    onChange({ [field]: value })
  }

  // Validate and preview signature - NO UPLOAD
  const handleVerifierSigUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file
    const validation = storageService.validateFile(file, { maxSize: 2 * 1024 * 1024 })
    if (!validation.valid) {
      toast.error('Invalid Signature File', {
        description: validation.error,
        duration: 6000,
      })
      e.target.value = '' // Clear input
      return
    }

    // Show preview immediately
    const reader = new FileReader()
    reader.onloadend = () => {
      setVerifierSigPreview(reader.result)
    }
    reader.readAsDataURL(file)

    // Store file for later upload
    onChange({ verifierSignature: file, verifierSignatureUrl: null })
    
    toast.success('Signature Selected', {
      description: 'Signature will be uploaded when you save the form',
      duration: 3000,
    })
  }

  // Validate and preview QC signature - NO UPLOAD
  const handleQcSigUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file
    const validation = storageService.validateFile(file, { maxSize: 2 * 1024 * 1024 })
    if (!validation.valid) {
      toast.error('Invalid Signature File', {
        description: validation.error,
        duration: 6000,
      })
      e.target.value = '' // Clear input
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setQcSigPreview(reader.result)
    }
    reader.readAsDataURL(file)

    // Store file for later upload
    onChange({ qcSignature: file, qcSignatureUrl: null })
    
    toast.success('QC Signature Selected', {
      description: 'Signature will be uploaded when you save the form',
      duration: 3000,
    })
  }

  // Helper to show error border only after submit attempt
  const getInputClassName = (fieldName) => {
    const hasFieldError = errors && errors[fieldName]
    if (attemptedSubmit && hasFieldError) {
      return 'border-red-400 focus:border-red-500 focus:ring-red-500'
    }
    return ''
  }

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-3 py-3">
        <Input
          type="date"
          value={record.date}
          onChange={(e) => handleChange('date', e.target.value)}
          className={`text-sm min-w-[140px] ${getInputClassName('date')}`}
          required
        />
        {attemptedSubmit && errors?.date && (
          <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors.date}
          </p>
        )}
      </td>
      <td className="px-3 py-3">
        <Input
          value={record.verifier}
          onChange={(e) => handleChange('verifier', e.target.value)}
          placeholder="Name"
          className="text-sm min-w-[150px]"
        />
      </td>
      <td className="px-3 py-3">
        {!verifierSigPreview ? (
          <>
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleVerifierSigUpload}
              className="hidden"
              id={`verifier-sig-${record.id}`}
            />
            <label
              htmlFor={`verifier-sig-${record.id}`}
              className="flex items-center gap-1 text-xs text-blue-600 cursor-pointer hover:text-blue-700 whitespace-nowrap"
            >
              <Upload className="w-3 h-3" />
              Upload
            </label>
          </>
        ) : (
          <div className="relative inline-block">
            <img src={verifierSigPreview} alt="Sig" className="h-8 w-auto border rounded" />
            <button
              onClick={() => {
                setVerifierSigPreview(null)
                onChange({ verifierSignature: null, verifierSignatureUrl: null })
                toast.info('Signature Removed')
              }}
              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
              type="button"
            >
              <X className="w-2 h-2" />
            </button>
          </div>
        )}
      </td>
      <td className="px-3 py-3">
        <Input
          value={record.company}
          onChange={(e) => handleChange('company', e.target.value)}
          placeholder="Company"
          className="text-sm min-w-[150px]"
        />
      </td>
      <td className="px-3 py-3">
        <Input
          value={record.reference}
          onChange={(e) => handleChange('reference', e.target.value)}
          placeholder="Project/Weld/Line No"
          className="text-sm min-w-[150px]"
        />
      </td>
      <td className="px-3 py-3">
        <Input
          value={record.qcName}
          onChange={(e) => handleChange('qcName', e.target.value)}
          placeholder="QC Name"
          className="text-sm min-w-[150px]"
        />
      </td>
      <td className="px-3 py-3">
        {!qcSigPreview ? (
          <>
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleQcSigUpload}
              className="hidden"
              id={`qc-sig-${record.id}`}
            />
            <label
              htmlFor={`qc-sig-${record.id}`}
              className="flex items-center gap-1 text-xs text-blue-600 cursor-pointer hover:text-blue-700 whitespace-nowrap"
            >
              <Upload className="w-3 h-3" />
              Upload
            </label>
          </>
        ) : (
          <div className="relative inline-block">
            <img src={qcSigPreview} alt="Sig" className="h-8 w-auto border rounded" />
            <button
              onClick={() => {
                setQcSigPreview(null)
                onChange({ qcSignature: null, qcSignatureUrl: null })
                toast.info('QC Signature Removed')
              }}
              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
              type="button"
            >
              <X className="w-2 h-2" />
            </button>
          </div>
        )}
      </td>
      <td className="px-3 py-3 text-center">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onRemove}
          disabled={!canRemove}
          className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
          title={!canRemove ? "Cannot remove the last record" : "Remove this record"}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </td>
    </tr>
  )
}