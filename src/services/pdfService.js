import QRCode from 'qrcode'
import { 
  transformForm1Data, 
  transformForm2Data, 
  transformCertificateData,
  validatePDFData,
  generateQRVerificationURL
} from '../utils/pdfHelpers'

/**
 * PDF Service
 * Updated: QR code now links to certificate verification
 */

class PDFService {
  /**
   * Generate QR code as data URL with verification link
   * @param {string} certificateNo - Certificate number
   * @param {string} welderName - Welder name
   * @returns {Promise<string>} QR code data URL
   */
  async generateQRCode(certificateNo, welderName) {
    try {
      // Generate verification URL
      const verificationUrl = generateQRVerificationURL(certificateNo, welderName)
      
      // Generate QR code from URL
      const qrCodeDataURL = await QRCode.toDataURL(verificationUrl, {
        width: 200,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        },
        errorCorrectionLevel: 'H'
      })

      return qrCodeDataURL
    } catch (error) {
      console.error('QR code generation error:', error)
      return null
    }
  }

  /**
   * Prepare Form1 PDF data
   * @param {Object} welderData - Welder record with WPQ and continuity
   * @returns {Promise<Object>} Prepared data with QR code
   */
  async prepareForm1Data(welderData) {
    try {
      // Transform data
      const transformed = transformForm1Data(welderData)

      // Validate
      const validation = validatePDFData(transformed, 'form1')
      if (!validation.valid) {
        throw new Error(`Validation failed: ${validation.errors.join(', ')}`)
      }

      // Generate QR code
      const qrCode = await this.generateQRCode(
        transformed.certificateNo,
        transformed.welderName
      )

      return {
        ...transformed,
        qrCode
      }
    } catch (error) {
      console.error('Form1 data preparation error:', error)
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
      // Transform data
      const transformed = transformForm2Data(welderData)

      // Validate
      const validation = validatePDFData(transformed, 'form2')
      if (!validation.valid) {
        throw new Error(`Validation failed: ${validation.errors.join(', ')}`)
      }

      // Generate QR code
      const qrCode = await this.generateQRCode(
        transformed.certificateNo,
        transformed.welderName
      )

      return {
        ...transformed,
        qrCode
      }
    } catch (error) {
      console.error('Form2 data preparation error:', error)
      throw error
    }
  }

  /**
   * Prepare Certificate PDF data
   * @param {Object} welderData - Welder record with WPQ
   * @returns {Promise<Object>} Prepared data with QR code
   */
  async prepareCertificateData(welderData) {
    try {
      // Transform data
      const transformed = transformCertificateData(welderData)

      // Validate
      const validation = validatePDFData(transformed, 'certificate')
      if (!validation.valid) {
        throw new Error(`Validation failed: ${validation.errors.join(', ')}`)
      }

      // Generate QR code
      const qrCode = await this.generateQRCode(
        transformed.certificateNo,
        transformed.welderName
      )

      return {
        ...transformed,
        qrCode
      }
    } catch (error) {
      console.error('Certificate data preparation error:', error)
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
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('PDF download error:', error)
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
    const safeName = welderName.replace(/[^a-zA-Z0-9]/g, '_')
    const safeCertNo = certificateNo.replace(/[^a-zA-Z0-9-]/g, '_')

    const typeMap = {
      form1: 'WPQ_Certificate',
      form2: 'Continuity_Record',
      certificate: 'ID_Card'
    }

    const prefix = typeMap[type] || 'Document'

    return `${prefix}_${safeCertNo}_${safeName}_${timestamp}.pdf`
  }
}

export default new PDFService()