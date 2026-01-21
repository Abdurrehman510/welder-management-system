// src/pages/VerifyCertificatePage.jsx
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { CreditCard, Download, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'
import { pdf } from '@react-pdf/renderer'
import welderService from '../services/welderService'
import wpqService from '../services/wpqService'
import continuityService from '../services/continuityService'
import pdfService from '../services/pdfService'
import CertificatePDF from '../components/pdf/CertificatePDF'

/**
 * VerifyCertificatePage - QR Code Handler
 * When Form1 QR is scanned → Generate Certificate PDF
 */

export default function VerifyCertificatePage() {
  const { certificateNo } = useParams()
  const navigate = useNavigate()
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [welderData, setWelderData] = useState(null)
  const [generating, setGenerating] = useState(false)

  useEffect(() => {
    fetchWelderData()
  }, [certificateNo])

  /**
   * Fetch welder data by certificate number
   */
  const fetchWelderData = async () => {
    setLoading(true)
    setError(null)

    try {
      console.log('🔍 Fetching welder data for certificate:', certificateNo)

      // Search for welder by certificate number
      const { data: searchResults, error: searchError } = await welderService.searchWelders(certificateNo)
      
      if (searchError) throw new Error(searchError)
      if (!searchResults || searchResults.length === 0) {
        throw new Error('Certificate not found')
      }

      const welder = searchResults[0]

      // Fetch complete data
      const { data: welderDetails, error: welderError } = await welderService.getWelderById(welder.id)
      if (welderError) throw new Error(welderError)

      const { data: wpqData, error: wpqError } = await wpqService.getWPQRecordByWelderId(welder.id)
      const { data: continuityData } = await continuityService.getContinuityRecordsByWelderId(welder.id)

      setWelderData({
        welder: welderDetails,
        wpq_records: wpqData ? [wpqData] : [],
        continuity_records: continuityData || []
      })

      // Auto-generate PDF
      await generateCertificatePDF({
        welder: welderDetails,
        wpq_records: wpqData ? [wpqData] : [],
        continuity_records: continuityData || []
      })

    } catch (err) {
      console.error('❌ Verification error:', err)
      setError(err.message || 'Failed to verify certificate')
      toast.error('Verification Failed', {
        description: err.message,
        duration: 5000,
      })
    } finally {
      setLoading(false)
    }
  }

  /**
   * Generate Certificate PDF
   */
  const generateCertificatePDF = async (data) => {
    setGenerating(true)

    try {
      console.log('🎴 Generating Certificate PDF...')

      const certificateData = await pdfService.prepareCertificateData(data)
      const blob = await pdf(<CertificatePDF data={certificateData} />).toBlob()

      const filename = pdfService.generateFilename(
        'certificate',
        data.welder.certificate_no,
        data.welder.welder_name
      )

      pdfService.downloadPDF(blob, filename)

      toast.success('Certificate Generated Successfully', {
        description: `Downloaded: ${filename}`,
        duration: 4000,
      })
    } catch (err) {
      console.error('❌ PDF generation error:', err)
      toast.error('PDF Generation Failed', {
        description: err.message,
        duration: 5000,
      })
    } finally {
      setGenerating(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-100 flex items-center justify-center p-8">
        <Card className="p-12 max-w-md w-full text-center">
          <LoadingSpinner size="lg" text="Verifying certificate..." />
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-100 flex items-center justify-center p-8">
        <Card className="p-12 max-w-md w-full text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h2>
            <p className="text-gray-600">{error}</p>
          </div>
          <Button onClick={() => navigate('/')} className="w-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go to Home
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <Card className="p-8">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10 text-purple-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Certificate Verified</h1>
            <p className="text-gray-600">ID Card has been generated automatically</p>
          </div>

          {/* Welder Info */}
          {welderData && (
            <div className="bg-purple-50 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4">Welder Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Name:</span>
                  <p className="font-semibold text-gray-900">{welderData.welder.welder_name}</p>
                </div>
                <div>
                  <span className="text-gray-600">Certificate No:</span>
                  <p className="font-semibold text-gray-900">{welderData.welder.certificate_no}</p>
                </div>
                <div>
                  <span className="text-gray-600">Iqama/Passport:</span>
                  <p className="font-semibold text-gray-900">{welderData.welder.iqama_passport_no}</p>
                </div>
                <div>
                  <span className="text-gray-600">Company:</span>
                  <p className="font-semibold text-gray-900">{welderData.welder.client_contractor}</p>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Button
              onClick={() => welderData && generateCertificatePDF(welderData)}
              disabled={generating}
              className="w-full gap-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
            >
              {generating ? (
                <>
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Download Certificate Again
                </>
              )}
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="w-full gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Go to Home
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}