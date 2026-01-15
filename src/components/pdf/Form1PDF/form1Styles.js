import { StyleSheet } from '@react-pdf/renderer'

/**
 * Form1 PDF Styles - Enhanced Version
 * Professional, modern, optimized spacing
 */

export const form1Styles = StyleSheet.create({
  // ========== PAGE & DOCUMENT ==========
  page: {
    padding: 12,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    fontSize: 8.5,
    lineHeight: 1.3,
  },

  // ========== HEADER ==========
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
    paddingBottom: 6,
    borderBottomWidth: 2,
    borderBottomColor: '#1E40AF',
    borderBottomStyle: 'solid',
  },

  companyInfo: {
    flex: 1,
  },

  companyName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1E40AF',
    marginBottom: 2,
    letterSpacing: 0.3,
  },

  companyDetails: {
    fontSize: 7.5,
    color: '#4B5563',
    lineHeight: 1.2,
  },

  logoContainer: {
    width: 55,
    height: 55,
    marginRight: 8,
  },

  logo: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },

  photoContainer: {
    width: 65,
    height: 80,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    borderStyle: 'solid',
    borderRadius: 3,
    overflow: 'hidden',
    backgroundColor: '#F9FAFB',
  },

  photo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  qrContainer: {
    width: 55,
    height: 55,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderStyle: 'solid',
    padding: 2,
    backgroundColor: '#FFFFFF',
  },

  qrCode: {
    width: '100%',
    height: '100%',
  },

  // ========== SECTION HEADERS ==========
  sectionHeader: {
    backgroundColor: '#EFF6FF',
    paddingVertical: 4,
    paddingHorizontal: 6,
    marginTop: 5,
    marginBottom: 3,
    borderLeftWidth: 3,
    borderLeftColor: '#2563EB',
    borderLeftStyle: 'solid',
    borderRadius: 2,
  },

  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1E40AF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // ========== BASIC INFO GRID ==========
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 4,
  },

  infoRow: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 2,
  },

  infoField: {
    flexDirection: 'row',
    flex: 1,
    paddingRight: 6,
  },

  infoFieldHalf: {
    width: '50%',
    flexDirection: 'row',
    paddingRight: 6,
    marginBottom: 2,
  },

  infoFieldThird: {
    width: '33.33%',
    flexDirection: 'row',
    paddingRight: 6,
    marginBottom: 2,
  },

  fieldLabel: {
    fontSize: 7.5,
    color: '#6B7280',
    fontWeight: 'bold',
    minWidth: 75,
    paddingRight: 3,
  },

  fieldValue: {
    fontSize: 8.5,
    color: '#111827',
    flex: 1,
  },

  // ========== 3-COLUMN TABLE ==========
  table: {
    width: '100%',
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderStyle: 'solid',
  },

  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#1E40AF',
    paddingVertical: 4,
    paddingHorizontal: 4,
  },

  tableHeaderText: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },

  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E7EB',
    borderBottomStyle: 'solid',
    paddingVertical: 2.5,
    paddingHorizontal: 4,
    minHeight: 18,
  },

  tableRowAlt: {
    backgroundColor: '#F9FAFB',
  },

  tableCell: {
    fontSize: 7.5,
    color: '#374151',
    paddingRight: 3,
    lineHeight: 1.3,
  },

  tableCellVariable: {
    width: '30%',
    fontWeight: 'bold',
    color: '#1F2937',
  },

  tableCellActual: {
    width: '35%',
  },

  tableCellRange: {
    width: '35%',
  },

  // ========== RESULTS SECTION ==========
  resultsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 4,
    marginTop: 2,
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 2,
  },

  checkbox: {
    width: 9,
    height: 9,
    borderWidth: 1,
    borderColor: '#9CA3AF',
    borderStyle: 'solid',
    marginRight: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  checkboxChecked: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },

  checkmark: {
    fontSize: 6,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  checkboxLabel: {
    fontSize: 7.5,
    color: '#374151',
  },

  testResultsTable: {
    marginTop: 3,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderStyle: 'solid',
  },

  testResultRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E7EB',
    borderBottomStyle: 'solid',
    paddingVertical: 2,
    paddingHorizontal: 3,
  },

  testResultCell: {
    width: '50%',
    fontSize: 7.5,
    color: '#374151',
    paddingRight: 3,
  },

  // ========== CERTIFICATION BLOCK ==========
  certificationBlock: {
    marginTop: 5,
    padding: 6,
    backgroundColor: '#F9FAFB',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderStyle: 'solid',
  },

  certificationStatement: {
    fontSize: 7.5,
    color: '#374151',
    lineHeight: 1.4,
    marginBottom: 5,
    fontStyle: 'italic',
    textAlign: 'justify',
  },

  certificationRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },

  certificationField: {
    flex: 1,
    paddingRight: 6,
  },

  certificationLabel: {
    fontSize: 7,
    color: '#6B7280',
    fontWeight: 'bold',
    marginBottom: 1.5,
  },

  certificationValue: {
    fontSize: 8,
    color: '#111827',
    borderBottomWidth: 1,
    borderBottomColor: '#D1D5DB',
    borderBottomStyle: 'solid',
    paddingBottom: 1.5,
    minHeight: 12,
  },

  // ========== CONTINUITY TABLE ==========
  continuityTable: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderStyle: 'solid',
  },

  continuityHeader: {
    flexDirection: 'row',
    backgroundColor: '#1E40AF',
    paddingVertical: 4,
    paddingHorizontal: 3,
  },

  continuityHeaderText: {
    fontSize: 7,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },

  continuityRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E7EB',
    borderBottomStyle: 'solid',
    paddingVertical: 3,
    paddingHorizontal: 3,
    minHeight: 30,
  },

  continuityCell: {
    fontSize: 7.5,
    color: '#374151',
    paddingRight: 2,
  },

  signatureImage: {
    width: 35,
    height: 20,
    objectFit: 'contain',
  },

  // ========== FOOTER ==========
  footer: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    borderTopStyle: 'solid',
  },

  footerText: {
    fontSize: 7,
    color: '#6B7280',
  },

  pageNumber: {
    fontSize: 7,
    color: '#6B7280',
  },

  // ========== UTILITIES ==========
  divider: {
    height: 0.5,
    backgroundColor: '#E5E7EB',
    marginVertical: 4,
  },

  spacer: {
    height: 3,
  },

  smallSpacer: {
    height: 2,
  },

  bold: {
    fontWeight: 'bold',
  },

  italic: {
    fontStyle: 'italic',
  },

  uppercase: {
    textTransform: 'uppercase',
  },

  textCenter: {
    textAlign: 'center',
  },

  textRight: {
    textAlign: 'right',
  },

  // ========== RESPONSIVE HELPERS ==========
  row: {
    flexDirection: 'row',
  },

  column: {
    flexDirection: 'column',
  },

  flex1: {
    flex: 1,
  },
})