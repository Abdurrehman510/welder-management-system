import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { User, AlertCircle, Loader2 } from 'lucide-react'
import ActionButtons from './ActionButtons'
import ConfirmDeleteDialog from './ConfirmDeleteDialog'
import welderService from '../../services/welderService'
import { toast } from 'sonner'

/**
 * DetailedReportTable Component
 * ✅ ENHANCED: Production-grade UI with smooth animations
 * ✅ FIXED: Fully responsive mobile layout
 * ✅ IMPROVED: Professional data display
 */

export default function DetailedReportTable({ records, loading, onRefresh }) {
  const navigate = useNavigate()
  const [deleteDialog, setDeleteDialog] = useState({ open: false, record: null })
  const [actionLoading, setActionLoading] = useState(null)

  /**
   * Handle Update action
   */
  const handleUpdate = (record) => {
    navigate(`/update-form1/${record.welder.id}`)
  }

  /**
   * Handle Certificate generation
   */
  const handleCertificate = async (record) => {
    setActionLoading(`certificate-${record.id}`)
    
    try {
      // TODO: Implement PDF generation in Phase 6
      toast.info('Certificate Generation', {
        description: 'PDF generation will be implemented in Phase 6',
        duration: 3000,
      })
    } catch (error) {
      console.error('Certificate generation error:', error)
      toast.error('Failed to generate certificate', {
        description: error.message,
      })
    } finally {
      setActionLoading(null)
    }
  }

  /**
   * Handle Delete confirmation
   */
  const handleDeleteClick = (record) => {
    setDeleteDialog({ open: true, record })
  }

  /**
   * Confirm delete action
   */
  const confirmDelete = async () => {
    if (!deleteDialog.record) return

    setActionLoading(`delete-${deleteDialog.record.id}`)

    try {
      const { error } = await welderService.deleteWelder(deleteDialog.record.welder.id)

      if (error) {
        throw new Error(error)
      }

      toast.success('Record Deleted', {
        description: `Successfully deleted record for ${deleteDialog.record.welder.welder_name}`,
        duration: 4000,
      })

      // Close dialog
      setDeleteDialog({ open: false, record: null })

      // Refresh table
      if (onRefresh) {
        onRefresh()
      }
    } catch (error) {
      console.error('Delete error:', error)
      toast.error('Delete Failed', {
        description: error.message || 'Unable to delete the record',
        duration: 5000,
      })
    } finally {
      setActionLoading(null)
    }
  }

  /**
   * Get initials from name
   */
  const getInitials = (name) => {
    if (!name) return 'U'
    const parts = name.trim().split(' ')
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  // Loading skeleton
  if (loading) {
    return (
      <Card className="overflow-hidden shadow-lg border-gray-200">
        <div className="p-8 space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div 
              key={index} 
              className="flex items-center gap-4 animate-pulse"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 bg-gray-200 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-gray-200 rounded w-1/3" />
                <div className="h-4 bg-gray-200 rounded w-1/4" />
              </div>
              <div className="flex gap-2">
                <div className="w-20 h-9 bg-gray-200 rounded" />
                <div className="w-20 h-9 bg-gray-200 rounded" />
                <div className="w-20 h-9 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    )
  }

  // Empty state
  if (records.length === 0) {
    return (
      <Card className="overflow-hidden shadow-lg border-gray-200">
        <div className="flex flex-col items-center justify-center p-16 text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
            <AlertCircle className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            No Records Found
          </h3>
          <p className="text-gray-600 max-w-md leading-relaxed">
            No welder records match your search criteria. Try adjusting your filters or create a new record.
          </p>
        </div>
      </Card>
    )
  }

  return (
    <>
      {/* ✅ Desktop Table View */}
      <Card className="hidden lg:block overflow-hidden shadow-lg border-gray-200">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border-b-2 border-blue-200">
                <TableHead className="font-bold text-gray-900 w-[60px]">#</TableHead>
                <TableHead className="font-bold text-gray-900 min-w-[220px]">
                  Welder Name
                </TableHead>
                <TableHead className="font-bold text-gray-900 min-w-[180px]">
                  Client/Contractor
                </TableHead>
                <TableHead className="font-bold text-gray-900 min-w-[150px]">
                  Certificate No
                </TableHead>
                <TableHead className="font-bold text-gray-900 text-center min-w-[300px]">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map((record, index) => (
                <TableRow
                  key={record.id}
                  className="hover:bg-blue-50/70 transition-all duration-200 border-b border-gray-100 animate-fadeIn"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Row Number */}
                  <TableCell className="font-semibold text-gray-600">
                    {index + 1}
                  </TableCell>

                  {/* Welder Name with Avatar */}
                  <TableCell>
                    <div className="flex items-center gap-3 group">
                      <Avatar className="w-11 h-11 border-2 border-gray-200 shadow-md transition-transform duration-300 group-hover:scale-110">
                        <AvatarImage
                          src={record.welder.photo_url}
                          alt={record.welder.welder_name}
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-sm">
                          {getInitials(record.welder.welder_name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="font-bold text-gray-900 leading-tight truncate">
                          {record.welder.welder_name}
                        </p>
                        {record.welder.welder_name_short && (
                          <p className="text-xs text-gray-500 mt-0.5 truncate">
                            {record.welder.welder_name_short}
                          </p>
                        )}
                      </div>
                    </div>
                  </TableCell>

                  {/* Client/Contractor */}
                  <TableCell>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 truncate">
                        {record.welder.client_contractor || 'N/A'}
                      </p>
                      {record.welder.client_name_short && (
                        <p className="text-xs text-gray-500 mt-0.5">
                          ({record.welder.client_name_short})
                        </p>
                      )}
                    </div>
                  </TableCell>

                  {/* Certificate Number */}
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className="font-mono text-sm border-blue-400 text-blue-700 bg-blue-50 px-3 py-1 shadow-sm hover:shadow-md transition-shadow"
                    >
                      {record.welder.certificate_no}
                    </Badge>
                  </TableCell>

                  {/* Actions */}
                  <TableCell>
                    <ActionButtons
                      onUpdate={() => handleUpdate(record)}
                      onCertificate={() => handleCertificate(record)}
                      onDelete={() => handleDeleteClick(record)}
                      loading={actionLoading !== null}
                      loadingAction={
                        actionLoading === `update-${record.id}`
                          ? 'update'
                          : actionLoading === `certificate-${record.id}`
                          ? 'certificate'
                          : actionLoading === `delete-${record.id}`
                          ? 'delete'
                          : null
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* ✅ Mobile Card View (New!) */}
      <div className="lg:hidden space-y-4">
        {records.map((record, index) => (
          <Card 
            key={record.id} 
            className="p-5 shadow-lg hover:shadow-xl transition-all duration-300 border-gray-200 animate-fadeIn"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Header: Avatar + Name */}
            <div className="flex items-start gap-4 mb-4 pb-4 border-b border-gray-100">
              <Avatar className="w-14 h-14 border-2 border-blue-200 shadow-md flex-shrink-0">
                <AvatarImage
                  src={record.welder.photo_url}
                  alt={record.welder.welder_name}
                  className="object-cover"
                />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold">
                  {getInitials(record.welder.welder_name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg text-gray-900 leading-tight truncate">
                  {record.welder.welder_name}
                </h3>
                {record.welder.welder_name_short && (
                  <p className="text-sm text-gray-500 mt-1">
                    {record.welder.welder_name_short}
                  </p>
                )}
                <Badge 
                  variant="outline" 
                  className="mt-2 font-mono text-xs border-blue-400 text-blue-700 bg-blue-50"
                >
                  {record.welder.certificate_no}
                </Badge>
              </div>
            </div>

            {/* Info Grid */}
            <div className="space-y-3 mb-4">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  Client/Contractor
                </p>
                <p className="font-semibold text-gray-900">
                  {record.welder.client_contractor || 'N/A'}
                  {record.welder.client_name_short && (
                    <span className="text-sm text-gray-500 ml-2">
                      ({record.welder.client_name_short})
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              <ActionButtons
                onUpdate={() => handleUpdate(record)}
                onCertificate={() => handleCertificate(record)}
                onDelete={() => handleDeleteClick(record)}
                loading={actionLoading !== null}
                loadingAction={
                  actionLoading === `update-${record.id}`
                    ? 'update'
                    : actionLoading === `certificate-${record.id}`
                    ? 'certificate'
                    : actionLoading === `delete-${record.id}`
                    ? 'delete'
                    : null
                }
                compact={false}
              />
            </div>
          </Card>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDeleteDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open, record: null })}
        onConfirm={confirmDelete}
        welderName={deleteDialog.record?.welder?.welder_name}
        certificateNo={deleteDialog.record?.welder?.certificate_no}
        loading={actionLoading?.startsWith('delete')}
      />
    </>
  )
}