import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function Section4_TestingVars2({ 
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
      label: '10. Consumable Insert', 
      actualField: 'consumableInsertActual', 
      rangeField: 'consumableInsertRange',
      actualPlaceholder: 'e.g., None',
      rangePlaceholder: 'e.g., Without Consumable Insert Only'
    },
    { 
      label: '11. Filler Metal Product Form', 
      actualField: 'fillerProductFormActual', 
      rangeField: 'fillerProductFormRange',
      actualPlaceholder: 'e.g., Solid',
      rangePlaceholder: 'e.g., Solid'
    },
    { 
      label: '12. Deposited Thickness', 
      actualField: 'depositedThicknessActual', 
      rangeField: 'depositedThicknessRange',
      actualPlaceholder: '',
      rangePlaceholder: ''
    },
    { 
      label: '13. Process 1', 
      actualField: 'process1Actual', 
      rangeField: 'process1Range',
      actualPlaceholder: 'e.g., 3.0 mm',
      rangePlaceholder: 'e.g., Up to 6.0 mm Thickness'
    },
    { 
      label: '14. Process 2', 
      actualField: 'process2Actual', 
      rangeField: 'process2Range',
      actualPlaceholder: 'e.g., 5.56 mm',
      rangePlaceholder: 'e.g., Up to 11.12 mm Thickness'
    },
    { 
      label: '15. Position', 
      actualField: 'positionActual', 
      rangeField: 'positionRange',
      actualPlaceholder: 'e.g., Groove-6G',
      rangePlaceholder: 'e.g., PLATE & PIPE OVER 24" OD (F, V) AND PIPE 2⅜" OD AND OVER TO ≤24" OD (F), FILLET'
    },
    { 
      label: '16. Vertical Progression', 
      actualField: 'verticalProgressionActual', 
      rangeField: 'verticalProgressionRange',
      actualPlaceholder: 'e.g., Uphill',
      rangePlaceholder: 'e.g., Uphill'
    },
    { 
      label: '17. Fuel Gas Type', 
      actualField: 'fuelGasTypeActual', 
      rangeField: 'fuelGasTypeRange',
      actualPlaceholder: 'e.g., N/A',
      rangePlaceholder: 'e.g., N/A'
    },
    { 
      label: '18. Inert Gas Backing', 
      actualField: 'inertGasBackingActual', 
      rangeField: 'inertGasBackingRange',
      actualPlaceholder: 'e.g., Without Inert Gas Backing',
      rangePlaceholder: 'e.g., With or Without Inert Gas Backing Only'
    },
    { 
      label: '19. Transfer Mode', 
      actualField: 'transferModeActual', 
      rangeField: 'transferModeRange',
      actualPlaceholder: 'e.g., N/A',
      rangePlaceholder: 'e.g., N/A'
    },
    { 
      label: '20. GTAW Current/Polarity', 
      actualField: 'gtawPolarityActual', 
      rangeField: 'gtawPolarityRange',
      actualPlaceholder: 'e.g., DCEN',
      rangePlaceholder: 'e.g., DCEN'
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
          <span className="text-blue-600 font-semibold">4</span>
        </div>
        <div>
          <CardTitle className="text-xl">Section 4: Testing Variables Part 2</CardTitle>
          <p className="text-sm text-gray-500 mt-1">Deposited thickness, position, and additional variables</p>
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
            {/* Process Information with Checkboxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg">
              <div>
                <Label htmlFor="process1">Process 1</Label>
                <Input
                  id="process1"
                  value={data.process1}
                  onChange={(e) => handleChange('process1', e.target.value)}
                  placeholder="e.g., GTAW"
                  className="mb-2"
                />
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="process1_3layers"
                    checked={data.process1_3layers}
                    onCheckedChange={(checked) => handleChange('process1_3layers', checked)}
                  />
                  <Label htmlFor="process1_3layers" className="font-normal cursor-pointer text-sm">
                    3 layers minimum
                  </Label>
                </div>
              </div>
              <div>
                <Label htmlFor="process2">Process 2</Label>
                <Input
                  id="process2"
                  value={data.process2}
                  onChange={(e) => handleChange('process2', e.target.value)}
                  placeholder="e.g., SMAW"
                  className="mb-2"
                />
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="process2_3layers"
                    checked={data.process2_3layers}
                    onCheckedChange={(checked) => handleChange('process2_3layers', checked)}
                  />
                  <Label htmlFor="process2_3layers" className="font-normal cursor-pointer text-sm">
                    3 layers minimum
                  </Label>
                </div>
              </div>
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
          {/* Process Information with Checkboxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg">
            <div>
              <Label htmlFor="process1">Process 1</Label>
              <Input
                id="process1"
                value={data.process1}
                onChange={(e) => handleChange('process1', e.target.value)}
                placeholder="e.g., GTAW"
                className="mb-2"
              />
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="process1_3layers"
                  checked={data.process1_3layers}
                  onCheckedChange={(checked) => handleChange('process1_3layers', checked)}
                />
                <Label htmlFor="process1_3layers" className="font-normal cursor-pointer text-sm">
                  3 layers minimum
                </Label>
              </div>
            </div>
            <div>
              <Label htmlFor="process2">Process 2</Label>
              <Input
                id="process2"
                value={data.process2}
                onChange={(e) => handleChange('process2', e.target.value)}
                placeholder="e.g., SMAW"
                className="mb-2"
              />
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="process2_3layers"
                  checked={data.process2_3layers}
                  onCheckedChange={(checked) => handleChange('process2_3layers', checked)}
                />
                <Label htmlFor="process2_3layers" className="font-normal cursor-pointer text-sm">
                  3 layers minimum
                </Label>
              </div>
            </div>
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
