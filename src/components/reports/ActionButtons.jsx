import { Button } from '@/components/ui/button'
import { Edit, Trash2, FileText, Loader2 } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

/**
 * ActionButtons Component
 * ✅ ENHANCED: Professional action buttons with smooth animations
 * ✅ IMPROVED: Better mobile responsiveness
 * ✅ ADDED: Hover effects and transitions
 */

export default function ActionButtons({
  onUpdate,
  onDelete,
  onCertificate,
  loading = false,
  loadingAction = null,
  compact = false,
}) {
  const buttonSize = compact ? 'sm' : 'default'
  const iconSize = compact ? 'w-4 h-4' : 'w-4 h-4'

  return (
    <TooltipProvider delayDuration={300}>
      <div className={`flex ${compact ? 'gap-1.5' : 'flex-col sm:flex-row gap-2'} items-stretch sm:items-center justify-center`}>
        {/* Update Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size={buttonSize}
              variant="outline"
              onClick={onUpdate}
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
              onClick={onCertificate}
              disabled={loading}
              className={`
                ${compact ? 'flex-1' : 'w-full sm:w-auto'}
                border-green-300 text-green-700 
                hover:bg-green-50 hover:border-green-500 hover:shadow-md 
                active:scale-95
                transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed
                group
              `}
            >
              {loadingAction === 'certificate' ? (
                <Loader2 className={`${iconSize} animate-spin`} />
              ) : (
                <FileText className={`${iconSize} group-hover:scale-110 transition-transform`} />
              )}
              {!compact && <span className="ml-2 font-medium">Certificate</span>}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top" className="bg-gray-900 text-white">
            <p>Generate PDF certificate</p>
          </TooltipContent>
        </Tooltip>

        {/* Delete Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size={buttonSize}
              variant="outline"
              onClick={onDelete}
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
  )
}

/**
 * CompactActionButtons - For mobile/small screens
 */
export function CompactActionButtons(props) {
  return <ActionButtons {...props} compact={true} />
}