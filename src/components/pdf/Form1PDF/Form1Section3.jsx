import { View, Text } from '@react-pdf/renderer'
import { form1Styles } from './form1Styles'

/**
 * Form1 Section 3: Testing Variables Part 1
 * ✅ FIXED: Radio button with proper symbol rendering
 */

export default function Form1Section3({ data }) {
  // Use symbols that render properly in PDF
  const selectedRadio = '●' // Filled circle
  const unselectedRadio = '○' // Empty circle
  
  // Determine which radio is selected
  const isPlate = data.platePipeType === 'plate'
  const isPipe = data.platePipeType === 'pipe'

  console.log('📻 Section3 - platePipeType:', data.platePipeType, '| isPlate:', isPlate, '| isPipe:', isPipe)

  const variables = [
    {
      name: 'Welding Processes',
      actual: data.weldingProcessesActual,
      range: data.weldingProcessesRange,
    },
    {
      name: 'Welding Type',
      actual: data.weldingTypeActual,
      range: data.weldingTypeRange,
    },
    {
      name: `Backing     ${isPlate ? selectedRadio : unselectedRadio} Plate     ${isPipe ? selectedRadio : unselectedRadio} Pipe`,
      actual: data.backingTypeActual,
      range: data.backingTypeRange,
    },
    {
      name: 'Plate/Pipe',
      actual: data.platePipeActual,
      range: data.platePipeRange,
    },
    {
      name: 'Base Metal P-No',
      actual: data.baseMetalPnoActual,
      range: data.baseMetalPnoRange,
    },
    {
      name: 'Filler Metal Deletion/Addition',
      actual: data.fillerMetalAdditionActual,
      range: data.fillerMetalAdditionRange,
    },
    {
      name: 'Filler Metal Specification',
      actual: data.fillerSpecificationActual,
      range: data.fillerSpecificationRange,
    },
    {
      name: 'Electrode Classification',
      actual: data.electrodeClassificationActual,
      range: data.electrodeClassificationRange,
    },
    {
      name: 'Filler Metal F-No (GTAW/SMAW)',
      actual: data.fillerMetalFnoActual,
      range: data.fillerMetalFnoRange,
    },
  ]

  return (
    <View>
      {/* Section Header */}
      <View style={form1Styles.sectionHeader}>
        <Text style={form1Styles.sectionTitle}>
          Testing Variables - Part 1
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
          <View 
            key={index} 
            style={[
              form1Styles.tableRow,
              index % 2 === 1 && form1Styles.tableRowAlt
            ]}
          >
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
        ))}
      </View>
    </View>
  )
}