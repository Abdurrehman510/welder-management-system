import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function Section3_TestingVars1({ 
  data, 
  onChange, 
  expanded = true, 
  onToggle,
  collapsible = true,
  embedded = false
}) {
  const handleChange = (field, value) => {
    onChange({ [field]: value })
  }

  const fields = [
    { 
      label: '1. Welding Processes', 
      actualField: 'weldingProcessesActual', 
      rangeField: 'weldingProcessesRange',
      actualPlaceholder: 'e.g., GTAW + SMAW',
      rangePlaceholder: 'e.g., GTAW, SMAW'
    },
    { 
      label: '2. Welding Type', 
      actualField: 'weldingTypeActual', 
      rangeField: 'weldingTypeRange',
      actualPlaceholder: 'e.g., Manual',
      rangePlaceholder: 'e.g., Manual'
    },
    { 
      label: '3. Backing', 
      actualField: 'backingTypeActual', 
      rangeField: 'backingTypeRange',
      actualPlaceholder: 'e.g., GTAW-Without & SMAW-With Backing',
      rangePlaceholder: 'e.g., GTAW With or Without & SMAW With Backing'
    },
    { 
      label: '4. Plate/Pipe', 
      actualField: 'platePipeActual', 
      rangeField: 'platePipeRange',
      actualPlaceholder: 'e.g., 4" NPS (114.3 mm) OD',
      rangePlaceholder: 'e.g., Plate & Pipe 2-7/8" (73mm) OD and Over'
    },
    { 
      label: '5. Base Metal P-No', 
      actualField: 'baseMetalPnoActual', 
      rangeField: 'baseMetalPnoRange',
      actualPlaceholder: 'e.g., P-No.1 To P-No.1',
      rangePlaceholder: 'e.g., P-No.1 thru P-No.15F, P-No.34 & P-No.41 thru P-No.49'
    },
    { 
      label: '6. Filler Metal Deletion/Addition', 
      actualField: 'fillerMetalAdditionActual', 
      rangeField: 'fillerMetalAdditionRange',
      actualPlaceholder: 'e.g., Addition',
      rangePlaceholder: 'e.g., Addition'
    },
    { 
      label: '7. Filler Specification', 
      actualField: 'fillerSpecificationActual', 
      rangeField: 'fillerSpecificationRange',
      actualPlaceholder: 'e.g., SFA 5.18 & SFA 5.1',
      rangePlaceholder: 'e.g., --'
    },
    { 
      label: '8. Electrode Classification', 
      actualField: 'electrodeClassificationActual', 
      rangeField: 'electrodeClassificationRange',
      actualPlaceholder: 'e.g., ER70S-2 & E7018',
      rangePlaceholder: 'e.g., --'
    },
    { 
      label: '9. Filler Metal F-No (GTAW/SMAW)', 
      actualField: 'fillerMetalFnoActual', 
      rangeField: 'fillerMetalFnoRange',
      actualPlaceholder: 'e.g., F No.6 (ER70S-2) & F No.4 (E7018)',
      rangePlaceholder: 'e.g., All F No:6 With or without backing & F No:1 thru F No.4 with backing only'
    },
  ]

  const showContent = collapsible ? expanded : true
  const headerClasses = collapsible
    ? 'cursor-pointer hover:bg-gray-50 transition-colors'
    : ''

  const headerContent = (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
          <span className="text-blue-600 font-semibold">3</span>
        </div>
        <div>
          <CardTitle className="text-xl">Section 3: Testing Variables Part 1</CardTitle>
          <p className="text-sm text-gray-500 mt-1">Welding processes, backing, and filler metal specifications</p>
        </div>
      </div>
      {collapsible && (expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />)}
    </div>
  )

  if (embedded) {
    return (
      <div className="space-y-6">
        {headerContent}
        {showContent && (
          <div className="space-y-6 pt-2">
            {/* Plate/Pipe Type Radio Selection */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <Label>Plate/Pipe Type</Label>
              <RadioGroup 
                value={data.platePipeType} 
                onValueChange={(value) => handleChange('platePipeType', value)}
                className="flex gap-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="plate" id="plate" />
                  <Label htmlFor="plate" className="font-normal cursor-pointer">
                    Plate
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pipe" id="pipe" />
                  <Label htmlFor="pipe" className="font-normal cursor-pointer">
                    Pipe
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Testing Variables Table */}
            <div className="border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-1/3">
                        Variables
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-1/3">
                        Actual
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-1/3">
                        Range
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {fields.map((field, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-700">
                          {field.label}
                        </td>
                        <td className="px-4 py-3">
                          <Input
                            value={data[field.actualField]}
                            onChange={(e) => handleChange(field.actualField, e.target.value)}
                            placeholder={field.actualPlaceholder}
                            className="text-sm"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <Input
                            value={data[field.rangeField]}
                            onChange={(e) => handleChange(field.rangeField, e.target.value)}
                            placeholder={field.rangePlaceholder}
                            className="text-sm"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Note */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> All fields in this section are optional. Fill in only the applicable testing variables for this qualification.
              </p>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <Card className={`${collapsible ? '' : 'shadow-sm'}`}>
      <CardHeader 
        className={headerClasses}
        onClick={collapsible ? onToggle : undefined}
      >
        {headerContent}
      </CardHeader>

      {showContent && (
        <CardContent className="space-y-6 pt-6">
          {/* Plate/Pipe Type Radio Selection */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <Label>Plate/Pipe Type</Label>
            <RadioGroup 
              value={data.platePipeType} 
              onValueChange={(value) => handleChange('platePipeType', value)}
              className="flex gap-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="plate" id="plate" />
                <Label htmlFor="plate" className="font-normal cursor-pointer">
                  Plate
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pipe" id="pipe" />
                <Label htmlFor="pipe" className="font-normal cursor-pointer">
                  Pipe
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Testing Variables Table */}
          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-1/3">
                      Variables
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-1/3">
                      Actual
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-1/3">
                      Range
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {fields.map((field, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-700">
                        {field.label}
                      </td>
                      <td className="px-4 py-3">
                        <Input
                          value={data[field.actualField]}
                          onChange={(e) => handleChange(field.actualField, e.target.value)}
                          placeholder={field.actualPlaceholder}
                          className="text-sm"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Input
                          value={data[field.rangeField]}
                          onChange={(e) => handleChange(field.rangeField, e.target.value)}
                          placeholder={field.rangePlaceholder}
                          className="text-sm"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Note */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> All fields in this section are optional. Fill in only the applicable testing variables for this qualification.
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
