import { View, Text } from '@react-pdf/renderer'
import { form1Styles } from './form1Styles'

/**
 * Form1 Section 3: Testing Variables Part 1
 * ✅ PROFESSIONAL RADIO BUTTON IMPLEMENTATION
 */

export default function Form1Section3({ data }) {
  // Professional Radio Button Component
  const RadioButton = ({ selected, label }) => (
    <View style={form1Styles.radioContainer}>
      <View style={[
        form1Styles.radioOuter,
        selected && form1Styles.radioOuterSelected
      ]}>
        {selected && <View style={form1Styles.radioInner} />}
      </View>
      <Text style={[
        form1Styles.radioLabel,
        selected && form1Styles.radioLabelSelected
      ]}>
        {label}
      </Text>
    </View>
  )

  // Determine which radio is selected
  const isPlate = data.platePipeType === 'plate'
  const isPipe = data.platePipeType === 'pipe'

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
      name: 'Backing Type',
      actual: data.backingTypeActual,
      range: data.backingTypeRange,
      hasRadio: true,
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
        <Text style={form1Styles.sectionSubtitle}>
          Welding Process & Material Specifications
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
            {/* Variable Name with Radio Buttons */}
            <View style={[form1Styles.tableCellVariable, { flexDirection: 'column' }]}>
              <Text style={[form1Styles.tableCell, { fontWeight: 'bold', marginBottom: 2 }]}>
                {item.name}
              </Text>
              
              {/* Radio Buttons for Backing Type */}
              {item.hasRadio && (
                <View style={{ flexDirection: 'row', marginTop: 3 }}>
                  <RadioButton selected={isPlate} label="Plate" />
                  <RadioButton selected={isPipe} label="Pipe" />
                </View>
              )}
            </View>

            {/* Actual */}
            <Text style={[form1Styles.tableCell, form1Styles.tableCellActual]}>
              {item.actual || 'N/A'}
            </Text>

            {/* Range */}
            <Text style={[form1Styles.tableCell, form1Styles.tableCellRange]}>
              {item.range || 'N/A'}
            </Text>
          </View>
        ))}
      </View>
    </View>
  )
}