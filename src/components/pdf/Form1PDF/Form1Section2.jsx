// ========== Form1Section2.jsx ==========
import { View, Text } from '@react-pdf/renderer'
import { form1Styles } from './form1Styles'

/**
 * Form1 Section 2: Test Description - ENHANCED
 * Professional redesign with improved layout
 */

export default function Form1Section2({ data }) {
  return (
    <View>
      {/* Section Header */}
      <View style={form1Styles.sectionHeader}>
        <Text style={form1Styles.sectionTitle}>
          Test Description
        </Text>
        <Text style={form1Styles.sectionSubtitle}>
          WPS & Material Specifications
        </Text>
      </View>

      {/* Test Description Container */}
      <View style={form1Styles.infoContainer}>
        {/* WPS Identification */}
        <View style={{ marginBottom: 6 }}>
          <Text style={[form1Styles.fieldLabel, { fontSize: 8, color: '#1E40AF' }]}>
            WPS Identification:
          </Text>
          <View style={[form1Styles.fieldValueContainer, { borderBottomWidth: 2, borderBottomColor: '#3B82F6' }]}>
            <Text style={[form1Styles.fieldValue, { fontWeight: 'bold', fontSize: 10 }]}>
              {data.wpsIdentification || 'Not Specified'}
            </Text>
          </View>
        </View>

        {/* WPS Type and Base Metal Spec */}
        <View style={form1Styles.infoRow}>
          <View style={form1Styles.infoFieldHalf}>
            <Text style={form1Styles.fieldLabel}>WPS Type:</Text>
            <View style={form1Styles.fieldValueContainer}>
              <Text style={form1Styles.fieldValue}>
                {data.wpsType === 'test-coupon' ? 'Test Coupon' : 'Production Weld'}
              </Text>
            </View>
          </View>
          <View style={form1Styles.infoFieldHalf}>
            <Text style={form1Styles.fieldLabel}>Base Metal Specification:</Text>
            <View style={form1Styles.fieldValueContainer}>
              <Text style={form1Styles.fieldValue}>{data.baseMetalSpec || 'N/A'}</Text>
            </View>
          </View>
        </View>

        {/* Thickness */}
        <View style={form1Styles.infoRow}>
          <View style={form1Styles.infoFieldHalf}>
            <Text style={form1Styles.fieldLabel}>Thickness:</Text>
            <View style={form1Styles.fieldValueContainer}>
              <Text style={form1Styles.fieldValue}>{data.thickness || 'N/A'}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Material Note */}
      <View style={form1Styles.notesContainer}>
        <Text style={form1Styles.notesTitle}>Material Compliance Note:</Text>
        <Text style={form1Styles.notesText}>
          All base metals and filler materials comply with specified codes and standards. 
          Material traceability is maintained throughout the qualification process.
        </Text>
      </View>
    </View>
  )
}