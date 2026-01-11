import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ChevronDown, ChevronUp, CheckCircle2, AlertCircle } from 'lucide-react'

export default function Section2_TestDescription({ 
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
                <span className="text-blue-600 font-bold text-lg">2</span>
              )}
            </div>
            <div>
              <CardTitle className="text-xl font-bold">Section 2: Test Description</CardTitle>
              <p className="text-sm text-gray-600 mt-1">WPS identification and base metal specifications</p>
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
          {/* WPS Identification */}
          <div>
            <Label htmlFor="wpsIdentification" className="font-semibold">
              WPS Identification <span className="text-red-500">*</span>
            </Label>
            <Input
              id="wpsIdentification"
              value={data.wpsIdentification}
              onChange={(e) => handleChange('wpsIdentification', e.target.value)}
              placeholder="e.g., MZN/WPS-126/11 Rev.0"
              className={getInputClassName('wpsIdentification')}
              required
            />
            {attemptedSubmit && errors.wpsIdentification && (
              <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.wpsIdentification}
              </p>
            )}
          </div>

          {/* Test Type */}
          <div>
            <Label className="font-semibold">
              Test Type <span className="text-red-500">*</span>
            </Label>
            <RadioGroup 
              value={data.wpsType} 
              onValueChange={(value) => handleChange('wpsType', value)}
              className="flex gap-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="test-coupon" id="test-coupon" />
                <Label htmlFor="test-coupon" className="font-normal cursor-pointer">
                  Test Coupon
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="production-weld" id="production-weld" />
                <Label htmlFor="production-weld" className="font-normal cursor-pointer">
                  Production Weld
                </Label>
              </div>
            </RadioGroup>
            {attemptedSubmit && errors.wpsType && (
              <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.wpsType}
              </p>
            )}
          </div>

          {/* Base Metal Specification */}
          <div>
            <Label htmlFor="baseMetalSpec" className="font-semibold">
              Base Metal Specification (Grade to Grade) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="baseMetalSpec"
              value={data.baseMetalSpec}
              onChange={(e) => handleChange('baseMetalSpec', e.target.value)}
              placeholder="e.g., SA106 Gr.B to SA106 Gr.B"
              className={getInputClassName('baseMetalSpec')}
              required
            />
            {attemptedSubmit && errors.baseMetalSpec && (
              <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.baseMetalSpec}
              </p>
            )}
          </div>

          {/* Thickness */}
          <div>
            <Label htmlFor="thicknessMm" className="font-semibold">Thickness (mm)</Label>
            <Input
              id="thicknessMm"
              type="number"
              step="0.01"
              value={data.thicknessMm}
              onChange={(e) => handleChange('thicknessMm', e.target.value)}
              placeholder="e.g., 8.56"
            />
            <p className="text-xs text-gray-500 mt-1">Enter thickness in millimeters (e.g., 25.25)</p>
          </div>

          {/* Required Fields Note */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 rounded-lg p-4 shadow-sm">
            <p className="text-sm text-blue-900 font-medium">
              <strong className="text-blue-700">📋 Required fields (*):</strong> WPS Identification, Test Type, Base Metal Specification
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  )
}