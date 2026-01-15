import { Document, Page, View, Text, Image } from '@react-pdf/renderer'
import { form1Styles } from './form1Styles'
import Form1Header from './Form1Header'
import Form1Section1 from './Form1Section1'
import Form1Section2 from './Form1Section2'
import Form1Section3 from './Form1Section3'
import Form1Section4 from './Form1Section4'
import Form1Section5 from './Form1Section5'
import Form1Section6 from './Form1Section6'

/**
 * Form1 PDF Document - Enhanced Version
 * Complete WPQ Certificate (2-3 pages)
 * Professional, modern, optimized spacing
 */

export default function Form1PDF({ data }) {
  if (!data) {
    return (
      <Document>
        <Page size="A4" style={form1Styles.page}>
          <View style={{ padding: 40, textAlign: 'center' }}>
            <Text style={{ fontSize: 14, color: '#DC2626' }}>
              Error: No data provided for PDF generation
            </Text>
          </View>
        </Page>
      </Document>
    )
  }

  // Placeholder for missing signature
  const placeholderSignature = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjI0IiBmaWxsPSIjZjlmYWZiIiBzdHJva2U9IiNlNWU3ZWIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1zaXplPSI4IiBmaWxsPSIjOWNhM2FmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Tm8gU2lnbjwvdGV4dD48L3N2Zz4='

  return (
    <Document
      title={`WPQ Certificate - ${data.certificateNo}`}
      author="Industrial Support Services Company"
      subject={`Welder Qualification for ${data.welderName}`}
      creator="ISS Welder Management System"
    >
      {/* ========== PAGE 1: Header + Sections 1-3 ========== */}
      <Page size="A4" style={form1Styles.page}>
        {/* Header with Company Info, Photo, QR Code */}
        <Form1Header data={data} />

        {/* Section 1: Basic Information */}
        <Form1Section1 data={data} />

        {/* Section 2: Test Description */}
        <Form1Section2 data={data} />

        {/* Section 3: Testing Variables Part 1 */}
        <Form1Section3 data={data} />

        {/* Footer */}
        <View style={form1Styles.footer} fixed>
          <Text style={form1Styles.footerText}>
            Industrial Support Services Company | WPQ Certificate: {data.certificateNo}
          </Text>
          <Text 
            style={form1Styles.pageNumber} 
            render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
          />
        </View>
      </Page>

      {/* ========== PAGE 2: Sections 4-5 ========== */}
      <Page size="A4" style={form1Styles.page}>
        {/* Minimal Header */}
        <View style={[form1Styles.header, { marginBottom: 6, paddingBottom: 4 }]}>
          <View style={form1Styles.companyInfo}>
            <Text style={[form1Styles.companyName, { fontSize: 11 }]}>
              Industrial Support Services Company
            </Text>
            <Text style={[form1Styles.companyDetails, { fontSize: 7 }]}>
              WPQ Certificate: {data.certificateNo} | {data.welderName}
            </Text>
          </View>
        </View>

        {/* Section 4: Testing Variables Part 2 */}
        <Form1Section4 data={data} />

        {/* Section 5: Results */}
        <Form1Section5 data={data} />

        {/* Footer */}
        <View style={form1Styles.footer} fixed>
          <Text style={form1Styles.footerText}>
            Industrial Support Services Company | WPQ Certificate: {data.certificateNo}
          </Text>
          <Text 
            style={form1Styles.pageNumber} 
            render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
          />
        </View>
      </Page>

      {/* ========== PAGE 3: Section 6 + Continuity ========== */}
      <Page size="A4" style={form1Styles.page}>
        {/* Minimal Header */}
        <View style={[form1Styles.header, { marginBottom: 6, paddingBottom: 4 }]}>
          <View style={form1Styles.companyInfo}>
            <Text style={[form1Styles.companyName, { fontSize: 11 }]}>
              Industrial Support Services Company
            </Text>
            <Text style={[form1Styles.companyDetails, { fontSize: 7 }]}>
              WPQ Certificate: {data.certificateNo} | {data.welderName}
            </Text>
          </View>
        </View>

        {/* Section 6: Certification Block */}
        <Form1Section6 data={data} />

        {/* Continuity Records Table */}
        {data.continuityRecords && data.continuityRecords.length > 0 && (
          <View style={{ marginTop: 6 }}>
            <View style={form1Styles.sectionHeader}>
              <Text style={form1Styles.sectionTitle}>
                Record of Welding Continuity
              </Text>
            </View>

            {/* Continuity Table */}
            <View style={form1Styles.continuityTable}>
              {/* Header */}
              <View style={form1Styles.continuityHeader}>
                <Text style={[form1Styles.continuityHeaderText, { width: '14%' }]}>Date</Text>
                <Text style={[form1Styles.continuityHeaderText, { width: '16%' }]}>Verifier</Text>
                <Text style={[form1Styles.continuityHeaderText, { width: '13%' }]}>Signature</Text>
                <Text style={[form1Styles.continuityHeaderText, { width: '18%' }]}>Company</Text>
                <Text style={[form1Styles.continuityHeaderText, { width: '20%' }]}>Reference</Text>
                <Text style={[form1Styles.continuityHeaderText, { width: '10%' }]}>QC Name</Text>
                <Text style={[form1Styles.continuityHeaderText, { width: '9%' }]}>QC Sign</Text>
              </View>

              {/* Rows */}
              {data.continuityRecords.map((record, index) => (
                <View 
                  key={index} 
                  style={[
                    form1Styles.continuityRow,
                    index % 2 === 1 && form1Styles.tableRowAlt
                  ]}
                >
                  <Text style={[form1Styles.continuityCell, { width: '14%' }]}>
                    {record.date || 'N/A'}
                  </Text>
                  <Text style={[form1Styles.continuityCell, { width: '16%' }]}>
                    {record.verifierName || 'N/A'}
                  </Text>
                  <View style={{ width: '13%', alignItems: 'center' }}>
                    <Image 
                      src={record.verifierSignatureUrl || placeholderSignature} 
                      style={form1Styles.signatureImage}
                    />
                  </View>
                  <Text style={[form1Styles.continuityCell, { width: '18%' }]}>
                    {record.company || 'N/A'}
                  </Text>
                  <Text style={[form1Styles.continuityCell, { width: '20%' }]}>
                    {record.reference || 'N/A'}
                  </Text>
                  <Text style={[form1Styles.continuityCell, { width: '10%' }]}>
                    {record.qcName || 'N/A'}
                  </Text>
                  <View style={{ width: '9%', alignItems: 'center' }}>
                    <Image 
                      src={record.qcSignatureUrl || placeholderSignature} 
                      style={form1Styles.signatureImage}
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Final Note */}
        <View style={{ marginTop: 8, padding: 5, backgroundColor: '#F3F4F6', borderRadius: 3 }}>
          <Text style={{ fontSize: 7, color: '#6B7280', textAlign: 'center', lineHeight: 1.3 }}>
            This document is computer-generated and valid without signature. 
            For verification, scan the QR code or visit: {import.meta.env.VITE_APP_URL || 'www.issksa.com'}
          </Text>
        </View>

        {/* Footer */}
        <View style={form1Styles.footer} fixed>
          <Text style={form1Styles.footerText}>
            Industrial Support Services Company | WPQ Certificate: {data.certificateNo}
          </Text>
          <Text 
            style={form1Styles.pageNumber} 
            render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
          />
        </View>
      </Page>
    </Document>
  )
}