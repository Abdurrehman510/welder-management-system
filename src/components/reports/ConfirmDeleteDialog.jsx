import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { AlertTriangle } from 'lucide-react'

/**
 * ConfirmDeleteDialog Component
 * Professional confirmation dialog for delete operations
 */

export default function ConfirmDeleteDialog({
  open,
  onOpenChange,
  onConfirm,
  title = 'Delete Record',
  description,
  welderName,
  certificateNo,
  loading = false,
}) {
  const defaultDescription = welderName
    ? `Are you sure you want to delete the record for ${welderName} (Certificate: ${certificateNo})? This action cannot be undone.`
    : 'Are you sure you want to delete this record? This action cannot be undone.'

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <AlertDialogTitle className="text-xl">{title}</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-base text-gray-700 leading-relaxed pt-2">
            {description || defaultDescription}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Warning Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 my-4">
          <p className="text-sm text-amber-800 font-medium flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Warning: This action is permanent
          </p>
          <p className="text-xs text-amber-700 mt-1">
            The record will be marked as deleted and will no longer appear in searches or reports.
          </p>
        </div>

        <AlertDialogFooter className="gap-2 sm:gap-2">
          <AlertDialogCancel disabled={loading} className="flex-1 sm:flex-none">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 sm:flex-none bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            {loading ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Deleting...
              </>
            ) : (
              'Delete Record'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}