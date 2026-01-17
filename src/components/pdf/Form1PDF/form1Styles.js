import { StyleSheet } from '@react-pdf/renderer'

/**
 * Form1 PDF Styles - PROFESSIONAL ENHANCEMENT
 * Industry-standard design with modern aesthetics
 * Enhanced checkboxes, radio buttons, and visual hierarchy
 */

export const form1Styles = StyleSheet.create({
  // ========== PAGE & DOCUMENT ==========
  page: {
    padding: 12,
    paddingTop: 14,
    paddingBottom: 18,
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
    paddingBottom: 5,
    borderBottomWidth: 2.5,
    borderBottomColor: '#1E40AF',
    borderBottomStyle: 'solid',
  },

  companyInfo: {
    flex: 1,
    paddingRight: 8,
  },

  companyName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E40AF',
    marginBottom: 3,
    letterSpacing: 0.4,
    lineHeight: 1.2,
  },

  companyDetails: {
    fontSize: 7.5,
    color: '#4B5563',
    lineHeight: 1.3,
    marginBottom: 0.5,
  },

  logoContainer: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 4,
    overflow: 'hidden',
  },

  logo: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },

  photoContainer: {
    width: 70,
    height: 85,
    borderWidth: 2,
    borderColor: '#3B82F6',
    borderStyle: 'solid',
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#F9FAFB',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },

  photo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  qrContainer: {
    width: 60,
    height: 60,
    marginLeft: 10,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    borderStyle: 'solid',
    padding: 3,
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
  },

  qrCode: {
    width: '100%',
    height: '100%',
  },

  // ========== SECTION HEADERS ==========
  sectionHeader: {
    backgroundColor: '#EFF6FF',
    paddingVertical: 3,
    paddingHorizontal: 6,
    marginTop: 4,
    marginBottom: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#2563EB',
    borderLeftStyle: 'solid',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#DBEAFE',
    borderStyle: 'solid',
  },

  sectionTitle: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#1E40AF',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    lineHeight: 1.2,
  },

  sectionSubtitle: {
    fontSize: 8.5,
    color: '#4B5563',
    fontWeight: 'bold',
    marginTop: 2,
    letterSpacing: 0.2,
  },

  // ========== INFO CONTAINERS ==========
  infoContainer: {
    marginBottom: 3,
    padding: 5,
    backgroundColor: '#F9FAFB',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderStyle: 'solid',
  },

  infoBox: {
    padding: 5,
    backgroundColor: '#F8FAFC',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderStyle: 'solid',
  },

  infoFieldContainer: {
    marginBottom: 6,
  },

  fieldValueContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#CBD5E1',
    borderBottomStyle: 'dotted',
    paddingBottom: 2,
    marginTop: 2,
  },

  // ========== BASIC INFO GRID ==========
  infoGrid: {
    flexDirection: 'column',
    marginBottom: 4,
  },

  infoRow: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 3,
  },

  infoField: {
    flexDirection: 'column',
    flex: 1,
    paddingRight: 8,
  },

  infoFieldHalf: {
    width: '50%',
    flexDirection: 'column',
    paddingRight: 8,
  },

  infoFieldThird: {
    width: '33.33%',
    flexDirection: 'column',
    paddingRight: 8,
  },

  fieldLabel: {
    fontSize: 7.5,
    color: '#6B7280',
    fontWeight: 'bold',
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },

  fieldValue: {
    fontSize: 9,
    color: '#111827',
    fontWeight: 'normal',
    paddingTop: 1,
  },

  importantLabel: {
    color: '#1E40AF',
    fontSize: 8,
  },

  importantValue: {
    fontWeight: 'bold',
    color: '#1E40AF',
    fontSize: 9.5,
  },

  valueBox: {
    borderBottomWidth: 1,
    borderBottomColor: '#CBD5E1',
    borderBottomStyle: 'solid',
    paddingBottom: 2,
    paddingTop: 1,
    minHeight: 14,
  },

  // ========== NOTES ==========
  notesContainer: {
    backgroundColor: '#FEF3C7',
    padding: 4,
    borderRadius: 2,
    borderLeftWidth: 3,
    borderLeftColor: '#F59E0B',
    borderLeftStyle: 'solid',
    marginTop: 3,
  },

  notesTitle: {
    fontSize: 7,
    fontWeight: 'bold',
    color: '#92400E',
    marginBottom: 1.5,
    textTransform: 'uppercase',
  },

  notesText: {
    fontSize: 7,
    color: '#78350F',
    lineHeight: 1.3,
    fontStyle: 'italic',
  },

  // ========== TABLES ==========
  table: {
    width: '100%',
    marginBottom: 3,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    borderStyle: 'solid',
    borderRadius: 4,
    overflow: 'hidden',
  },

  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#1E40AF',
    paddingVertical: 4,
    paddingHorizontal: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#1E3A8A',
    borderBottomStyle: 'solid',
  },

  tableHeaderText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },

  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    borderBottomStyle: 'solid',
    paddingVertical: 3,
    paddingHorizontal: 5,
    minHeight: 18,
  },

  tableRowAlt: {
    backgroundColor: '#F9FAFB',
  },

  tableCell: {
    fontSize: 8,
    color: '#374151',
    paddingRight: 4,
    lineHeight: 1.4,
  },

  tableCellVariable: {
    width: '30%',
    fontWeight: 'bold',
    color: '#1F2937',
  },

  tableCellActual: {
    width: '35%',
    color: '#374151',
  },

  tableCellRange: {
    width: '35%',
    color: '#6B7280',
  },

  // ========== CHECKBOX SYSTEM (PROFESSIONAL) ==========
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 3,
    paddingRight: 6,
  },

  checkboxBox: {
    width: 11,
    height: 11,
    borderWidth: 1.5,
    borderColor: '#9CA3AF',
    borderStyle: 'solid',
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },

  checkboxBoxChecked: {
    backgroundColor: '#2563EB',
    borderColor: '#1E40AF',
    borderWidth: 2,
  },

  checkmark: {
    fontSize: 8,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  checkboxLabel: {
    fontSize: 8,
    color: '#374151',
    fontWeight: 'normal',
  },

  // ========== RADIO BUTTON SYSTEM (PROFESSIONAL) ==========
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },

  radioOuter: {
    width: 11,
    height: 11,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#9CA3AF',
    borderStyle: 'solid',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },

  radioOuterSelected: {
    borderColor: '#2563EB',
    borderWidth: 2,
    backgroundColor: '#EFF6FF',
  },

  radioInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2563EB',
  },

  radioLabel: {
    fontSize: 8,
    color: '#374151',
    fontWeight: 'normal',
  },

  radioLabelSelected: {
    fontWeight: 'bold',
    color: '#1E40AF',
  },

  // ========== RESULTS SECTION ==========
  resultsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 3,
    marginTop: 2,
  },

  statusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
    fontSize: 7,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },

  statusPass: {
    backgroundColor: '#D1FAE5',
    color: '#065F46',
    borderWidth: 1,
    borderColor: '#10B981',
    borderStyle: 'solid',
  },

  statusFail: {
    backgroundColor: '#FEE2E2',
    color: '#991B1B',
    borderWidth: 1,
    borderColor: '#EF4444',
    borderStyle: 'solid',
  },

  statusPending: {
    backgroundColor: '#FEF3C7',
    color: '#92400E',
    borderWidth: 1,
    borderColor: '#F59E0B',
    borderStyle: 'solid',
  },

  testResultsTable: {
    marginTop: 2,
    marginBottom: 3,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    borderStyle: 'solid',
    borderRadius: 4,
    overflow: 'hidden',
  },

  testResultRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    borderBottomStyle: 'solid',
    paddingVertical: 3,
    paddingHorizontal: 5,
    alignItems: 'center',
  },

  testResultCell: {
    fontSize: 8,
    color: '#374151',
    paddingRight: 4,
  },

  // ========== CERTIFICATION BLOCK ==========
  certificationBlock: {
    marginTop: 4,
    padding: 6,
    backgroundColor: '#F8FAFC',
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    borderStyle: 'solid',
  },

  certificationStatement: {
    fontSize: 8,
    color: '#475569',
    lineHeight: 1.4,
    marginBottom: 6,
    fontStyle: 'italic',
    textAlign: 'justify',
    padding: 5,
    backgroundColor: '#FFFFFF',
    borderLeftWidth: 3,
    borderLeftColor: '#3B82F6',
    borderLeftStyle: 'solid',
    borderRadius: 2,
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
    fontSize: 7.5,
    color: '#64748B',
    fontWeight: 'bold',
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },

  certificationValue: {
    fontSize: 9,
    color: '#1E293B',
    borderBottomWidth: 1.5,
    borderBottomColor: '#94A3B8',
    borderBottomStyle: 'solid',
    paddingBottom: 2,
    minHeight: 14,
    fontWeight: 'normal',
  },

  // ========== CONTINUITY TABLE ==========
  continuityTable: {
    marginTop: 4,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    borderStyle: 'solid',
    borderRadius: 4,
    overflow: 'hidden',
  },

  continuityHeader: {
    flexDirection: 'row',
    backgroundColor: '#1E40AF',
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderBottomWidth: 2,
    borderBottomColor: '#1E3A8A',
    borderBottomStyle: 'solid',
  },

  continuityHeaderText: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },

  continuityRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    borderBottomStyle: 'solid',
    paddingVertical: 4,
    paddingHorizontal: 4,
    minHeight: 28,
    alignItems: 'center',
  },

  continuityCell: {
    fontSize: 7.5,
    color: '#374151',
    paddingRight: 3,
  },

  signatureImage: {
    width: 38,
    height: 22,
    objectFit: 'contain',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderStyle: 'solid',
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
  },

  // ========== FOOTER ==========
  footer: {
    position: 'absolute',
    bottom: 12,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 6,
    borderTopWidth: 1.5,
    borderTopColor: '#D1D5DB',
    borderTopStyle: 'solid',
  },

  footerText: {
    fontSize: 7,
    color: '#6B7280',
    fontStyle: 'italic',
  },

  pageNumber: {
    fontSize: 7,
    color: '#6B7280',
    fontWeight: 'bold',
  },

  // ========== UTILITIES ==========
  divider: {
    height: 1,
    backgroundColor: '#CBD5E1',
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