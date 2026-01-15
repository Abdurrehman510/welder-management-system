import { View, Text } from '@react-pdf/renderer'
import { form1Styles } from './form1Styles'

/**
 * Form1 Section 5: Results
 * ✅ FIXED: Test types checkboxes now render correctly
 */

export default function Form1Section5({ data }) {
  console.log('🔍 Section5 - testTypes object:', data.testTypes)
  console.log('   - transverseBend:', data.testTypes?.transverseBend)
  console.log('   - sideBend:', data.testTypes?.sideBend)
  console.log('   - plateBendSpecimen:', data.testTypes?.plateBendSpecimen)
  console.log('   - pipeMacroFusion:', data.testTypes?.pipeMacroFusion)

  // Use symbols that render properly
  const checkedBox = '☑' // Checked box
  const uncheckedBox = '☐' // Unchecked box

  // ✅ Checkbox component with strict boolean check
  const Checkbox = ({ checked, label }) => {
    const isChecked = checked === true
    console.log(`   → ${label}: ${isChecked ? 'CHECKED ✓' : 'UNCHECKED ✗'}`)
    
    return (
      <View style={form1Styles.checkboxContainer}>
        <Text style={[form1Styles.checkboxLabel, { marginRight: 3, fontSize: 8.5, fontWeight: 'bold' }]}>
          {isChecked ? checkedBox : uncheckedBox}
        </Text>
        <Text style={form1Styles.checkboxLabel}>{label}</Text>
      </View>
    )
  }

  // Test types (transformed by formatTestTypes in pdfHelpers)
  const testTypes = data.testTypes || {}

  // Test results
  const testResults = data.testResults || []

  return (
    <View>
      {/* Section Header */}
      <View style={form1Styles.sectionHeader}>
        <Text style={form1Styles.sectionTitle}>Results</Text>
      </View>

      {/* Visual Examination */}
      <View style={[form1Styles.infoRow, { marginBottom: 2 }]}>
        <Text style={form1Styles.fieldLabel}>Visual Examination:</Text>
        <Text style={[form1Styles.fieldValue, form1Styles.bold]}>
          {data.visualExam || 'N/A'}
        </Text>
      </View>

      {/* Test Types Checkboxes */}
      <Text style={[form1Styles.fieldLabel, { marginBottom: 2, marginTop: 2 }]}>
        Test Types:
      </Text>
      <View style={form1Styles.resultsGrid}>
        <Checkbox 
          checked={testTypes.transverseBend} 
          label="Transverse Bend" 
        />
        <Checkbox 
          checked={testTypes.longitudinalBend} 
          label="Longitudinal Bend" 
        />
        <Checkbox 
          checked={testTypes.sideBend} 
          label="Side Bend" 
        />
        <Checkbox 
          checked={testTypes.pipeBendSpecimen} 
          label="Pipe Bend Specimen" 
        />
        <Checkbox 
          checked={testTypes.plateBendSpecimen} 
          label="Plate Bend Specimen" 
        />
        <Checkbox 
          checked={testTypes.pipeMacroFusion} 
          label="Pipe Macro Fusion Test" 
        />
        <Checkbox 
          checked={testTypes.plateMacroFusion} 
          label="Plate Macro Fusion Test" 
        />
      </View>

      <View style={form1Styles.smallSpacer} />

      {/* Test Results Table */}
      <Text style={[form1Styles.fieldLabel, { marginBottom: 2 }]}>
        Test Results:
      </Text>
      <View style={form1Styles.testResultsTable}>
        {/* Header */}
        <View style={[form1Styles.tableHeader, { paddingVertical: 3 }]}>
          <Text style={[form1Styles.tableHeaderText, { width: '50%' }]}>Type</Text>
          <Text style={[form1Styles.tableHeaderText, { width: '50%' }]}>Result</Text>
        </View>

        {/* Rows */}
        {testResults.map((result, index) => (
          <View key={index} style={form1Styles.testResultRow}>
            <Text style={form1Styles.testResultCell}>{result.type || 'None'}</Text>
            <Text style={form1Styles.testResultCell}>{result.result || 'None'}</Text>
          </View>
        ))}
      </View>

      <View style={form1Styles.smallSpacer} />

      {/* Alternative Volumetric Examination */}
      <View style={form1Styles.infoGrid}>
        <View style={form1Styles.infoRow}>
          <View style={form1Styles.infoFieldHalf}>
            <Text style={form1Styles.fieldLabel}>Alt. Volumetric Result:</Text>
            <Text style={form1Styles.fieldValue}>{data.altVolumetricResult || 'N/A'}</Text>
          </View>
          <View style={form1Styles.infoFieldHalf}>
            <Text style={form1Styles.fieldLabel}>Type:</Text>
            <Text style={form1Styles.fieldValue}>{data.altVolumetricType || 'N/A'}</Text>
          </View>
        </View>
      </View>

      {/* Fillet Weld Tests */}
      <View style={form1Styles.infoGrid}>
        <View style={form1Styles.infoRow}>
          <View style={form1Styles.infoFieldThird}>
            <Text style={form1Styles.fieldLabel}>Fillet Fracture Test:</Text>
            <Text style={form1Styles.fieldValue}>{data.filletWeldTest || 'N/A'}</Text>
          </View>
          <View style={form1Styles.infoFieldThird}>
            <Text style={form1Styles.fieldLabel}>Defect Length %:</Text>
            <Text style={form1Styles.fieldValue}>{data.defectLength || 'N/A'}</Text>
          </View>
          <View style={form1Styles.infoFieldThird}>
            <Text style={form1Styles.fieldLabel}>Fillet Welds:</Text>
            <Text style={form1Styles.fieldValue}>{data.filletWelds || 'N/A'}</Text>
          </View>
        </View>
      </View>

      {/* Additional Results */}
      <View style={form1Styles.infoGrid}>
        <View style={form1Styles.infoRow}>
          <View style={form1Styles.infoFieldThird}>
            <Text style={form1Styles.fieldLabel}>Macro Exam:</Text>
            <Text style={form1Styles.fieldValue}>{data.macroExam || 'N/A'}</Text>
          </View>
          <View style={form1Styles.infoFieldThird}>
            <Text style={form1Styles.fieldLabel}>Fillet Size:</Text>
            <Text style={form1Styles.fieldValue}>{data.filletSize || 'N/A'}</Text>
          </View>
          <View style={form1Styles.infoFieldThird}>
            <Text style={form1Styles.fieldLabel}>Concavity/Convexity:</Text>
            <Text style={form1Styles.fieldValue}>{data.concavityConvexity || 'N/A'}</Text>
          </View>
        </View>
      </View>

      {/* Other Tests */}
      {data.otherTests && data.otherTests !== 'N/A' && (
        <View style={form1Styles.infoRow}>
          <Text style={form1Styles.fieldLabel}>Other Tests:</Text>
          <Text style={form1Styles.fieldValue}>{data.otherTests}</Text>
        </View>
      )}

      <View style={form1Styles.divider} />

      {/* Evaluation Personnel */}
      <Text style={[form1Styles.fieldLabel, { marginBottom: 2 }]}>
        Evaluation Personnel:
      </Text>
      <View style={form1Styles.infoGrid}>
        <View style={form1Styles.infoRow}>
          <View style={form1Styles.infoFieldHalf}>
            <Text style={form1Styles.fieldLabel}>Film Evaluated By:</Text>
            <Text style={form1Styles.fieldValue}>{data.filmEvaluatedBy || 'N/A'}</Text>
          </View>
          <View style={form1Styles.infoFieldHalf}>
            <Text style={form1Styles.fieldLabel}>Company:</Text>
            <Text style={form1Styles.fieldValue}>{data.evaluatorCompany || 'N/A'}</Text>
          </View>
        </View>

        <View style={form1Styles.infoRow}>
          <View style={form1Styles.infoFieldHalf}>
            <Text style={form1Styles.fieldLabel}>Mechanical Tests By:</Text>
            <Text style={form1Styles.fieldValue}>{data.mechanicalTestsConductor || 'N/A'}</Text>
          </View>
          <View style={form1Styles.infoFieldHalf}>
            <Text style={form1Styles.fieldLabel}>Test Cert No:</Text>
            <Text style={form1Styles.fieldValue}>{data.testCertNo || 'N/A'}</Text>
          </View>
        </View>

        <View style={form1Styles.infoRow}>
          <View style={form1Styles.infoField}>
            <Text style={form1Styles.fieldLabel}>Welding Supervised By:</Text>
            <Text style={form1Styles.fieldValue}>{data.weldingSupervisedBy || 'N/A'}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}