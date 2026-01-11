import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { useState } from 'react'
import { Save, LogOut, X, Loader2 } from 'lucide-react'

export default function FormActions({ onSubmit, onCancel, submitting, disabled }) {
  const [showCancelDialog, setShowCancelDialog] = useState(false)

  const handleCancel = () => {
    setShowCancelDialog(true)
  }

  const confirmCancel = () => {
    setShowCancelDialog(false)
    onCancel()
  }

  return (
    <>
      <Card className="mt-8 sticky bottom-4 shadow-lg border-2">
        <CardContent className="py-4 sm:py-6">
          {/* Desktop Layout */}
          <div className="hidden sm:flex flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => onSubmit('save-and-new')}
              disabled={disabled}
              size="lg"
              className="gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save & New Entry
                </>
              )}
            </Button>

            <Button
              onClick={() => onSubmit('save-and-logout')}
              disabled={disabled}
              variant="secondary"
              size="lg"
              className="gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <LogOut className="w-5 h-5" />
                  Save & Logout
                </>
              )}
            </Button>

            <Button
              onClick={handleCancel}
              disabled={disabled}
              variant="outline"
              size="lg"
              className="gap-2"
            >
              <X className="w-5 h-5" />
              Cancel
            </Button>
          </div>

          {/* Mobile Layout - Compact with icons only */}
          <div className="flex sm:hidden gap-2 justify-center">
            <Button
              onClick={() => onSubmit('save-and-new')}
              disabled={disabled}
              size="sm"
              className="flex-1 max-w-[100px]"
              title="Save & New"
            >
              {submitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4 mr-1" />
                  <span className="text-xs">Save</span>
                </>
              )}
            </Button>

            <Button
              onClick={() => onSubmit('save-and-logout')}
              disabled={disabled}
              variant="secondary"
              size="sm"
              className="flex-1 max-w-[100px]"
              title="Save & Logout"
            >
              {submitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <LogOut className="w-4 h-4 mr-1" />
                  <span className="text-xs">Logout</span>
                </>
              )}
            </Button>

            <Button
              onClick={handleCancel}
              disabled={disabled}
              variant="outline"
              size="sm"
              className="flex-1 max-w-[100px]"
              title="Cancel"
            >
              <X className="w-4 h-4 mr-1" />
              <span className="text-xs">Cancel</span>
            </Button>
          </div>

          <p className="text-center text-xs sm:text-sm text-gray-500 mt-2 sm:mt-4">
            All required fields must be filled before saving
          </p>
        </CardContent>
      </Card>

      {/* Cancel Confirmation Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Discard Changes?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel? All unsaved changes will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continue Editing</AlertDialogCancel>
            <AlertDialogAction onClick={confirmCancel} className="bg-red-600 hover:bg-red-700">
              Discard Changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
} 