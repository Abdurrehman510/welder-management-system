import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import { Calendar as CalendarIcon, Upload, X, Plus, Loader2, ImageIcon } from 'lucide-react'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'
import storageService from '../../services/storageService'

/**
 * ✅ PHASE 7: Add New Continuity Record Dialog - FINAL VERSION
 * 
 * FINAL MODIFICATIONS:
 * 1. ✅ Does NOT delete previous continuity records
 * 2. ✅ Accepts common image types only (JPG, JPEG, PNG, WEBP)
 * 3. ✅ Only inserts NEW record without touching existing ones
 * 
 * Features:
 * - Add new continuity record to existing welder
 * - File upload for verifier and QC signatures
 * - Date picker integration
 * - Form validation
 * - Real-time upload with progress
 * 
 * @production-ready
 */

export default function AddContinuityDialog({ open, onOpenChange, welderId, wpqRecordId, onSuccess }) {
  const [formData, setFormData] = useState({
    date: null,
    verifier: '',
    company: '',
    reference: '',
    qcName: '',
  })

  const [verifierSignature, setVerifierSignature] = useState(null)
  const [verifierSignaturePreview, setVerifierSignaturePreview] = useState(null)
  const [qcSignature, setQcSignature] = useState(null)
  const [qcSignaturePreview, setQcSignaturePreview] = useState(null)

  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)

  /**
   * Handle form field changes
   */
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  /**
   * Handle verifier signature upload
   */
  const handleVerifierSignatureChange = (e) => {
  const file = e.target.files?.[0]
  if (!file) return

  // ✅ Check extension first (before validation)
  const fileExtension = file.name.split('.').pop().toLowerCase()
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp']
  
  if (!allowedExtensions.includes(fileExtension)) {
    toast.error('Invalid File Type', {
      description: `Only JPG, JPEG, PNG, and WEBP files are allowed. Your file: ${file.name}`,
      duration: 5000,
    })
    e.target.value = '' // Clear the input
    return
  }

  // ✅ Validate with storageService
  const validation = storageService.validateFile(file, 'signature')
  if (!validation.valid) {
    toast.error('Invalid File', {
      description: validation.error,
      duration: 5000,
    })
    e.target.value = '' // Clear the input
    return
  }

  setVerifierSignature(file)
  
  // Create preview
  const reader = new FileReader()
  reader.onloadend = () => {
    setVerifierSignaturePreview(reader.result)
  }
  reader.readAsDataURL(file)

  toast.success('Signature Selected', {
    description: `${file.name} (${storageService.formatFileSize(file.size)})`,
  })
}

  /**
   * Handle QC signature upload
   */
 const handleQcSignatureChange = (e) => {
  const file = e.target.files?.[0]
  if (!file) return

  // ✅ Check extension first (before validation)
  const fileExtension = file.name.split('.').pop().toLowerCase()
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp']
  
  if (!allowedExtensions.includes(fileExtension)) {
    toast.error('Invalid File Type', {
      description: `Only JPG, JPEG, PNG, and WEBP files are allowed. Your file: ${file.name}`,
      duration: 5000,
    })
    e.target.value = '' // Clear the input
    return
  }

  // ✅ Validate with storageService
  const validation = storageService.validateFile(file, 'signature')
  if (!validation.valid) {
    toast.error('Invalid File', {
      description: validation.error,
      duration: 5000,
    })
    e.target.value = '' // Clear the input
    return
  }

  setQcSignature(file)
  
  // Create preview
  const reader = new FileReader()
  reader.onloadend = () => {
    setQcSignaturePreview(reader.result)
  }
  reader.readAsDataURL(file)

  toast.success('Signature Selected', {
    description: `${file.name} (${storageService.formatFileSize(file.size)})`,
  })
}

  /**
   * Remove verifier signature
   */
  const removeVerifierSignature = () => {
    setVerifierSignature(null)
    setVerifierSignaturePreview(null)
    toast.info('Signature Removed')
  }

  /**
   * Remove QC signature
   */
  const removeQcSignature = () => {
    setQcSignature(null)
    setQcSignaturePreview(null)
    toast.info('Signature Removed')
  }

  /**
   * Validate form before submission
   */
  const validateForm = () => {
    if (!formData.date) {
      toast.error('Date Required', {
        description: 'Please select a continuity date',
      })
      return false
    }

    if (!formData.verifier.trim()) {
      toast.error('Verifier Name Required', {
        description: 'Please enter the verifier name',
      })
      return false
    }

    if (!formData.company.trim()) {
      toast.error('Company Required', {
        description: 'Please enter the company name',
      })
      return false
    }

    return true
  }

  /**
   * ✅ FINAL: Only INSERT new record, do NOT delete existing ones
   */
  const handleSubmit = async () => {
    if (!validateForm()) return

    setSaving(true)
    setUploading(true)

    try {
      let verifierSignatureUrl = null
      let qcSignatureUrl = null

      // Upload verifier signature
      if (verifierSignature) {
        toast.info('Uploading verifier signature...')
        const { url, error } = await storageService.uploadSignature(verifierSignature)
        if (error) {
          throw new Error(`Verifier signature upload failed: ${error}`)
        }
        verifierSignatureUrl = url
      }

      // Upload QC signature
      if (qcSignature) {
        toast.info('Uploading QC signature...')
        const { url, error } = await storageService.uploadSignature(qcSignature)
        if (error) {
          throw new Error(`QC signature upload failed: ${error}`)
        }
        qcSignatureUrl = url
      }

      setUploading(false)

      // ✅ FINAL: Only INSERT new record (do NOT delete existing)
      const newContinuityRecord = {
        welder_id: welderId,
        wpq_record_id: wpqRecordId,
        continuity_date: format(formData.date, 'yyyy-MM-dd'),
        verifier_name: formData.verifier,
        verifier_signature_url: verifierSignatureUrl,
        company: formData.company,
        reference: formData.reference || null,
        qc_name: formData.qcName || null,
        qc_signature_url: qcSignatureUrl,
      }

      console.log('📝 Inserting new continuity record:', newContinuityRecord)

      const { data, error } = await supabase
        .from('continuity_records')
        .insert([newContinuityRecord])
        .select()

      if (error) {
        console.error('❌ Insert error:', error)
        throw new Error(error.message)
      }

      console.log('✅ Successfully inserted:', data)

      toast.success('Continuity Record Added', {
        description: 'New continuity entry has been created successfully',
      })

      // Reset form
      resetForm()
      
      // Call success callback
      if (onSuccess) {
        onSuccess()
      }

      // Close dialog
      onOpenChange(false)
    } catch (error) {
      console.error('❌ Add continuity record error:', error)
      toast.error('Failed to Add Record', {
        description: error.message || 'Unable to create continuity record',
      })
    } finally {
      setSaving(false)
      setUploading(false)
    }
  }

  /**
   * Reset form
   */
  const resetForm = () => {
    setFormData({
      date: null,
      verifier: '',
      company: '',
      reference: '',
      qcName: '',
    })
    setVerifierSignature(null)
    setVerifierSignaturePreview(null)
    setQcSignature(null)
    setQcSignaturePreview(null)
  }

  /**
   * Handle dialog close
   */
  const handleClose = () => {
    if (saving) return
    resetForm()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Plus className="h-6 w-6 text-green-600" />
            Add New Continuity Record
          </DialogTitle>
          <DialogDescription>
            Add a new continuity entry for this welder's qualification record.
            Previous records will be preserved.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="date" className="text-sm font-semibold">
              Continuity Date <span className="text-red-500">*</span>
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal ${
                    !formData.date && 'text-muted-foreground'
                  }`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.date ? format(formData.date, 'PPP') : 'Pick a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.date}
                  onSelect={(date) => handleChange('date', date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Verifier Name */}
          <div className="space-y-2">
            <Label htmlFor="verifier" className="text-sm font-semibold">
              Verifier Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="verifier"
              placeholder="Enter verifier name"
              value={formData.verifier}
              onChange={(e) => handleChange('verifier', e.target.value)}
              disabled={saving}
            />
          </div>

          {/* Verifier Signature */}
          <div className="space-y-2">
            <Label htmlFor="verifierSignature" className="text-sm font-semibold">
              Verifier Signature (Optional)
            </Label>
            <div className="text-xs text-gray-500 mb-2 flex items-center gap-1">
              <ImageIcon className="h-3 w-3" />
              Accepted formats: <span className="font-semibold">{storageService.getAllowedFormatsString()}</span>
            </div>
            {verifierSignaturePreview ? (
              <div className="relative">
                <img
                  src={verifierSignaturePreview}
                  alt="Verifier signature"
                  className="h-24 w-auto rounded border border-gray-300 bg-white p-2"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={removeVerifierSignature}
                  className="absolute -right-2 -top-2"
                  disabled={saving}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Input
                    id="verifierSignature"
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={handleVerifierSignatureChange}
                    disabled={saving}
                    className="cursor-pointer"
                    />
                <Upload className="h-5 w-5 text-gray-400" />
              </div>
            )}
          </div>

          {/* Company */}
          <div className="space-y-2">
            <Label htmlFor="company" className="text-sm font-semibold">
              Company <span className="text-red-500">*</span>
            </Label>
            <Input
              id="company"
              placeholder="Enter company name"
              value={formData.company}
              onChange={(e) => handleChange('company', e.target.value)}
              disabled={saving}
            />
          </div>

          {/* Reference */}
          <div className="space-y-2">
            <Label htmlFor="reference" className="text-sm font-semibold">
              Reference (Optional)
            </Label>
            <Textarea
              id="reference"
              placeholder="Enter reference details (e.g., Project name, weld number)"
              value={formData.reference}
              onChange={(e) => handleChange('reference', e.target.value)}
              disabled={saving}
              rows={3}
            />
          </div>

          {/* QC Name */}
          <div className="space-y-2">
            <Label htmlFor="qcName" className="text-sm font-semibold">
              QC Name (Optional)
            </Label>
            <Input
              id="qcName"
              placeholder="Enter QC inspector name"
              value={formData.qcName}
              onChange={(e) => handleChange('qcName', e.target.value)}
              disabled={saving}
            />
          </div>

          {/* QC Signature */}
          <div className="space-y-2">
            <Label htmlFor="qcSignature" className="text-sm font-semibold">
              QC Signature (Optional)
            </Label>
            <div className="text-xs text-gray-500 mb-2 flex items-center gap-1">
              <ImageIcon className="h-3 w-3" />
              Accepted formats: <span className="font-semibold">{storageService.getAllowedFormatsString()}</span>
            </div>
            {qcSignaturePreview ? (
              <div className="relative">
                <img
                  src={qcSignaturePreview}
                  alt="QC signature"
                  className="h-24 w-auto rounded border border-gray-300 bg-white p-2"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={removeQcSignature}
                  className="absolute -right-2 -top-2"
                  disabled={saving}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Input
                    id="qcSignature"
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={handleQcSignatureChange}
                    disabled={saving}
                    className="cursor-pointer"
                />
                <Upload className="h-5 w-5 text-gray-400" />
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={saving}
            className="gap-2 bg-gradient-to-r from-green-600 to-green-700"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {uploading ? 'Uploading...' : 'Saving...'}
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                Add Record
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}