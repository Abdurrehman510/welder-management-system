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
import { 
  Calendar as CalendarIcon, 
  Upload, 
  X, 
  Plus, 
  Loader2, 
  ImageIcon,
  CheckCircle,
  Building,
  User,
  FileSignature,
  ClipboardCheck,
  Sparkles
} from 'lucide-react'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'
import storageService from '../../services/storageService'

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
  const [activeTab, setActiveTab] = useState('basic')

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleVerifierSignatureChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const fileExtension = file.name.split('.').pop().toLowerCase()
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp']
    
    if (!allowedExtensions.includes(fileExtension)) {
      toast.error('Invalid File Type', {
        description: `Only JPG, JPEG, PNG, and WEBP files are allowed. Your file: ${file.name}`,
        duration: 5000,
      })
      e.target.value = ''
      return
    }

    const validation = storageService.validateFile(file, 'signature')
    if (!validation.valid) {
      toast.error('Invalid File', {
        description: validation.error,
        duration: 5000,
      })
      e.target.value = ''
      return
    }

    setVerifierSignature(file)
    
    const reader = new FileReader()
    reader.onloadend = () => {
      setVerifierSignaturePreview(reader.result)
    }
    reader.readAsDataURL(file)

    toast.success('Signature Selected', {
      description: `${file.name} (${storageService.formatFileSize(file.size)})`,
    })
  }

  const handleQcSignatureChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const fileExtension = file.name.split('.').pop().toLowerCase()
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp']
    
    if (!allowedExtensions.includes(fileExtension)) {
      toast.error('Invalid File Type', {
        description: `Only JPG, JPEG, PNG, and WEBP files are allowed. Your file: ${file.name}`,
        duration: 5000,
      })
      e.target.value = ''
      return
    }

    const validation = storageService.validateFile(file, 'signature')
    if (!validation.valid) {
      toast.error('Invalid File', {
        description: validation.error,
        duration: 5000,
      })
      e.target.value = ''
      return
    }

    setQcSignature(file)
    
    const reader = new FileReader()
    reader.onloadend = () => {
      setQcSignaturePreview(reader.result)
    }
    reader.readAsDataURL(file)

    toast.success('Signature Selected', {
      description: `${file.name} (${storageService.formatFileSize(file.size)})`,
    })
  }

  const removeVerifierSignature = () => {
    setVerifierSignature(null)
    setVerifierSignaturePreview(null)
    toast.info('Signature Removed')
  }

  const removeQcSignature = () => {
    setQcSignature(null)
    setQcSignaturePreview(null)
    toast.info('Signature Removed')
  }

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

  const handleSubmit = async () => {
    if (!validateForm()) return

    setSaving(true)
    setUploading(true)

    try {
      let verifierSignatureUrl = null
      let qcSignatureUrl = null

      if (verifierSignature) {
        toast.info('Uploading verifier signature...')
        const { url, error } = await storageService.uploadSignature(verifierSignature)
        if (error) {
          throw new Error(`Verifier signature upload failed: ${error}`)
        }
        verifierSignatureUrl = url
      }

      if (qcSignature) {
        toast.info('Uploading QC signature...')
        const { url, error } = await storageService.uploadSignature(qcSignature)
        if (error) {
          throw new Error(`QC signature upload failed: ${error}`)
        }
        qcSignatureUrl = url
      }

      setUploading(false)

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

      const { data, error } = await supabase
        .from('continuity_records')
        .insert([newContinuityRecord])
        .select()

      if (error) {
        console.error('❌ Insert error:', error)
        throw new Error(error.message)
      }

      toast.success('Success!', {
        description: 'New continuity record has been added successfully',
        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
        duration: 3000,
      })

      resetForm()
      
      if (onSuccess) {
        onSuccess()
      }

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
    setActiveTab('basic')
  }

  const handleClose = () => {
    if (saving) return
    resetForm()
    onOpenChange(false)
  }

  const isFormValid = formData.date && formData.verifier.trim() && formData.company.trim()

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-hidden p-0">
        <div className="grid md:grid-cols-3 h-full">
          {/* Left Sidebar - Progress/Info */}
          <div className="hidden md:block bg-gradient-to-b from-blue-50 to-indigo-50 border-r p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Sparkles className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Add Continuity Record</h3>
                <p className="text-sm text-gray-600">Complete all required fields</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-sm text-gray-700 uppercase tracking-wider">Progress</h4>
                <div className="space-y-3">
                  <div className={`flex items-center gap-3 p-3 rounded-lg transition-all ${activeTab === 'basic' ? 'bg-white shadow-sm border' : 'opacity-75'}`}>
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${activeTab === 'basic' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Basic Information</p>
                      <p className="text-xs text-gray-500">Required details</p>
                    </div>
                    {formData.date && formData.verifier && formData.company && (
                      <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
                    )}
                  </div>

                  <div className={`flex items-center gap-3 p-3 rounded-lg transition-all ${activeTab === 'signatures' ? 'bg-white shadow-sm border' : 'opacity-75'}`}>
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${activeTab === 'signatures' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                      <FileSignature className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Signatures</p>
                      <p className="text-xs text-gray-500">Optional uploads</p>
                    </div>
                    {(verifierSignature || qcSignature) && (
                      <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
                    )}
                  </div>

                  <div className={`flex items-center gap-3 p-3 rounded-lg transition-all ${activeTab === 'additional' ? 'bg-white shadow-sm border' : 'opacity-75'}`}>
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${activeTab === 'additional' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                      <ClipboardCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Additional Details</p>
                      <p className="text-xs text-gray-500">Optional information</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 border">
                <h4 className="font-semibold text-sm text-gray-700 mb-2">Quick Tips</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-blue-600">1</span>
                    </div>
                    <span>Previous records are preserved</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-blue-600">2</span>
                    </div>
                    <span>Upload clear signatures for verification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-blue-600">3</span>
                    </div>
                    <span>All marked fields (*) are required</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2">
            <DialogHeader className="p-6 pb-4 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <DialogTitle className="flex items-center gap-3 text-2xl">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                      <Plus className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Add Continuity Record
                      </span>
                      <p className="text-sm font-normal text-gray-500 mt-1">
                        Add new entry to welder's qualification record
                      </p>
                    </div>
                  </DialogTitle>
                </div>
                <div className="md:hidden">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleClose}
                    disabled={saving}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <DialogDescription className="mt-2 text-gray-600">
                Fill in the details below. All previously added records will remain unaffected.
              </DialogDescription>
            </DialogHeader>

            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {/* Mobile Tabs */}
              <div className="md:hidden mb-6">
                <div className="flex border-b">
                  <button
                    onClick={() => setActiveTab('basic')}
                    className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'basic' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}`}
                  >
                    Basic
                  </button>
                  <button
                    onClick={() => setActiveTab('signatures')}
                    className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'signatures' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}`}
                  >
                    Signatures
                  </button>
                  <button
                    onClick={() => setActiveTab('additional')}
                    className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'additional' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}`}
                  >
                    Additional
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className={`${activeTab !== 'basic' && 'hidden md:block'}`}>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Date */}
                    <div className="space-y-2">
                      <Label htmlFor="date" className="text-sm font-semibold flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4" />
                        Continuity Date <span className="text-red-500">*</span>
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={`w-full justify-start text-left font-normal h-11 ${
                              !formData.date ? 'text-muted-foreground' : 'text-gray-900'
                            } ${formData.date ? 'border-green-200 bg-green-50' : ''}`}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.date ? format(formData.date, 'PPP') : 'Select date'}
                            {formData.date && (
                              <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={formData.date}
                            onSelect={(date) => handleChange('date', date)}
                            initialFocus
                            className="rounded-md border"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Company */}
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-sm font-semibold flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        Company <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="company"
                        placeholder="Enter company name"
                        value={formData.company}
                        onChange={(e) => handleChange('company', e.target.value)}
                        disabled={saving}
                        className="h-11"
                      />
                    </div>
                  </div>

                  {/* Verifier Name */}
                  <div className="space-y-2">
                    <Label htmlFor="verifier" className="text-sm font-semibold flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Verifier Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="verifier"
                      placeholder="Enter verifier's full name"
                      value={formData.verifier}
                      onChange={(e) => handleChange('verifier', e.target.value)}
                      disabled={saving}
                      className="h-11"
                    />
                  </div>
                </div>
              </div>

              <div className={`mt-6 ${activeTab !== 'signatures' && 'hidden md:block'}`}>
                <div className="space-y-6">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <FileSignature className="h-5 w-5 text-blue-500" />
                    Digital Signatures
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Verifier Signature */}
                    <div className="space-y-3">
                      <Label htmlFor="verifierSignature" className="text-sm font-semibold">
                        Verifier Signature
                      </Label>
                      <div className="text-xs text-gray-500 mb-2">
                        <div className="flex items-center gap-1 mb-1">
                          <ImageIcon className="h-3 w-3" />
                          Formats: <span className="font-semibold">{storageService.getAllowedFormatsString()}</span>
                        </div>
                        <div className="text-gray-400">Optional but recommended</div>
                      </div>
                      {verifierSignaturePreview ? (
                        <div className="relative group">
                          <div className="border-2 border-dashed border-green-200 rounded-lg p-3 bg-green-50">
                            <img
                              src={verifierSignaturePreview}
                              alt="Verifier signature"
                              className="h-20 w-full object-contain rounded"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={removeVerifierSignature}
                            className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            disabled={saving}
                          >
                          </Button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="h-8 w-8 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500">Upload signature</p>
                            <p className="text-xs text-gray-400 mt-1">Click or drag & drop</p>
                          </div>
                          <input
                            id="verifierSignature"
                            type="file"
                            accept=".jpg,.jpeg,.png,.webp"
                            onChange={handleVerifierSignatureChange}
                            disabled={saving}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>

                    {/* QC Signature */}
                    <div className="space-y-3">
                      <Label htmlFor="qcSignature" className="text-sm font-semibold">
                        QC Signature
                      </Label>
                      <div className="text-xs text-gray-500 mb-2">
                        <div className="flex items-center gap-1 mb-1">
                          <ImageIcon className="h-3 w-3" />
                          Formats: <span className="font-semibold">{storageService.getAllowedFormatsString()}</span>
                        </div>
                        <div className="text-gray-400">Optional</div>
                      </div>
                      {qcSignaturePreview ? (
                        <div className="relative group">
                          <div className="border-2 border-dashed border-blue-200 rounded-lg p-3 bg-blue-50">
                            <img
                              src={qcSignaturePreview}
                              alt="QC signature"
                              className="h-20 w-full object-contain rounded"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={removeQcSignature}
                            className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            disabled={saving}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="h-8 w-8 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500">Upload signature</p>
                            <p className="text-xs text-gray-400 mt-1">Click or drag & drop</p>
                          </div>
                          <input
                            id="qcSignature"
                            type="file"
                            accept=".jpg,.jpeg,.png,.webp"
                            onChange={handleQcSignatureChange}
                            disabled={saving}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className={`mt-6 ${activeTab !== 'additional' && 'hidden md:block'}`}>
                <div className="space-y-6">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <ClipboardCheck className="h-5 w-5 text-blue-500" />
                    Additional Details
                  </h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reference" className="text-sm font-semibold">
                      Reference / Notes
                    </Label>
                    <Textarea
                      id="reference"
                      placeholder="Enter reference details, project name, weld number, or any additional notes..."
                      value={formData.reference}
                      onChange={(e) => handleChange('reference', e.target.value)}
                      disabled={saving}
                      rows={3}
                      className="resize-none"
                    />
                    <p className="text-xs text-gray-500">Max 500 characters</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="qcName" className="text-sm font-semibold">
                      QC Inspector Name
                    </Label>
                    <Input
                      id="qcName"
                      placeholder="Enter QC inspector's full name"
                      value={formData.qcName}
                      onChange={(e) => handleChange('qcName', e.target.value)}
                      disabled={saving}
                      className="h-11"
                    />
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="p-6 pt-4 border-t bg-gray-50">
              <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-4">
                <div className="text-sm text-gray-500">
                  <span className="font-medium">Status:</span>
                  <span className={`ml-2 ${isFormValid ? 'text-green-600' : 'text-amber-600'}`}>
                    {isFormValid ? 'Ready to submit' : 'Required fields missing'}
                  </span>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    disabled={saving}
                    className="flex-1 sm:flex-none"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={saving || !isFormValid}
                    className="flex-1 sm:flex-none gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {uploading ? 'Uploading Signatures...' : 'Creating Record...'}
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" />
                        Add Continuity Record
                        <CheckCircle className="h-4 w-4 ml-1" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}