// ========== Form1Section6.jsx ==========
import { View, Text, Image } from '@react-pdf/renderer'
import { form1Styles } from './form1Styles'

/**
 * Form1 Section 6: Certification Block with Signatures
 * ✅ NOW WITH: All 3 signature displays (Certifier, Reviewer, Client Rep)
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

        {/* ✅ WITNESSED & CERTIFIED BY - With Signature */}
        <Text style={{fontSize: 11, fontWeight: 'bold', marginBottom: 8, color: '#1e40af'}}>
          Witnessed & Certified By
        </Text>
        
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
          
          {/* ✅ CERTIFIER SIGNATURE */}
          <View style={form1Styles.certificationField}>
            <Text style={form1Styles.certificationLabel}>Signature</Text>
            {data.certifierSignatureUrl ? (
              <Image 
                src={data.certifierSignatureUrl} 
                style={{
                  maxWidth: 120,
                  maxHeight: 40,
                  objectFit: 'contain',
                  marginTop: 4,
                  border: '1px solid #e5e7eb',
                  padding: 4,
                  backgroundColor: '#ffffff'
                }}
              />
            ) : (
              <Text style={{fontSize: 9, color: '#9ca3af', marginTop: 4}}>
                No signature
              </Text>
            )}
          </View>
        </View>

        <View style={form1Styles.divider} />

        {/* ✅ REVIEWED BY - With Signature */}
        <Text style={{fontSize: 11, fontWeight: 'bold', marginBottom: 8, color: '#1e40af'}}>
          Reviewed By
        </Text>
        
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

        {/* ✅ REVIEWER SIGNATURE */}
        <View style={{marginTop: 8}}>
          <Text style={form1Styles.certificationLabel}>Reviewer Signature</Text>
          {data.reviewerSignatureUrl ? (
            <Image 
              src={data.reviewerSignatureUrl} 
              style={{
                maxWidth: 120,
                maxHeight: 40,
                objectFit: 'contain',
                marginTop: 4,
                border: '1px solid #e5e7eb',
                padding: 4,
                backgroundColor: '#ffffff'
              }}
            />
          ) : (
            <Text style={{fontSize: 9, color: '#9ca3af', marginTop: 4}}>
              No signature
            </Text>
          )}
        </View>

        <View style={form1Styles.divider} />

        {/* ✅ CLIENT REPRESENTATIVE - With Signature */}
        <Text style={{fontSize: 11, fontWeight: 'bold', marginBottom: 8, color: '#1e40af'}}>
          Client / Contractor Representative
        </Text>
        
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

        {/* ✅ CLIENT REP SIGNATURE */}
        <View style={{marginTop: 8}}>
          <Text style={form1Styles.certificationLabel}>Client Rep Signature</Text>
          {data.clientRepSignatureUrl ? (
            <Image 
              src={data.clientRepSignatureUrl} 
              style={{
                maxWidth: 120,
                maxHeight: 40,
                objectFit: 'contain',
                marginTop: 4,
                border: '1px solid #e5e7eb',
                padding: 4,
                backgroundColor: '#ffffff'
              }}
            />
          ) : (
            <Text style={{fontSize: 9, color: '#9ca3af', marginTop: 4}}>
              No signature
            </Text>
          )}
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