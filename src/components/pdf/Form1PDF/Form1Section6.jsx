// ========== Form1Section6.jsx ==========
import { View, Text } from '@react-pdf/renderer'
import { form1Styles } from './form1Styles'

/**
 * Form1 Section 6: Certification Block - ENHANCED
 * Professional certification section with ASME compliance
 */

export default function Form1Section6({ data }) {
  const codeYear = data.codeYear || new Date().getFullYear().toString()

  return (
    <View>
      {/* Section Header */}
      <View style={form1Styles.sectionHeader}>
        <Text style={form1Styles.sectionTitle}>Certification</Text>
        <Text style={form1Styles.sectionSubtitle}>
          ASME Section IX Compliance
        </Text>
      </View>

      {/* Certification Block */}
      <View style={form1Styles.certificationBlock}>
        {/* ASME Certification Statement */}
        <Text style={form1Styles.certificationStatement}>
          We certify that the statements in this record are correct and that the test 
          coupons were prepared, welded, and tested in accordance with the requirements 
          of Section IX of the ASME BOILER AND PRESSURE VESSEL CODE {codeYear} Edition.
        </Text>

        <View style={form1Styles.divider} />

        {/* Certified By */}
        <View style={form1Styles.certificationRow}>
          <View style={form1Styles.certificationField}>
            <Text style={form1Styles.certificationLabel}>Certified Date</Text>
            <Text style={form1Styles.certificationValue}>
              {data.certifiedDate || 'N/A'}
            </Text>
          </View>
          <View style={form1Styles.certificationField}>
            <Text style={form1Styles.certificationLabel}>Certified By (Print Name)</Text>
            <Text style={form1Styles.certificationValue}>
              {data.certifiedName || 'N/A'}
            </Text>
          </View>
        </View>

        <View style={form1Styles.certificationRow}>
          <View style={form1Styles.certificationField}>
            <Text style={form1Styles.certificationLabel}>Certification No (CSWIP/AWS)</Text>
            <Text style={form1Styles.certificationValue}>
              {data.certifiedCertNo || 'N/A'}
            </Text>
          </View>
        </View>

        <View style={form1Styles.divider} />

        {/* Reviewed By */}
        <View style={form1Styles.certificationRow}>
          <View style={form1Styles.certificationField}>
            <Text style={form1Styles.certificationLabel}>Reviewed Date</Text>
            <Text style={form1Styles.certificationValue}>
              {data.reviewedDate || 'N/A'}
            </Text>
          </View>
          <View style={form1Styles.certificationField}>
            <Text style={form1Styles.certificationLabel}>Reviewed By (Print Name)</Text>
            <Text style={form1Styles.certificationValue}>
              {data.reviewedName || 'N/A'}
            </Text>
          </View>
        </View>

        <View style={form1Styles.divider} />

        {/* Client Representative */}
        <View style={form1Styles.certificationRow}>
          <View style={form1Styles.certificationField}>
            <Text style={form1Styles.certificationLabel}>Client Rep. Date</Text>
            <Text style={form1Styles.certificationValue}>
              {data.clientRepDate || 'N/A'}
            </Text>
          </View>
          <View style={form1Styles.certificationField}>
            <Text style={form1Styles.certificationLabel}>Client Representative Name</Text>
            <Text style={form1Styles.certificationValue}>
              {data.clientRepName || 'N/A'}
            </Text>
          </View>
        </View>

        <View style={form1Styles.divider} />

        {/* Form Details */}
        <View style={form1Styles.certificationRow}>
          <View style={form1Styles.certificationField}>
            <Text style={form1Styles.certificationLabel}>Form No</Text>
            <Text style={form1Styles.certificationValue}>
              {data.formNo || 'N/A'}
            </Text>
          </View>
          <View style={form1Styles.certificationField}>
            <Text style={form1Styles.certificationLabel}>Date of Issue</Text>
            <Text style={form1Styles.certificationValue}>
              {data.dateOfIssue || 'N/A'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}