import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp, CheckCircle2, AlertCircle, Plus } from 'lucide-react'
import ContinuityRow from './ContinuityRow'

const FORM_NO_PREFIX = 'ISS-ML-WPQ-'

export default function Section6_Continuity({ 
  data, 
  onChange, 
  expanded, 
  onToggle, 
  errors, 
  sectionStatus,
  attemptedSubmit 
}) {
  const handleChange = (field, value) => {
    onChange({ [field]: value })
  }

  // Handle Form No with auto-prefix
  const handleFormNoChange = (e) => {
    let value = e.target.value
    
    // Remove prefix if user tries to type it
    if (value.startsWith(FORM_NO_PREFIX)) {
      value = value.slice(FORM_NO_PREFIX.length)
    }
    
    // Store the full value with prefix
    const fullValue = value ? FORM_NO_PREFIX + value : ''
    handleChange('formNo', fullValue)
  }

  // Get display value (without prefix for input)
  const getFormNoDisplay = () => {
    if (!data.formNo) return ''
    if (data.formNo.startsWith(FORM_NO_PREFIX)) {
      return data.formNo.slice(FORM_NO_PREFIX.length)
    }
    return data.formNo
  }

  const handleRecordChange = (index, recordData) => {
    const newRecords = [...data.continuityRecords]
    newRecords[index] = { ...newRecords[index], ...recordData }
    handleChange('continuityRecords', newRecords)
  }

  const addRecord = () => {
    const newRecord = {
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
    }
    handleChange('continuityRecords', [...data.continuityRecords, newRecord])
  }

  const removeRecord = (index) => {
    if (data.continuityRecords.length > 1) {
      const newRecords = data.continuityRecords.filter((_, i) => i !== index)
      handleChange('continuityRecords', newRecords)
    }
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
                <span className="text-blue-600 font-bold text-lg">6</span>
              )}
            </div>
            <div>
              <CardTitle className="text-xl font-bold">Section 6: Continuity, Certification & Actions</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Continuity records, certification details, and signatures</p>
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
          {/* Welding Continuity Table */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <Label className="text-lg font-bold flex items-center gap-2">
                Welding Continuity Records
                <span className="text-red-500 text-sm">*</span>
              </Label>
              <Button 
                type="button" 
                onClick={addRecord}
                size="sm"
                className="gap-2 bg-blue-600 hover:bg-blue-700"
                disabled={data.continuityRecords.length >= 10}
              >
                <Plus className="w-4 h-4" />
                Add Record
              </Button>
            </div>

            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                    <tr>
                      <th className="px-3 py-3 text-left text-xs font-bold text-gray-700">
                        Date <span className="text-red-500">*</span>
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-bold text-gray-700">Verifier Name</th>
                      <th className="px-3 py-3 text-left text-xs font-bold text-gray-700">Signature</th>
                      <th className="px-3 py-3 text-left text-xs font-bold text-gray-700">Company</th>
                      <th className="px-3 py-3 text-left text-xs font-bold text-gray-700">Reference</th>
                      <th className="px-3 py-3 text-left text-xs font-bold text-gray-700">QC Name</th>
                      <th className="px-3 py-3 text-left text-xs font-bold text-gray-700">QC Signature</th>
                      <th className="px-3 py-3 text-center text-xs font-bold text-gray-700 w-20">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y bg-white">
                    {data.continuityRecords.map((record, index) => (
                      <ContinuityRow
                        key={record.id}
                        record={record}
                        onChange={(recordData) => handleRecordChange(index, recordData)}
                        onRemove={() => removeRecord(index)}
                        canRemove={data.continuityRecords.length > 1}
                        attemptedSubmit={attemptedSubmit}
                        errors={errors?.continuityRecords?.[index] || {}}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {attemptedSubmit && errors.continuityRecords && typeof errors.continuityRecords === 'string' && (
              <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.continuityRecords}
              </p>
            )}
          </div>

          {/* Certification Block */}
          <div className="border-t-2 pt-6 mt-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
              Certification
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="codeYear" className="font-semibold">
                  Code Year <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="codeYear"
                  value={data.codeYear}
                  onChange={(e) => handleChange('codeYear', e.target.value)}
                  placeholder="e.g., 2025"
                  className={getInputClassName('codeYear')}
                  maxLength={4}
                  required
                />
                {attemptedSubmit && errors.codeYear && (
                  <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.codeYear}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">Must be a 4-digit year</p>
              </div>
              <div>
                <Label htmlFor="formNo" className="font-semibold">
                  Form Number <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 
                    text-blue-600 
                    font-medium 
                    text-sm">
                    {FORM_NO_PREFIX}
                  </span>
                  <Input
                    id="formNo"
                    value={getFormNoDisplay()}
                    onChange={handleFormNoChange}
                    placeholder="001"
                    className={`pl-28 ${getInputClassName('formNo')}`}
                    required
                  />
                </div>
                {attemptedSubmit && errors.formNo && (
                  <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.formNo}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">Enter only the number (e.g., 001, 251)</p>
              </div>
            </div>
          </div>

          {/* Signature Table */}
          <div className="border-t-2 pt-6 mt-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
              Signatures
            </h3>
            
            {/* Witnessed & Certified By */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <Label htmlFor="certifiedDate" className="font-semibold">
                  Certified Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="certifiedDate"
                  type="date"
                  value={data.certifiedDate}
                  onChange={(e) => handleChange('certifiedDate', e.target.value)}
                  className={getInputClassName('certifiedDate')}
                  required
                />
                {attemptedSubmit && errors.certifiedDate && (
                  <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.certifiedDate}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="certifiedName" className="font-semibold">
                  Certified By (Name) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="certifiedName"
                  value={data.certifiedName}
                  onChange={(e) => handleChange('certifiedName', e.target.value)}
                  placeholder="Print name"
                  className={getInputClassName('certifiedName')}
                  required
                />
                {attemptedSubmit && errors.certifiedName && (
                  <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.certifiedName}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="certifiedCertNo" className="font-semibold">CSWIP/AWS Cert No.</Label>
                <Input
                  id="certifiedCertNo"
                  value={data.certifiedCertNo}
                  onChange={(e) => handleChange('certifiedCertNo', e.target.value)}
                  placeholder="Certificate number"
                />
              </div>
            </div>

            {/* Reviewed By */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label htmlFor="reviewedDate" className="font-semibold">Reviewed Date</Label>
                <Input
                  id="reviewedDate"
                  type="date"
                  value={data.reviewedDate}
                  onChange={(e) => handleChange('reviewedDate', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="reviewedName" className="font-semibold">Reviewed By (Name)</Label>
                <Input
                  id="reviewedName"
                  value={data.reviewedName}
                  onChange={(e) => handleChange('reviewedName', e.target.value)}
                  placeholder="Print name"
                />
              </div>
            </div>

            {/* Client/Contractor Representative */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label htmlFor="clientRepDate" className="font-semibold">Client Representative Date</Label>
                <Input
                  id="clientRepDate"
                  type="date"
                  value={data.clientRepDate}
                  onChange={(e) => handleChange('clientRepDate', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="clientRepName" className="font-semibold">Client Representative (Name)</Label>
                <Input
                  id="clientRepName"
                  value={data.clientRepName}
                  onChange={(e) => handleChange('clientRepName', e.target.value)}
                  placeholder="Print name"
                />
              </div>
            </div>

            {/* Date of Issue */}
            <div>
              <Label htmlFor="dateOfIssue" className="font-semibold">Date of Issue</Label>
              <Input
                id="dateOfIssue"
                type="date"
                value={data.dateOfIssue}
                onChange={(e) => handleChange('dateOfIssue', e.target.value)}
              />
            </div>
          </div>

          {/* Required Fields Note */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 rounded-lg p-4 shadow-sm">
            <p className="text-sm text-blue-900 font-medium">
              <strong className="text-blue-700">📋 Required fields (*):</strong> At least one continuity record with date, 
              Code Year, Certified Date, Certified By Name, and Form Number
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  )
}