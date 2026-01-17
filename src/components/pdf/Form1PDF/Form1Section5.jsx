import { View, Text } from '@react-pdf/renderer'
import { form1Styles } from './form1Styles'

/**
 * Form1 Section 5: Results
 * ✅ PROFESSIONAL CHECKBOX & STATUS BADGE IMPLEMENTATION
 */

export default function Form1Section5({ data }) {
  // Professional Checkbox Component
  const Checkbox = ({ checked, label }) => {
    const isChecked = checked === true
    
    return (
      <View style={form1Styles.checkboxContainer}>
        <View style={[
          form1Styles.checkboxBox,
          isChecked && form1Styles.checkboxBoxChecked
        ]}>
          {isChecked && <Text style={form1Styles.checkmark}>✓</Text>}
        </View>
        <Text style={form1Styles.checkboxLabel}>{label}</Text>
      </View>
    )
  }

  // Test types (transformed by formatTestTypes in pdfHelpers)
  const testTypes = data.testTypes || {}

  // Test results
  const testResults = data.testResults || []

  // Determine overall test status
  const allTestsPassed = testResults.every(result => 
    result.result?.toLowerCase().includes('pass') || 
    result.result?.toLowerCase().includes('accept')
  )

  return (
    <View>
      {/* Section Header */}
      <View style={form1Styles.sectionHeader}>
        <Text style={form1Styles.sectionTitle}>Test Results & Evaluation</Text>
        <Text style={form1Styles.sectionSubtitle}>
          Mechanical Tests & Visual Examination
        </Text>
      </View>

      {/* Visual Examination */}
      <View style={{
        marginBottom: 4,
        padding: 4,
        backgroundColor: '#F8FAFC',
        borderRadius: 3,
        borderLeftWidth: 3,
        borderLeftColor: '#3B82F6',
        borderLeftStyle: 'solid',
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[form1Styles.fieldLabel, { color: '#1E3A8A', fontSize: 8, marginRight: 4 }]}>
              Visual Examination:
            </Text>
            <Text style={{ fontSize: 8.5, fontWeight: 'bold', color: '#111827' }}>
              {data.visualExam || 'PENDING'}
            </Text>
          </View>
          <Text style={{ fontSize: 7, color: '#6B7280', fontStyle: 'italic' }}>
            Test Date: {data.dateWelded || 'N/A'}
          </Text>
        </View>
      </View>

      {/* Test Types Checkboxes */}
      <View style={{ marginTop: 3, marginBottom: 3 }}>
        <Text style={[form1Styles.sectionSubtitle, { marginBottom: 3, fontSize: 8.5 }]}>
          Test Types Performed:
        </Text>
        <View style={form1Styles.resultsGrid}>
          <Checkbox 
            checked={testTypes.transverseBend} 
            label="Transverse Bend Test" 
          />
          <Checkbox 
            checked={testTypes.longitudinalBend} 
            label="Longitudinal Bend Test" 
          />
          <Checkbox 
            checked={testTypes.sideBend} 
            label="Side Bend Test" 
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
      </View>

      {/* Test Results Table */}
      <Text style={[form1Styles.sectionSubtitle, { marginTop: 4, marginBottom: 2, fontSize: 8.5 }]}>
        Detailed Test Results:
      </Text>
      <View style={form1Styles.testResultsTable}>
        {/* Header */}
        <View style={form1Styles.tableHeader}>
          <Text style={[form1Styles.tableHeaderText, { width: '55%' }]}>Test Type</Text>
          <Text style={[form1Styles.tableHeaderText, { width: '45%' }]}>Result</Text>
        </View>

        {/* Rows */}
        {testResults.map((result, index) => (
          <View key={index} style={[
            form1Styles.testResultRow,
            index % 2 === 1 && form1Styles.tableRowAlt
          ]}>
            <Text style={[form1Styles.testResultCell, { width: '55%', fontWeight: 'bold', fontSize: 8 }]}>
              {result.type || 'Not Specified'}
            </Text>
            <Text style={[form1Styles.testResultCell, { width: '45%', fontSize: 8 }]}>
              {result.result || 'Pending'}
            </Text>
          </View>
        ))}
      </View>

      {/* Additional Results Section */}
      <View style={form1Styles.infoBox}>
        <Text style={[form1Styles.sectionSubtitle, { marginBottom: 6, fontSize: 9 }]}>
          Additional Test Results
        </Text>
        
        <View style={form1Styles.infoGrid}>
          <View style={form1Styles.infoRow}>
            <View style={form1Styles.infoFieldHalf}>
              <Text style={form1Styles.fieldLabel}>Alt. Volumetric Result:</Text>
              <View style={form1Styles.valueBox}>
                <Text style={form1Styles.fieldValue}>{data.altVolumetricResult || 'N/A'}</Text>
              </View>
            </View>
            <View style={form1Styles.infoFieldHalf}>
              <Text style={form1Styles.fieldLabel}>Type:</Text>
              <View style={form1Styles.valueBox}>
                <Text style={form1Styles.fieldValue}>{data.altVolumetricType || 'N/A'}</Text>
              </View>
            </View>
          </View>

          <View style={form1Styles.infoRow}>
            <View style={form1Styles.infoFieldThird}>
              <Text style={form1Styles.fieldLabel}>Fillet Fracture Test:</Text>
              <View style={form1Styles.valueBox}>
                <Text style={form1Styles.fieldValue}>{data.filletWeldTest || 'N/A'}</Text>
              </View>
            </View>
            <View style={form1Styles.infoFieldThird}>
              <Text style={form1Styles.fieldLabel}>Defect Length %:</Text>
              <View style={form1Styles.valueBox}>
                <Text style={form1Styles.fieldValue}>{data.defectLength || 'N/A'}</Text>
              </View>
            </View>
            <View style={form1Styles.infoFieldThird}>
              <Text style={form1Styles.fieldLabel}>Fillet Welds:</Text>
              <View style={form1Styles.valueBox}>
                <Text style={form1Styles.fieldValue}>{data.filletWelds || 'N/A'}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Evaluation Personnel */}
      <View style={{ marginTop: 4 }}>
        <Text style={[form1Styles.sectionSubtitle, { marginBottom: 4, fontSize: 8.5 }]}>
          Evaluation Personnel
        </Text>
        
        <View style={form1Styles.infoGrid}>
          <View style={form1Styles.infoRow}>
            <View style={form1Styles.infoFieldHalf}>
              <Text style={form1Styles.fieldLabel}>Film Evaluated By:</Text>
              <View style={form1Styles.valueBox}>
                <Text style={form1Styles.fieldValue}>{data.filmEvaluatedBy || 'N/A'}</Text>
              </View>
            </View>
            <View style={form1Styles.infoFieldHalf}>
              <Text style={form1Styles.fieldLabel}>Company:</Text>
              <View style={form1Styles.valueBox}>
                <Text style={form1Styles.fieldValue}>{data.evaluatorCompany || 'N/A'}</Text>
              </View>
            </View>
          </View>

          <View style={form1Styles.infoRow}>
            <View style={form1Styles.infoFieldHalf}>
              <Text style={form1Styles.fieldLabel}>Mechanical Tests By:</Text>
              <View style={form1Styles.valueBox}>
                <Text style={form1Styles.fieldValue}>{data.mechanicalTestsConductor || 'N/A'}</Text>
              </View>
            </View>
            <View style={form1Styles.infoFieldHalf}>
              <Text style={form1Styles.fieldLabel}>Test Cert No:</Text>
              <View style={form1Styles.valueBox}>
                <Text style={form1Styles.fieldValue}>{data.testCertNo || 'N/A'}</Text>
              </View>
            </View>
          </View>

          <View style={form1Styles.infoRow}>
            <View style={form1Styles.infoField}>
              <Text style={form1Styles.fieldLabel}>Welding Supervised By:</Text>
              <View style={form1Styles.valueBox}>
                <Text style={form1Styles.fieldValue}>{data.weldingSupervisedBy || 'N/A'}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}