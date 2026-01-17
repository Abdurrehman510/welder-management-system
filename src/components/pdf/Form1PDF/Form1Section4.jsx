import { View, Text } from '@react-pdf/renderer'
import { form1Styles } from './form1Styles'

/**
 * Form1 Section 4: Testing Variables Part 2
 * ✅ PROFESSIONAL CHECKBOX IMPLEMENTATION
 */

export default function Form1Section4({ data }) {
  // Professional Checkbox Component
  const Checkbox = ({ checked, label }) => {
    const isChecked = checked === true
    
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={[
          form1Styles.checkboxBox,
          isChecked && form1Styles.checkboxBoxChecked
        ]}>
          {isChecked && <Text style={form1Styles.checkmark}>✓</Text>}
        </View>
        <Text style={[
          form1Styles.checkboxLabel,
          { marginLeft: 4, fontSize: 7.5 }
        ]}>
          {label}
        </Text>
      </View>
    )
  }

  // Strict boolean evaluation
  const isProcess1Checked = data.process1_3layers === true
  const isProcess2Checked = data.process2_3layers === true

  const variables = [
    {
      name: 'Consumable Insert',
      actual: data.consumableInsertActual,
      range: data.consumableInsertRange,
    },
    {
      name: 'Filler Metal Product Form',
      actual: data.fillerProductFormActual,
      range: data.fillerProductFormRange,
    },
    {
      name: 'Deposited Thickness',
      actual: data.depositedThicknessActual,
      range: data.depositedThicknessRange,
      hasSubRows: true,
    },
    {
      name: 'Position',
      actual: data.positionActual,
      range: data.positionRange,
    },
    {
      name: 'Vertical Progression',
      actual: data.verticalProgressionActual,
      range: data.verticalProgressionRange,
    },
    {
      name: 'Fuel Gas Type',
      actual: data.fuelGasTypeActual,
      range: data.fuelGasTypeRange,
    },
    {
      name: 'Inert Gas Backing',
      actual: data.inertGasBackingActual,
      range: data.inertGasBackingRange,
    },
    {
      name: 'Transfer Mode',
      actual: data.transferModeActual,
      range: data.transferModeRange,
    },
    {
      name: 'GTAW Current/Polarity',
      actual: data.gtawPolarityActual,
      range: data.gtawPolarityRange,
    },
  ]

  return (
    <View>
      {/* Section Header */}
      <View style={form1Styles.sectionHeader}>
        <Text style={form1Styles.sectionTitle}>
          Testing Variables - Part 2
        </Text>
        <Text style={form1Styles.sectionSubtitle}>
          Process Parameters & Position Details
        </Text>
      </View>

      {/* Table */}
      <View style={form1Styles.table}>
        {/* Table Header */}
        <View style={form1Styles.tableHeader}>
          <Text style={[form1Styles.tableHeaderText, form1Styles.tableCellVariable]}>
            Variables
          </Text>
          <Text style={[form1Styles.tableHeaderText, form1Styles.tableCellActual]}>
            Actual
          </Text>
          <Text style={[form1Styles.tableHeaderText, form1Styles.tableCellRange]}>
            Range
          </Text>
        </View>

        {/* Table Rows */}
        {variables.map((item, index) => (
          <View key={index}>
            {/* Main Row */}
            <View style={[
              form1Styles.tableRow, 
              index % 2 === 1 && form1Styles.tableRowAlt
            ]}>
              <Text style={[form1Styles.tableCell, form1Styles.tableCellVariable]}>
                {item.name}
              </Text>
              <Text style={[form1Styles.tableCell, form1Styles.tableCellActual]}>
                {item.actual || 'N/A'}
              </Text>
              <Text style={[form1Styles.tableCell, form1Styles.tableCellRange]}>
                {item.range || 'N/A'}
              </Text>
            </View>

            {/* Sub Rows - Process 1 & 2 with Checkboxes */}
            {item.hasSubRows && (
              <>
                {/* Process 1 */}
                <View style={[
                  form1Styles.tableRow,
                  { backgroundColor: '#F0F9FF', borderLeftWidth: 3, borderLeftColor: '#3B82F6', borderLeftStyle: 'solid' }
                ]}>
                  <View style={[form1Styles.tableCellVariable, { flexDirection: 'column', paddingLeft: 6 }]}>
                    <Text style={[form1Styles.tableCell, { fontWeight: 'bold', fontSize: 8, marginBottom: 2 }]}>
                      • Process 1: {data.process1 || 'N/A'}
                    </Text>
                    <Checkbox 
                      checked={isProcess1Checked}
                      label="3 layers minimum required"
                    />
                  </View>
                  <Text style={[form1Styles.tableCell, form1Styles.tableCellActual]}>
                    {data.process1Actual || 'N/A'}
                  </Text>
                  <Text style={[form1Styles.tableCell, form1Styles.tableCellRange]}>
                    {data.process1Range || 'N/A'}
                  </Text>
                </View>

                {/* Process 2 */}
                <View style={[
                  form1Styles.tableRow,
                  { backgroundColor: '#F0F9FF', borderLeftWidth: 3, borderLeftColor: '#3B82F6', borderLeftStyle: 'solid' }
                ]}>
                  <View style={[form1Styles.tableCellVariable, { flexDirection: 'column', paddingLeft: 6 }]}>
                    <Text style={[form1Styles.tableCell, { fontWeight: 'bold', fontSize: 8, marginBottom: 2 }]}>
                      • Process 2: {data.process2 || 'N/A'}
                    </Text>
                    <Checkbox 
                      checked={isProcess2Checked}
                      label="3 layers minimum required"
                    />
                  </View>
                  <Text style={[form1Styles.tableCell, form1Styles.tableCellActual]}>
                    {data.process2Actual || 'N/A'}
                  </Text>
                  <Text style={[form1Styles.tableCell, form1Styles.tableCellRange]}>
                    {data.process2Range || 'N/A'}
                  </Text>
                </View>
              </>
            )}
          </View>
        ))}
      </View>
    </View>
  )
}