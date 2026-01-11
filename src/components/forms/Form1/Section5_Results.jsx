import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ChevronDown, ChevronUp, CheckCircle2, AlertCircle } from 'lucide-react'

export default function Section5_Results({ 
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

  const handleTestTypeToggle = (testType) => {
    const currentTypes = data.testTypes || []
    const newTypes = currentTypes.includes(testType)
      ? currentTypes.filter(t => t !== testType)
      : [...currentTypes, testType]
    handleChange('testTypes', newTypes)
  }

  const handleTestResultChange = (index, field, value) => {
    const newResults = [...data.testResults]
    newResults[index] = { ...newResults[index], [field]: value }
    handleChange('testResults', newResults)
  }

  const testTypes = [
    { id: 'transverse', label: 'Transverse Bend' },
    { id: 'longitudinal', label: 'Longitudinal Bend' },
    { id: 'side', label: 'Side Bend' },
    { id: 'pipe', label: 'Pipe Bend Specimen' },
    { id: 'plate', label: 'Plate Bend Specimen' },
    { id: 'pipe-macro', label: 'Pipe Macro Fusion Test' },
    { id: 'plate-macro', label: 'Plate Macro Fusion Test' },
  ]

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
                <span className="text-blue-600 font-bold text-lg">5</span>
              )}
            </div>
            <div>
              <CardTitle className="text-xl font-bold">Section 5: Results</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Visual examination, test types, and evaluation personnel</p>
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
          {/* Visual Examination */}
          <div>
            <Label htmlFor="visualExam" className="font-semibold">
              Visual Examination (QW-302.4) <span className="text-red-500">*</span>
            </Label>
            <Select value={data.visualExam} onValueChange={(value) => handleChange('visualExam', value)}>
              <SelectTrigger className={getInputClassName('visualExam')}>
                <SelectValue placeholder="Select result" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Accepted">Accepted</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            {attemptedSubmit && errors.visualExam && (
              <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.visualExam}
              </p>
            )}
          </div>

          {/* Test Types */}
          <div>
            <Label className="mb-3 block font-semibold">Test Types</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {testTypes.map(({ id, label }) => (
                <div key={id} className="flex items-center space-x-2">
                  <Checkbox
                    id={id}
                    checked={data.testTypes?.includes(id) || false}
                    onCheckedChange={() => handleTestTypeToggle(id)}
                  />
                  <Label htmlFor={id} className="font-normal cursor-pointer">
                    {label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Test Results Table */}
          <div>
            <Label className="mb-3 block font-semibold">Test Results (Up to 6 types)</Label>
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 w-1/2">
                        Type
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 w-1/2">
                        Result
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y bg-white">
                    {data.testResults.map((result, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <Input
                            value={result.type || ''}
                            onChange={(e) => handleTestResultChange(index, 'type', e.target.value)}
                            placeholder={`Test Type ${index + 1}`}
                            className="text-sm"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <Input
                            value={result.result || ''}
                            onChange={(e) => handleTestResultChange(index, 'result', e.target.value)}
                            placeholder="Result"
                            className="text-sm"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Alternative Volumetric Examination */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="altVolumetricResult" className="font-semibold">Alternative Volumetric Examination</Label>
              <Input
                id="altVolumetricResult"
                value={data.altVolumetricResult}
                onChange={(e) => handleChange('altVolumetricResult', e.target.value)}
                placeholder="e.g., RT Report# 07421"
              />
            </div>
            <div>
              <Label className="font-semibold">Examination Type</Label>
              <RadioGroup 
                value={data.altVolumetricType} 
                onValueChange={(value) => handleChange('altVolumetricType', value)}
                className="flex gap-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="RT" id="rt" />
                  <Label htmlFor="rt" className="font-normal cursor-pointer">RT</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="UT" id="ut" />
                  <Label htmlFor="ut" className="font-normal cursor-pointer">UT</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Fillet Weld Tests */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="filletWeldTest" className="font-semibold">Fillet Weld Fracture Test</Label>
              <Input
                id="filletWeldTest"
                value={data.filletWeldTest}
                onChange={(e) => handleChange('filletWeldTest', e.target.value)}
                placeholder="e.g., N/A"
              />
            </div>
            <div>
              <Label htmlFor="defectLength" className="font-semibold">Defect Length %</Label>
              <Input
                id="defectLength"
                value={data.defectLength}
                onChange={(e) => handleChange('defectLength', e.target.value)}
                placeholder="Enter percentage"
              />
            </div>
            <div>
              <Label htmlFor="filletWelds" className="font-semibold">Fillet Welds</Label>
              <Select value={data.filletWelds} onValueChange={(value) => handleChange('filletWelds', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Plate">Plate</SelectItem>
                  <SelectItem value="Pipe">Pipe</SelectItem>
                  <SelectItem value="None">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Macro Examination */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="macroExam" className="font-semibold">Macro Examination</Label>
              <Input
                id="macroExam"
                value={data.macroExam}
                onChange={(e) => handleChange('macroExam', e.target.value)}
                placeholder="e.g., N/A"
              />
            </div>
            <div>
              <Label htmlFor="filletSize" className="font-semibold">Fillet Size</Label>
              <Input
                id="filletSize"
                value={data.filletSize}
                onChange={(e) => handleChange('filletSize', e.target.value)}
                placeholder="Size in mm"
              />
            </div>
            <div>
              <Label htmlFor="concavityConvexity" className="font-semibold">Concavity/Convexity (in)</Label>
              <Input
                id="concavityConvexity"
                value={data.concavityConvexity}
                onChange={(e) => handleChange('concavityConvexity', e.target.value)}
                placeholder="Measurement"
              />
            </div>
          </div>

          {/* Other Tests */}
          <div>
            <Label htmlFor="otherTests" className="font-semibold">Other Tests</Label>
            <Textarea
              id="otherTests"
              value={data.otherTests}
              onChange={(e) => handleChange('otherTests', e.target.value)}
              placeholder="Describe any additional tests..."
              rows={3}
            />
          </div>

          {/* Evaluation Personnel */}
          <div className="border-t-2 pt-6 mt-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
              Evaluation Personnel
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="filmEvaluatedBy" className="font-semibold">Film/Specimen Evaluated By</Label>
                <Input
                  id="filmEvaluatedBy"
                  value={data.filmEvaluatedBy}
                  onChange={(e) => handleChange('filmEvaluatedBy', e.target.value)}
                  placeholder="Evaluator name"
                />
              </div>
              <div>
                <Label htmlFor="evaluatorCompany" className="font-semibold">Company</Label>
                <Input
                  id="evaluatorCompany"
                  value={data.evaluatorCompany}
                  onChange={(e) => handleChange('evaluatorCompany', e.target.value)}
                  placeholder="Company name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <Label htmlFor="mechanicalTestsConductor" className="font-semibold">Mechanical Tests Conducted By</Label>
                <Input
                  id="mechanicalTestsConductor"
                  value={data.mechanicalTestsConductor}
                  onChange={(e) => handleChange('mechanicalTestsConductor', e.target.value)}
                  placeholder="Conductor name"
                />
              </div>
              <div>
                <Label htmlFor="testCertNo" className="font-semibold">Test Certificate Number</Label>
                <Input
                  id="testCertNo"
                  value={data.testCertNo}
                  onChange={(e) => handleChange('testCertNo', e.target.value)}
                  placeholder="Certificate number and date"
                />
              </div>
            </div>

            <div className="mt-4">
              <Label htmlFor="weldingSupervisedBy" className="font-semibold">Welding Supervised By</Label>
              <Input
                id="weldingSupervisedBy"
                value={data.weldingSupervisedBy}
                onChange={(e) => handleChange('weldingSupervisedBy', e.target.value)}
                placeholder="Supervisor name"
              />
            </div>
          </div>

          {/* Required Fields Note */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 rounded-lg p-4 shadow-sm">
            <p className="text-sm text-blue-900 font-medium">
              <strong className="text-blue-700">📋 Required fields (*):</strong> Visual Examination result
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  )
}