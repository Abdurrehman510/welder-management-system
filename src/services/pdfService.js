import QRCode from 'qrcode'
import { 
  transformForm1Data, 
  transformForm2Data, 
  transformCertificateData,
  validatePDFData,
  generateForm1QRCode,
  generateCertificateQRCode
} from '../utils/pdfHelpers'

/**
 * PDF Service - FIXED QR CODE LOGIC
 * ✅ Form1 PDF → QR points to Certificate
 * ✅ Certificate PDF → QR points to Form1
 */

class PDFService {
  /**
   * Generate QR code as data URL
   * @param {string} url - URL to encode in QR
   * @returns {Promise<string>} QR code data URL
   */
  async generateQRCodeFromURL(url) {
    try {
      console.log('🔍 Generating QR code for URL:', url);
      
      // Generate QR code from URL
      const qrCodeDataURL = await QRCode.toDataURL(url, {
        width: 180,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        },
        errorCorrectionLevel: 'H'
      })

      console.log('✅ QR code generated successfully');
      return qrCodeDataURL
    } catch (error) {
      console.error('❌ QR code generation error:', error)
      return null
    }
  }

  /**
   * Prepare Form1 PDF data
   * QR Code in Form1 → Points to Certificate verification page
   * @param {Object} welderData - Welder record with WPQ and continuity
   * @returns {Promise<Object>} Prepared data with QR code
   */
  async prepareForm1Data(welderData) {
    try {
      console.log('📄 Preparing Form1 data');
      
      // Transform data
      const transformed = transformForm1Data(welderData)

      // Validate
      const validation = validatePDFData(transformed, 'form1')
      if (!validation.valid) {
        throw new Error(`Validation failed: ${validation.errors.join(', ')}`)
      }

      // Generate QR code URL for Form1 → Should open Certificate
      const qrURL = generateForm1QRCode(transformed.certificateNo)
      const qrCode = await this.generateQRCodeFromURL(qrURL)

      console.log('✅ Form1 QR → Opens Certificate at:', qrURL)

      return {
        ...transformed,
        qrCode,
        logoUrl: '/iss-logo.png',
        watermarkUrl: '/iss_logo_fevicon.png'
      }
    } catch (error) {
      console.error('❌ Form1 data preparation error:', error)
      throw error
    }
  }

  /**
   * Prepare Form2 PDF data
   * @param {Object} welderData - Welder record with continuity
   * @returns {Promise<Object>} Prepared data with QR code
   */
  async prepareForm2Data(welderData) {
    try {
      console.log('📄 Preparing Form2 data');
      
      // Transform data
      const transformed = transformForm2Data(welderData)

      // Validate
      const validation = validatePDFData(transformed, 'form2')
      if (!validation.valid) {
        throw new Error(`Validation failed: ${validation.errors.join(', ')}`)
      }

      // Generate QR code for Form2
      const qrURL = generateForm1QRCode(transformed.certificateNo)
      const qrCode = await this.generateQRCodeFromURL(qrURL)

      return {
        ...transformed,
        qrCode,
        logoUrl: '/iss-logo.png',
        watermarkUrl: '/iss_logo_fevicon.png'
      }
    } catch (error) {
      console.error('❌ Form2 data preparation error:', error)
      throw error
    }
  }

  /**
   * Prepare Certificate PDF data
   * QR Code in Certificate → Points to Form1 verification page
   * @param {Object} welderData - Welder record with WPQ
   * @returns {Promise<Object>} Prepared data with QR code and logos
   */
  async prepareCertificateData(welderData) {
    try {
      console.log('🎴 Preparing Certificate data');
      
      // Transform data
      const transformed = transformCertificateData(welderData)
      
      if (!transformed) {
        throw new Error('Failed to transform certificate data')
      }

      // Validate
      const validation = validatePDFData(transformed, 'certificate')
      if (!validation.valid) {
        console.warn('⚠️ Validation warnings:', validation.errors);
        // Continue despite validation warnings for optional fields
      }

      // Generate QR code URL for Certificate → Should open Form1
      const qrURL = generateCertificateQRCode(transformed.certificateNo)
      const qrCode = await this.generateQRCodeFromURL(qrURL)

      console.log('✅ Certificate QR → Opens Form1 at:', qrURL)
      console.log('✅ Certificate data prepared successfully:', {
        welderName: transformed.welderName,
        certificateNo: transformed.certificateNo,
        hasQRCode: !!qrCode,
        qualCount: transformed.qualifications?.length
      });

      return {
        ...transformed,
        qrCode,
        logoUrl: '/iss-logo.png',
        watermarkUrl: '/iss_logo_fevicon.png'
      }
    } catch (error) {
      console.error('❌ Certificate data preparation error:', error)
      throw error
    }
  }

  /**
   * Download PDF blob
   * @param {Blob} blob - PDF blob
   * @param {string} filename - File name
   */
  downloadPDF(blob, filename) {
    try {
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      }, 100)
    } catch (error) {
      console.error('❌ PDF download error:', error)
      throw error
    }
  }

  /**
   * Generate filename for PDF
   * @param {string} type - PDF type ('form1', 'form2', 'certificate')
   * @param {string} certificateNo - Certificate number
   * @param {string} welderName - Welder name
   * @returns {string} Filename
   */
  generateFilename(type, certificateNo, welderName) {
    const timestamp = new Date().toISOString().split('T')[0]
    const safeName = welderName?.replace(/[^a-zA-Z0-9]/g, '_') || 'Unknown'
    const safeCertNo = certificateNo?.replace(/[^a-zA-Z0-9-]/g, '_') || 'NoCert'

    const typeMap = {
      form1: 'WPQ_Certificate',
      form2: 'Continuity_Record',
      certificate: 'ID_Card'
    }

    const prefix = typeMap[type] || 'Document'

    return `${prefix}_${safeCertNo}_${safeName}_${timestamp}.pdf`
  }

  /**
   * Generate PDF using ReactPDF renderer
   * @param {React.Component} PDFComponent - React PDF component
   * @param {Object} data - PDF data
   * @returns {Promise<Blob>} PDF blob
   */
  async generatePDF(PDFComponent, data) {
    try {
      const { pdf } = await import('@react-pdf/renderer');
      const blob = await pdf(PDFComponent(data)).toBlob();
      return blob;
    } catch (error) {
      console.error('❌ PDF generation error:', error);
      throw error;
    }
  }
}

export default new PDFService()