import { View, Text } from '@react-pdf/renderer'
import { form1Styles } from './form1Styles'

/**
 * Form1 Section 1: Basic Information
 * Welder identification and test details
 */

export default function Form1Section1({ data }) {
  const InfoField = ({ label, value, style = {} }) => (
    <View style={[form1Styles.infoField, style]}>
      <Text style={form1Styles.fieldLabel}>{label}:</Text>
      <Text style={form1Styles.fieldValue}>{value || 'N/A'}</Text>
    </View>
  )

  return (
    <View>
      {/* Section Header */}
      <View style={form1Styles.sectionHeader}>
        <Text style={form1Styles.sectionTitle}>
          Welder Performance Qualification Test Record
        </Text>
      </View>

      {/* Info Grid */}
      <View style={form1Styles.infoGrid}>
        {/* Row 1 */}
        <View style={form1Styles.infoRow}>
          <InfoField 
            label="Client/Contractor" 
            value={data.clientContractor}
            style={form1Styles.infoFieldHalf}
          />
          <InfoField 
            label="Welder Name" 
            value={data.welderName}
            style={form1Styles.infoFieldHalf}
          />
        </View>

        {/* Row 2 */}
        <View style={form1Styles.infoRow}>
          <InfoField 
            label="Iqama/Passport No" 
            value={data.iqamaPassport}
            style={form1Styles.infoFieldThird}
          />
          <InfoField 
            label="Certificate No" 
            value={data.certificateNo}
            style={form1Styles.infoFieldThird}
          />
          <InfoField 
            label="Symbol/Stamp No" 
            value={data.symbolStampNo}
            style={form1Styles.infoFieldThird}
          />
        </View>

        {/* Row 3 */}
        <View style={form1Styles.infoRow}>
          <InfoField 
            label="Date Welded" 
            value={data.dateWelded}
            style={form1Styles.infoFieldThird}
          />
          <InfoField 
            label="Designation" 
            value={data.designation}
            style={form1Styles.infoFieldThird}
          />
          <InfoField 
            label="Date of Birth" 
            value={data.dateOfBirth}
            style={form1Styles.infoFieldThird}
          />
        </View>

        {/* Row 4 */}
        <View style={form1Styles.infoRow}>
          <InfoField 
            label="Date of Joining" 
            value={data.dateOfJoining}
            style={form1Styles.infoFieldHalf}
          />
        </View>
      </View>
    </View>
  )
}