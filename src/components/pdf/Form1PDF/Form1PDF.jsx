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
 * Form 1 – WPQ Certificate PDF
 * Flow-based professional layout
 * Sections continue naturally with clean spacing
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

  // Fallback signature placeholder (PDF-safe)
  const placeholderSignature =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjI0IiBmaWxsPSIjZjlmYWZiIiBzdHJva2U9IiNlNWU3ZWIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1zaXplPSI4IiBmaWxsPSIjOWNhM2FmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Tm8gU2lnbjwvdGV4dD48L3N2Zz4='

  return (
    <Document
      title={`WPQ Certificate - ${data.certificateNo}`}
      author="Industrial Support Services Company"
      subject={`Welder Qualification for ${data.welderName}`}
      creator="ISS Welder Management System"
    >
      {/* ======================= MAIN FLOW PAGE ======================= */}
      <Page size="A4" style={form1Styles.page} wrap>
        {/* ===== Header (Company, Photo, QR) ===== */}
        <Form1Header data={data} />

        {/* ===== SECTION 1 ===== */}
        <View style={{ marginTop: 8 }}>
          <Form1Section1 data={data} />
        </View>

        {/* ===== SECTION 2 ===== */}
        <View style={{ marginTop: 10 }}>
          <Form1Section2 data={data} />
        </View>

        {/* ===== SECTION 3 ===== */}
        <View style={{ marginTop: 10 }}>
          <Form1Section3 data={data} />
        </View>

        {/* ===== SECTION 4 ===== */}
        <View style={{ marginTop: 10 }}>
          <Form1Section4 data={data} />
        </View>

        {/* ===== SECTION 5 ===== */}
        <View style={{ marginTop: 10 }}>
          <Form1Section5 data={data} />
        </View>

        {/* ===== SECTION 6 (Certification Block) ===== */}
        {/* wrap={false} prevents ugly half-signature splits */}
        <View style={{ marginTop: 12 }} wrap={false}>
          <Form1Section6 data={data} />
        </View>

        {/* ===== CONTINUITY RECORDS ===== */}
        {data.continuityRecords?.length > 0 && (
          <View style={{ marginTop: 14 }}>
            <View style={form1Styles.sectionHeader}>
              <Text style={form1Styles.sectionTitle}>
                Record of Welding Continuity
              </Text>
            </View>

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
                    index % 2 === 1 && form1Styles.tableRowAlt,
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

        {/* ===== FINAL NOTE ===== */}
        <View
          style={{
            marginTop: 14,
            padding: 6,
            backgroundColor: '#F3F4F6',
            borderRadius: 4,
          }}
          wrap={false}
        >
          <Text
            style={{
              fontSize: 7,
              color: '#6B7280',
              textAlign: 'center',
              lineHeight: 1.4,
            }}
          >
            This document is computer-generated and valid without signature.
            For verification, scan the QR code or visit:{' '}
            {import.meta.env.VITE_APP_URL || 'www.issksa.com'}
          </Text>
        </View>

        {/* ===== FOOTER (ALL PAGES) ===== */}
        <View style={form1Styles.footer} fixed>
          <Text style={form1Styles.footerText}>
            Industrial Support Services Company | WPQ Certificate: {data.certificateNo}
          </Text>
          <Text
            style={form1Styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} of ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  )
}
