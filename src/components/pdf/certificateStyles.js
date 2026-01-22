// src/components/pdf/certificateStyles.js
import { StyleSheet } from '@react-pdf/renderer';

/**
 * 🎨 CERTIFICATE STYLES
 * Optimized for 242.65mm x 153mm (CR80 credit card size)
 * All measurements in points (pt)
 */

export const styles = StyleSheet.create({
  // ==================== PAGE CONTAINER ====================
  
  page: {
    width: 242.65,
    height: 153,
    padding: 0,
    backgroundColor: '#FFFFFF',
    position: 'relative',
    overflow: 'hidden',
  },
  
  // ==================== WATERMARK ====================
  watermarkLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  
  backgroundWatermark: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    opacity: 0.03,
    zIndex:-1,
  },
  
  // ==================== FRONT PAGE ====================
  frontPage: {
    width: '100%',
    height: '100%',
    border: '1.5pt solid #000000',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    zIndex: 1,
    backgroundColor: '#FFFFFF',
  },
  
  // ==================== HEADER ====================
  headerSection: {
    padding: '3pt 4pt 2pt 4pt',
    display: 'flex',
    flexDirection: 'column',
    gap: 1.5,
    position: 'relative',
    zIndex: 1,
    borderBottom: '0.8pt solid #000000',
  },
  
  cardNumberRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  cardNumber: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: 0.2,
    fontFamily: 'Helvetica-Bold',
  },
  
  logoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  
    headerLogo: {
    width: 80,   // increased
    height: 34,  // increased
    objectFit: 'contain',
    },

  
  companyInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 0.3,
  },
  
  companyAddress: {
    fontSize: 3.2,
    color: '#000000',
    textAlign: 'right',
    lineHeight: 1.1,
    fontFamily: 'Helvetica',
  },
  
  // ==================== MAIN CONTENT ====================
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    padding: '3.5pt 4pt 2.5pt 4pt',
    gap: 3,
  },
  
  // ==================== LEFT SECTION ====================
  leftSection: {
    width: '32%',
    display: 'flex',
    flexDirection: 'column',
    gap: 2.5,
    alignItems: 'center',
  },
  
  welderPhotoContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  
  welderPhoto: {
    width: '90%',
    height: 46,
    border: '0.6pt solid #000000',
    objectFit: 'cover',
    backgroundColor: '#F5F5F5',
  },
  
  inspectorSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 1.2,
    marginTop: 1,
  },
  
  inspectorLabel: {
    fontSize: 4.4,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    lineHeight: 1.1,
    fontFamily: 'Helvetica-Bold',
  },
  
  inspectorName: {
    fontSize: 5,
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 0.3,
  },
  
  cswipCert: {
    fontSize: 3.8,
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'Helvetica',
    lineHeight: 1.1,
  },
  
  signatureImage: {
    width: 70,  
    height: 12,
    marginBottom: 0.6,
    objectFit: 'contain',
    },

  signatureLine: {
  width: 70,
  borderTop: '0.6pt solid #000000',
  marginTop: 0.8,
},


  // ==================== CENTER SECTION ====================
  centerSection: {
    width: '43%',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    paddingTop: 0.8,
  },
  
  certificationText: {
    fontSize: 4.25,
    textAlign: 'center',
    color: '#000000',
    lineHeight: 1.2,
    fontFamily: 'Helvetica',
    marginBottom: 1.2,
  },
  
  detailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  
  detailRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  
  detailLabel: {
    fontSize: 4.5,
    fontWeight: 'bold',
    color: '#000000',
    width: '38%',
    fontFamily: 'Helvetica-Bold',
  },
  
  detailColon: {
    fontSize: 3.8,
    color: '#000000',
    width: '5%',
    textAlign: 'center',
    fontFamily: 'Helvetica-Bold',
  },
  
  detailValue: {
    fontSize: 4.4,
    color: '#000000',
    width: '57%',
    lineHeight: 1.25,
    fontFamily: 'Helvetica',
  },
  
  // ==================== RIGHT SECTION ====================
  rightSection: {
    width: '25%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 0.8,
  },
  
  qrCodeContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 1.2,
  },
  
  qrCodeLabel: {
    fontSize: 3.2,
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'Helvetica',
    marginBottom: 0.3,
  },
  
  qrCode: {
    width: 35,
    height: 35,
    border: '0.6pt solid #000000',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  qrFallback: {
    fontSize: 2.8,
    color: '#666666',
    textAlign: 'center',
    fontFamily: 'Helvetica',
    padding: 1.2,
  },
  
  clientRepSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 0.8,
    marginBottom: 2.5,
  },
  
  clientRepLabel: {
    fontSize: 4.4,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    lineHeight: 1.4,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 0.8,
  },
  
  clientRepName: {
    fontSize: 4.8,
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    lineHeight: 1.2,
  },
  
  // ==================== BACK PAGE ====================
  backPage: {
    width: '100%',
    height: '100%',
    border: '1.5pt solid #000000',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    zIndex: 1,
    backgroundColor: '#FFFFFF',
  },
  
  backHeader: {
    backgroundColor: '#B3E5FC',
    padding: '2.5pt 4pt',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
    borderBottom: '0.8pt solid #000000',
  },
  
  backHeaderText: {
    fontSize: 4.5,
    fontWeight: 'bold',
    color: '#000000',
    fontFamily: 'Helvetica-Bold',
  },
  
  wpsSection: {
    backgroundColor: '#FFFFFF',
    padding: '2.5pt 4pt',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    zIndex: 1,
    borderBottom: '0.8pt solid #000000',
  },
  
  wpsText: {
    fontSize: 4.2,
    fontWeight: 'bold',
    color: '#000000',
    fontFamily: 'Helvetica-Bold',
  },
  
  wpsValue: {
    fontSize: 4.2,
    color: '#000000',
    fontFamily: 'Helvetica',
    fontWeight: 'normal',
  },
  
  // ==================== TABLE ====================
  tableHeader: {
    backgroundColor: '#FF8C00',
    padding: '2pt 2.5pt',
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    zIndex: 1,
    borderBottom: '0.8pt solid #000000',
  },
  
  tableHeaderCell: {
    fontSize: 3.6,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'left',
    lineHeight: 1.2,
    fontFamily: 'Helvetica-Bold',
  },
  
  tableCol1: {
    width: '32%',
  },
  
  tableCol2: {
    width: '34%',
    borderLeft: '0.6pt solid #FFFFFF',
    paddingLeft: 2,
  },
  
  tableCol3: {
    width: '34%',
    borderLeft: '0.6pt solid #FFFFFF',
    paddingLeft: 2,
  },
  
  tableRow: {
    display: 'flex',
    flexDirection: 'row',
    borderBottom: '0.4pt solid #D0D0D0',
    minHeight: 5.2,
    position: 'relative',
    zIndex: 1,
    backgroundColor: '#FFFFFF',
  },
  
  tableCell: {
    fontSize: 3,
    color: '#000000',
    padding: '1.2pt 2pt',
    lineHeight: 1.15,
    fontFamily: 'Helvetica',
    display: 'flex',
    alignItems: 'center',
  },
  
  tableCellBold: {
    fontSize: 3,
    fontWeight: 'bold',
    color: '#000000',
    padding: '1.2pt 2pt',
    lineHeight: 1.15,
    fontFamily: 'Helvetica-Bold',
    display: 'flex',
    alignItems: 'center',
  },
  
  // ==================== FOOTER ====================
  footerSection: {
    backgroundColor: '#B3E5FC',
    padding: '2.5pt 4pt',
    marginTop: 'auto',
    position: 'relative',
    zIndex: 1,
    borderTop: '0.8pt solid #000000',
  },
  
  footerText: {
    fontSize: 3.2,
    color: '#000000',
    textAlign: 'justify',
    lineHeight: 1.2,
    marginBottom: 1.5,
    fontFamily: 'Helvetica',
  },
  
  footerInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  footerFormNo: {
    fontSize: 3.2,
    color: '#000000',
    fontFamily: 'Helvetica',
  },
  
  footerDate: {
    fontSize: 3.2,
    color: '#000000',
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
  },
  
  // ==================== FALLBACK ====================
  fallbackText: {
    fontSize: 4,
    color: '#666666',
    textAlign: 'center',
    fontStyle: 'italic',
    fontFamily: 'Helvetica',
  },
});