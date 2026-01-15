import { View, Text } from '@react-pdf/renderer'
import { form1Styles } from './form1Styles'

/**
 * Form1 Section 2: Test Description
 * WPS details and base metal specifications
 */

export default function Form1Section2({ data }) {
  const InfoField = ({ label, value }) => (
    <View style={form1Styles.infoField}>
      <Text style={form1Styles.fieldLabel}>{label}:</Text>
      <Text style={form1Styles.fieldValue}>{value || 'N/A'}</Text>
    </View>
  )

  return (
    <View>
      {/* Section Header */}
      <View style={form1Styles.sectionHeader}>
        <Text style={form1Styles.sectionTitle}>Test Description</Text>
      </View>

      {/* Info Grid */}
      <View style={form1Styles.infoGrid}>
        <View style={form1Styles.infoRow}>
          <InfoField label="WPS Identification" value={data.wpsIdentification} />
        </View>

        <View style={form1Styles.infoRow}>
          <InfoField 
            label="WPS Type" 
            value={data.wpsType === 'test-coupon' ? 'Test Coupon' : 'Production Weld'} 
            style={form1Styles.infoFieldHalf}
          />
          <InfoField 
            label="Base Metal Specification" 
            value={data.baseMetalSpec}
            style={form1Styles.infoFieldHalf}
          />
        </View>

        <View style={form1Styles.infoRow}>
          <InfoField 
            label="Thickness" 
            value={data.thickness}
            style={form1Styles.infoFieldHalf}
          />
        </View>
      </View>
    </View>
  )
}