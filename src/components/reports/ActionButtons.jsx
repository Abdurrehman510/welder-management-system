// src/components/reports/ActionButtons.jsx - UPDATED
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Edit, Trash2, FileText, Loader2, CreditCard } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { toast } from 'sonner'
import { pdf } from '@react-pdf/renderer'
import welderService from '../../services/welderService'
import wpqService from '../../services/wpqService'
import continuityService from '../../services/continuityService'
import pdfService from '../../services/pdfService'
import CertificatePDF from '../pdf/CertificatePDF'
import ConfirmDeleteDialog from './ConfirmDeleteDialog'

/**
 * ActionButtons Component - COMPLETE IMPLEMENTATION
 * ✅ Update, Delete, Certificate, Form1 PDF
 * ✅ Dynamic data fetching from Supabase
 * ✅ Professional UI with loading states
 */

export default function ActionButtons({
  record,
  onRefresh,
  loading: externalLoading = false,
  loadingAction: externalLoadingAction = null,
  compact = false,
}) {
  const navigate = useNavigate()
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [generatingPDF, setGeneratingPDF] = useState(null)

  const buttonSize = compact ? 'sm' : 'default'
  const iconSize = compact ? 'w-4 h-4' : 'w-4 h-4'

  // Determine loading state
  const loading = externalLoading || isDeleting || generatingPDF !== null
  const loadingAction = externalLoadingAction || 
    (isDeleting ? 'delete' : generatingPDF)

  /**
   * Handle Update - Navigate to update page
   */
  const handleUpdate = () => {
    navigate(`/update-form1/${record.welder.id}`)
  }

  /**
   * Handle Delete - Soft delete with confirmation
   */
  const handleDelete = async () => {
    setIsDeleting(true)

    try {
      const { error } = await welderService.deleteWelder(record.welder.id)

      if (error) {
        throw new Error(error)
      }

      toast.success('Record Deleted Successfully', {
        description: `${record.welder.welder_name}'s record has been removed`,
        duration: 3000,
      })

      setDeleteDialog(false)

      // Refresh the table
      if (onRefresh) {
        await onRefresh()
      }
    } catch (error) {
      console.error('Delete error:', error)
      toast.error('Delete Failed', {
        description: error.message || 'Unable to delete record',
        duration: 5000,
      })
    } finally {
      setIsDeleting(false)
    }
  }

  /**
   * Generate Certificate PDF (ID Card)
   */
  const handleGenerateCertificate = async () => {
    setGeneratingPDF('certificate')

    try {
      console.log('🎴 Generating Certificate PDF for:', record.welder.welder_name)

      // Fetch complete welder data
      const { data: welderData, error: welderError } = await welderService.getWelderById(record.welder.id)
      if (welderError) throw new Error(welderError)

      // Fetch WPQ record
      const { data: wpqData, error: wpqError } = await wpqService.getWPQRecordByWelderId(record.welder.id)
      if (wpqError && !wpqError.includes('no rows')) throw new Error(wpqError)

      // Fetch continuity records
      const { data: continuityData } = await continuityService.getContinuityRecordsByWelderId(record.welder.id)

      // Prepare certificate data
      const certificateData = await pdfService.prepareCertificateData({
        welder: welderData,
        wpq_records: wpqData ? [wpqData] : [],
        continuity_records: continuityData || []
      })

      console.log('📄 Certificate Data:', certificateData)

      // Generate PDF
      const blob = await pdf(<CertificatePDF data={certificateData} />).toBlob()

      // Download
      const filename = pdfService.generateFilename('certificate', record.welder.certificate_no, record.welder.welder_name)
      pdfService.downloadPDF(blob, filename)

      toast.success('Certificate Generated Successfully', {
        description: `Downloaded: ${filename}`,
        duration: 4000,
      })
    } catch (error) {
      console.error('❌ Certificate generation error:', error)
      toast.error('Certificate Generation Failed', {
        description: error.message || 'Unable to generate certificate',
        duration: 5000,
      })
    } finally {
      setGeneratingPDF(null)
    }
  }



  return (
    <>
      <TooltipProvider delayDuration={300}>
        <div className={`flex ${compact ? 'gap-1.5' : 'flex-col sm:flex-row gap-2'} items-stretch sm:items-center justify-center`}>
          
          {/* Update Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size={buttonSize}
                variant="outline"
                onClick={handleUpdate}
                disabled={loading}
                className={`
                  ${compact ? 'flex-1' : 'w-full sm:w-auto'}
                  border-blue-300 text-blue-700 
                  hover:bg-blue-50 hover:border-blue-500 hover:shadow-md 
                  active:scale-95
                  transition-all duration-200
                  disabled:opacity-50 disabled:cursor-not-allowed
                  group
                `}
              >
                {loadingAction === 'update' ? (
                  <Loader2 className={`${iconSize} animate-spin`} />
                ) : (
                  <Edit className={`${iconSize} group-hover:scale-110 transition-transform`} />
                )}
                {!compact && <span className="ml-2 font-medium">Update</span>}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" className="bg-gray-900 text-white">
              <p>Edit this record</p>
            </TooltipContent>
          </Tooltip>

          {/* Certificate Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size={buttonSize}
                variant="outline"
                onClick={handleGenerateCertificate}
                disabled={loading}
                className={`
                  ${compact ? 'flex-1' : 'w-full sm:w-auto'}
                  border-purple-300 text-purple-700 
                  hover:bg-purple-50 hover:border-purple-500 hover:shadow-md 
                  active:scale-95
                  transition-all duration-200
                  disabled:opacity-50 disabled:cursor-not-allowed
                  group
                `}
              >
                {loadingAction === 'certificate' ? (
                  <Loader2 className={`${iconSize} animate-spin`} />
                ) : (
                  <CreditCard className={`${iconSize} group-hover:scale-110 transition-transform`} />
                )}
                {!compact && <span className="ml-2 font-medium">Certificate</span>}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" className="bg-gray-900 text-white">
              <p>Generate ID Card PDF</p>
            </TooltipContent>
          </Tooltip>



          {/* Delete Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size={buttonSize}
                variant="outline"
                onClick={() => setDeleteDialog(true)}
                disabled={loading}
                className={`
                  ${compact ? 'flex-1' : 'w-full sm:w-auto'}
                  border-red-300 text-red-700 
                  hover:bg-red-50 hover:border-red-500 hover:shadow-md 
                  active:scale-95
                  transition-all duration-200
                  disabled:opacity-50 disabled:cursor-not-allowed
                  group
                `}
              >
                {loadingAction === 'delete' ? (
                  <Loader2 className={`${iconSize} animate-spin`} />
                ) : (
                  <Trash2 className={`${iconSize} group-hover:scale-110 transition-transform`} />
                )}
                {!compact && <span className="ml-2 font-medium">Delete</span>}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" className="bg-gray-900 text-white">
              <p>Delete this record</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>

      {/* Delete Confirmation Dialog */}
      <ConfirmDeleteDialog
        open={deleteDialog}
        onOpenChange={setDeleteDialog}
        onConfirm={handleDelete}
        welderName={record.welder.welder_name}
        certificateNo={record.welder.certificate_no}
        loading={isDeleting}
      />
    </>
  )
}

/**
 * CompactActionButtons - For mobile/small screens
 */
export function CompactActionButtons(props) {
  return <ActionButtons {...props} compact={true} />
}
