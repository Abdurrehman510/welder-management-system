import { Document, Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer'

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * FORM2 PDF - WELDER QUALIFICATION CONTINUITY RECORD
 * ═══════════════════════════════════════════════════════════════════════════
 * Professional, modern, high-density technical document
 * Designed by: Senior PDF UI/UX Architect
 * Standards: Print-ready, auditor-friendly, visually engaging
 * ═══════════════════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════════════════
// PROFESSIONAL STYLESHEET - MODERN & CLEAN
// ═══════════════════════════════════════════════════════════════════════════

const styles = StyleSheet.create({
  // ──────────────────────────────────────────────────────────────────────────
  // PAGE LAYOUT
  // ──────────────────────────────────────────────────────────────────────────
  page: {
    padding: 14,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    fontSize: 9,
    lineHeight: 1.3,
  },

  // ──────────────────────────────────────────────────────────────────────────
  // HEADER SECTION
  // ──────────────────────────────────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
    paddingBottom: 6,
    borderBottomWidth: 2.5,
    borderBottomColor: '#1E40AF',
    borderBottomStyle: 'solid',
  },

  logoContainer: {
    width: 65,
    height: 65,
    marginRight: 12,
  },

  logo: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },

  companyInfo: {
    flex: 1,
    paddingRight: 10,
  },

  companyName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1E40AF',
    marginBottom: 3,
    letterSpacing: 0.5,
    lineHeight: 1.2,
  },

  companyDetails: {
    fontSize: 8,
    color: '#4B5563',
    lineHeight: 1.3,
    marginBottom: 0.5,
  },

  photoContainer: {
    width: 75,
    height: 90,
    borderWidth: 2.5,
    borderColor: '#3B82F6',
    borderStyle: 'solid',
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#F9FAFB',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },

  photo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // DOCUMENT TITLE
  // ──────────────────────────────────────────────────────────────────────────
  documentTitle: {
    backgroundColor: '#1E40AF',
    padding: 10,
    marginBottom: 8,
    borderRadius: 4,
    textAlign: 'center',
  },

  documentTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },

  // ──────────────────────────────────────────────────────────────────────────
  // SECTION HEADERS
  // ──────────────────────────────────────────────────────────────────────────
  sectionHeader: {
    backgroundColor: '#EFF6FF',
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginTop: 6,
    marginBottom: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#2563EB',
    borderLeftStyle: 'solid',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#DBEAFE',
    borderStyle: 'solid',
  },

  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1E40AF',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },

  // ──────────────────────────────────────────────────────────────────────────
  // INFO TABLE (Read-only fields)
  // ──────────────────────────────────────────────────────────────────────────
  infoTable: {
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    borderStyle: 'solid',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },

  infoRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    borderBottomStyle: 'solid',
    minHeight: 22,
  },

  infoRowLast: {
    borderBottomWidth: 0,
  },

  infoCell: {
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRightWidth: 1,
    borderRightColor: '#E2E8F0',
    borderRightStyle: 'solid',
    justifyContent: 'center',
  },

  infoCellLast: {
    borderRightWidth: 0,
  },

  infoCellFull: {
    flex: 3,
    paddingVertical: 4,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },

  infoLabel: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    marginBottom: 2,
  },

  infoValue: {
    fontSize: 10,
    color: '#0F172A',
    fontWeight: 'normal',
  },

  infoValueHighlight: {
    fontSize: 10,
    color: '#1E40AF',
    fontWeight: 'bold',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // CONTINUITY TABLE
  // ──────────────────────────────────────────────────────────────────────────
  continuityTable: {
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    borderStyle: 'solid',
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: 4,
  },

  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#1E40AF',
    paddingVertical: 5,
    paddingHorizontal: 6,
    borderBottomWidth: 2,
    borderBottomColor: '#1E3A8A',
    borderBottomStyle: 'solid',
  },

  tableHeaderText: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },

  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    borderBottomStyle: 'solid',
    paddingVertical: 5,
    paddingHorizontal: 6,
    minHeight: 32,
    alignItems: 'center',
  },

  tableRowAlt: {
    backgroundColor: '#F8FAFC',
  },

  tableRowLast: {
    borderBottomWidth: 0,
  },

  tableCell: {
    fontSize: 8.5,
    color: '#334155',
    paddingRight: 4,
  },

  signatureContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  signatureImage: {
    width: 40,
    height: 24,
    objectFit: 'contain',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderStyle: 'solid',
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // EMPTY STATE
  // ──────────────────────────────────────────────────────────────────────────
  emptyState: {
    padding: 24,
    backgroundColor: '#FEF3C7',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#F59E0B',
    borderStyle: 'dashed',
    textAlign: 'center',
    marginTop: 4,
  },

  emptyStateTitle: {
    fontSize: 11,
    color: '#92400E',
    fontWeight: 'bold',
    marginBottom: 4,
  },

  emptyStateText: {
    fontSize: 8.5,
    color: '#78350F',
    lineHeight: 1.4,
  },

  // ──────────────────────────────────────────────────────────────────────────
  // NOTES & FOOTER
  // ──────────────────────────────────────────────────────────────────────────
  notesContainer: {
    backgroundColor: '#DBEAFE',
    padding: 6,
    borderRadius: 3,
    borderLeftWidth: 3,
    borderLeftColor: '#3B82F6',
    borderLeftStyle: 'solid',
    marginTop: 8,
  },

  notesTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },

  notesText: {
    fontSize: 7.5,
    color: '#1E40AF',
    lineHeight: 1.4,
  },

  footerNote: {
    marginTop: 12,
    padding: 7,
    backgroundColor: '#F8FAFC',
    borderRadius: 3,
    borderTopWidth: 2,
    borderTopColor: '#1E40AF',
    borderTopStyle: 'solid',
  },

  footerNoteText: {
    fontSize: 7.5,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 1.3,
  },

  footerDate: {
    fontSize: 7,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 2,
  },

  // ──────────────────────────────────────────────────────────────────────────
  // PAGE FOOTER (Fixed)
  // ──────────────────────────────────────────────────────────────────────────
  pageFooter: {
    position: 'absolute',
    bottom: 14,
    left: 18,
    right: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 6,
    borderTopWidth: 1.5,
    borderTopColor: '#CBD5E1',
    borderTopStyle: 'solid',
  },

  pageFooterText: {
    fontSize: 7.5,
    color: '#64748B',
    fontStyle: 'italic',
  },

  pageNumber: {
    fontSize: 7.5,
    color: '#64748B',
    fontWeight: 'bold',
  },
})

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export default function Form2PDF({ data }) {
  // ────────────────────────────────────────────────────────────────────────
  // Data validation
  // ────────────────────────────────────────────────────────────────────────
  if (!data) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={{ padding: 40, textAlign: 'center' }}>
            <Text style={{ fontSize: 14, color: '#DC2626', fontWeight: 'bold' }}>
              Error: No data provided for PDF generation
            </Text>
          </View>
        </Page>
      </Document>
    )
  }

  // ────────────────────────────────────────────────────────────────────────
  // Placeholders
  // ────────────────────────────────────────────────────────────────────────
  const placeholderPhoto = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2U1ZTdlYiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjOWNhM2FmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Tm8gUGhvdG88L3RleHQ+PC9zdmc+'
  const placeholderSignature = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjI0IiBmaWxsPSIjZjlmYWZiIiBzdHJva2U9IiNlNWU3ZWIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1zaXplPSI4IiBmaWxsPSIjOWNhM2FmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Tm8gU2lnbjwvdGV4dD48L3N2Zz4='
  const logoUrl = '/iss_logo_fevicon.png'

  const continuityRecords = data.continuityRecords || []
  const hasRecords = continuityRecords.length > 0

  return (
    <Document
      title={`Continuity Record - ${data.certificateNo}`}
      author="Industrial Support Services Company"
      subject={`Welder Continuity Record for ${data.welderName}`}
      creator="ISS Welder Management System"
    >
      <Page size="A4" style={styles.page}>
        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* HEADER SECTION                                                  */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <View style={styles.header}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image src={logoUrl} style={styles.logo} />
          </View>

          {/* Company Information */}
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>
              Industrial Support Services Company
            </Text>
            <Text style={styles.companyDetails}>
              Post Box 11501, Dammam 31463, K.S.A
            </Text>
            <Text style={styles.companyDetails}>
              Ph # +966 13 844 7733 | Fax # +966 13 844 8833
            </Text>
            <Text style={styles.companyDetails}>
              Email: info@issksa.com
            </Text>
          </View>

          {/* Welder Photo */}
          <View style={styles.photoContainer}>
            <Image 
              src={data.photoUrl || placeholderPhoto} 
              style={styles.photo}
            />
          </View>
        </View>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* DOCUMENT TITLE                                                  */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <View style={styles.documentTitle}>
          <Text style={styles.documentTitleText}>
            WELDER QUALIFICATION CONTINUITY RECORD
          </Text>
        </View>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* WELDER INFORMATION TABLE (Read-only)                            */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <View style={styles.infoTable}>
          {/* Row 1: Certificate No | WPS No */}
          <View style={styles.infoRow}>
            <View style={styles.infoCell}>
              <Text style={styles.infoLabel}>Certificate No :</Text>
              <Text style={styles.infoValueHighlight}>
                {data.certificateNo || 'N/A'}
              </Text>
            </View>
            <View style={[styles.infoCell, styles.infoCellLast]}>
              <Text style={styles.infoLabel}>WPS No :</Text>
              <Text style={styles.infoValue}>
                {data.wpsNo || 'N/A'}
              </Text>
            </View>
          </View>

          {/* Row 2: Name of Welder (full width) */}
          <View style={styles.infoRow}>
            <View style={styles.infoCellFull}>
              <Text style={styles.infoLabel}>Name of Welder :</Text>
              <Text style={[styles.infoValue, { fontWeight: 'bold' }]}>
                {data.welderName || 'N/A'}
              </Text>
            </View>
          </View>

          {/* Row 3: Date of welder test | Symbol/Stamp No */}
          <View style={styles.infoRow}>
            <View style={styles.infoCell}>
              <Text style={styles.infoLabel}>Date of welder test :</Text>
              <Text style={styles.infoValue}>
                {data.dateWelded || 'N/A'}
              </Text>
            </View>
            <View style={[styles.infoCell, styles.infoCellLast]}>
              <Text style={styles.infoLabel}>Symbol/Stamp No :</Text>
              <Text style={styles.infoValue}>
                {data.symbolStampNo || 'N/A'}
              </Text>
            </View>
          </View>

          {/* Row 4: Date of issue | Iqama/Passport No */}
          <View style={[styles.infoRow, styles.infoRowLast]}>
            <View style={styles.infoCell}>
              <Text style={styles.infoLabel}>Date of issue :</Text>
              <Text style={styles.infoValue}>
                {data.dateOfIssue || 'N/A'}
              </Text>
            </View>
            <View style={[styles.infoCell, styles.infoCellLast]}>
              <Text style={styles.infoLabel}>Iqama/Passport No :</Text>
              <Text style={styles.infoValue}>
                {data.iqamaPassport || 'N/A'}
              </Text>
            </View>
          </View>
        </View>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* CONTINUITY RECORDS SECTION                                      */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Record of Welding Continuity</Text>
        </View>

        {/* ──────────────────────────────────────────────────────────────── */}
        {/* CONTINUITY TABLE (if records exist)                             */}
        {/* ──────────────────────────────────────────────────────────────── */}
        {hasRecords ? (
          <View style={styles.continuityTable}>
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, { width: '14%' }]}>Date</Text>
              <Text style={[styles.tableHeaderText, { width: '16%' }]}>Verifier</Text>
              <Text style={[styles.tableHeaderText, { width: '13%' }]}>Signature</Text>
              <Text style={[styles.tableHeaderText, { width: '18%' }]}>Company</Text>
              <Text style={[styles.tableHeaderText, { width: '20%' }]}>Reference</Text>
              <Text style={[styles.tableHeaderText, { width: '10%' }]}>QC Name</Text>
              <Text style={[styles.tableHeaderText, { width: '9%' }]}>QC Sign</Text>
            </View>

            {/* Table Rows */}
            {continuityRecords.map((record, index) => (
              <View 
                key={index} 
                style={[
                  styles.tableRow,
                  index % 2 === 1 && styles.tableRowAlt,
                  index === continuityRecords.length - 1 && styles.tableRowLast
                ]}
              >
                {/* Date */}
                <Text style={[styles.tableCell, { width: '14%' }]}>
                  {record.date || 'N/A'}
                </Text>

                {/* Verifier Name */}
                <Text style={[styles.tableCell, { width: '16%' }]}>
                  {record.verifierName || 'N/A'}
                </Text>

                {/* Verifier Signature */}
                <View style={{ width: '13%' }}>
                  <View style={styles.signatureContainer}>
                    <Image 
                      src={record.verifierSignatureUrl || placeholderSignature} 
                      style={styles.signatureImage}
                    />
                  </View>
                </View>

                {/* Company */}
                <Text style={[styles.tableCell, { width: '18%' }]}>
                  {record.company || 'N/A'}
                </Text>

                {/* Reference */}
                <Text style={[styles.tableCell, { width: '20%' }]}>
                  {record.reference || 'N/A'}
                </Text>

                {/* QC Name */}
                <Text style={[styles.tableCell, { width: '10%' }]}>
                  {record.qcName || 'N/A'}
                </Text>

                {/* QC Signature */}
                <View style={{ width: '9%' }}>
                  <View style={styles.signatureContainer}>
                    <Image 
                      src={record.qcSignatureUrl || placeholderSignature} 
                      style={styles.signatureImage}
                    />
                  </View>
                </View>
              </View>
            ))}
          </View>
        ) : (
          /* ──────────────────────────────────────────────────────────────── */
          /* EMPTY STATE (if no records)                                     */
          /* ──────────────────────────────────────────────────────────────── */
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>
              No continuity records found.
            </Text>
            <Text style={styles.emptyStateText}>
              This welder has not yet recorded any continuity activities. 
              Continuity records will appear here once welding verification is performed.
            </Text>
          </View>
        )}

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* COMPLIANCE NOTES                                                */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <View style={styles.notesContainer}>
          <Text style={styles.notesTitle}>Continuity Requirements:</Text>
          <Text style={styles.notesText}>
            Welders must demonstrate continuity of qualification through documented 
            welding activities. Records shall be maintained every 6 months or as per 
            applicable code requirements. Gaps exceeding 6 months may require requalification testing.
          </Text>
        </View>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* FOOTER NOTE                                                     */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <View style={styles.footerNote}>
          <Text style={styles.footerNoteText}>
            This document is computer-generated and valid without signature. 
            For verification, scan the QR code or visit: www.issksa.com
          </Text>
          <Text style={styles.footerDate}>
            Document Generated: {new Date().toLocaleDateString('en-GB', { 
              day: '2-digit', 
              month: 'short', 
              year: 'numeric' 
            })} | Certificate: {data.certificateNo}
          </Text>
        </View>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* PAGE FOOTER (Fixed)                                             */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <View style={styles.pageFooter} fixed>
          <Text style={styles.pageFooterText}>
            Industrial Support Services Company | Continuity Record: {data.certificateNo}
          </Text>
          <Text 
            style={styles.pageNumber} 
            render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
          />
        </View>
      </Page>
    </Document>
  )
}