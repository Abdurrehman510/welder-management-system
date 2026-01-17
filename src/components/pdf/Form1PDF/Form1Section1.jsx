// ========== Form1Section1.jsx ==========
import { View, Text } from '@react-pdf/renderer'
import { form1Styles } from './form1Styles'

/**
 * Form1 Section 1: Basic Information - ENHANCED
 * Professional layout with improved visual hierarchy
 */

export default function Form1Section1({ data }) {
  return (
    <View>
      {/* Section Header */}
      <View style={form1Styles.sectionHeader}>
        <Text style={form1Styles.sectionTitle}>
          Welder & Test Information
        </Text>
        <Text style={form1Styles.sectionSubtitle}>
          Personnel & Test Details
        </Text>
      </View>

      {/* Info Container */}
      <View style={form1Styles.infoContainer}>
        {/* Row 1: Client & Welder Name */}
        <View style={form1Styles.infoRow}>
          <View style={form1Styles.infoFieldHalf}>
            <Text style={form1Styles.fieldLabel}>Client/Contractor:</Text>
            <View style={form1Styles.fieldValueContainer}>
              <Text style={form1Styles.fieldValue}>{data.clientContractor || 'N/A'}</Text>
            </View>
          </View>
          <View style={form1Styles.infoFieldHalf}>
            <Text style={form1Styles.fieldLabel}>Welder Name:</Text>
            <View style={form1Styles.fieldValueContainer}>
              <Text style={[form1Styles.fieldValue, { fontWeight: 'bold' }]}>
                {data.welderName || 'N/A'}
              </Text>
            </View>
          </View>
        </View>

        {/* Row 2: Iqama, Certificate, Stamp */}
        <View style={form1Styles.infoRow}>
          <View style={form1Styles.infoFieldThird}>
            <Text style={form1Styles.fieldLabel}>Iqama/Passport No:</Text>
            <View style={form1Styles.fieldValueContainer}>
              <Text style={form1Styles.fieldValue}>{data.iqamaPassport || 'N/A'}</Text>
            </View>
          </View>
          <View style={form1Styles.infoFieldThird}>
            <Text style={form1Styles.fieldLabel}>Certificate No:</Text>
            <View style={form1Styles.fieldValueContainer}>
              <Text style={[form1Styles.fieldValue, { fontWeight: 'bold', color: '#1E40AF' }]}>
                {data.certificateNo || 'N/A'}
              </Text>
            </View>
          </View>
          <View style={form1Styles.infoFieldThird}>
            <Text style={form1Styles.fieldLabel}>Symbol/Stamp No:</Text>
            <View style={form1Styles.fieldValueContainer}>
              <Text style={form1Styles.fieldValue}>{data.symbolStampNo || 'N/A'}</Text>
            </View>
          </View>
        </View>

        {/* Row 3: Dates & Designation */}
        <View style={form1Styles.infoRow}>
          <View style={form1Styles.infoFieldThird}>
            <Text style={form1Styles.fieldLabel}>Date Welded:</Text>
            <View style={form1Styles.fieldValueContainer}>
              <Text style={form1Styles.fieldValue}>{data.dateWelded || 'N/A'}</Text>
            </View>
          </View>
          <View style={form1Styles.infoFieldThird}>
            <Text style={form1Styles.fieldLabel}>Designation:</Text>
            <View style={form1Styles.fieldValueContainer}>
              <Text style={form1Styles.fieldValue}>{data.designation || 'N/A'}</Text>
            </View>
          </View>
          <View style={form1Styles.infoFieldThird}>
            <Text style={form1Styles.fieldLabel}>Date of Birth:</Text>
            <View style={form1Styles.fieldValueContainer}>
              <Text style={form1Styles.fieldValue}>{data.dateOfBirth || 'N/A'}</Text>
            </View>
          </View>
        </View>

        {/* Row 4: Joining Date & Nationality */}
        <View style={form1Styles.infoRow}>
          <View style={form1Styles.infoFieldHalf}>
            <Text style={form1Styles.fieldLabel}>Date of Joining:</Text>
            <View style={form1Styles.fieldValueContainer}>
              <Text style={form1Styles.fieldValue}>{data.dateOfJoining || 'N/A'}</Text>
            </View>
          </View>
          <View style={form1Styles.infoFieldHalf}>
            <Text style={form1Styles.fieldLabel}>Nationality:</Text>
            <View style={form1Styles.fieldValueContainer}>
              <Text style={form1Styles.fieldValue}>{data.nationality || 'N/A'}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}