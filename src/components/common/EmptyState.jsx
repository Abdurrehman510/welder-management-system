import { FileQuestion, Search, AlertCircle, Inbox, Plus, RefreshCw, Filter, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

/**
 * EmptyState Component - Enhanced Enterprise UI/UX
 * Professional empty state displays with advanced interactions and accessibility
 * 
 * Features:
 * - Responsive design with mobile-first approach
 * - Smooth animations and micro-interactions
 * - Multiple action support (primary + secondary)
 * - Accessible with ARIA labels
 * - Visual hierarchy with modern design patterns
 * 
 * @example
 * <EmptyState 
 *   type="noData" 
 *   onAction={() => navigate('/form1')}
 *   secondaryAction={{ label: 'Import Data', onClick: handleImport }}
 * />
 */

export default function EmptyState({ 
  type = 'noData',
  title,
  description,
  actionLabel,
  onAction,
  secondaryAction, // { label, onClick, variant }
  icon: CustomIcon,
  className = '',
  size = 'default', // 'compact' | 'default' | 'large'
  animated = true,
  illustration, // Optional custom illustration/image
}) {
  const presets = {
    noData: {
      icon: Inbox,
      title: 'No Records Yet',
      description: 'Get started by creating your first welder qualification record. Build your database and track certifications efficiently.',
      actionLabel: 'Create First Record',
      actionIcon: Plus,
      iconColor: 'text-blue-500',
      bgGradient: 'from-blue-500/10 to-indigo-500/10',
      borderColor: 'border-blue-200/50',
    },
    noSearchResults: {
      icon: Search,
      title: 'No Matches Found',
      description: 'We couldn\'t find any records matching your search. Try using different keywords or adjust your filters.',
      actionLabel: 'Clear Filters',
      actionIcon: RefreshCw,
      iconColor: 'text-purple-500',
      bgGradient: 'from-purple-500/10 to-pink-500/10',
      borderColor: 'border-purple-200/50',
    },
    error: {
      icon: AlertCircle,
      title: 'Oops! Something Went Wrong',
      description: 'We encountered an unexpected error while loading your data. Don\'t worry, your information is safe. Please try again.',
      actionLabel: 'Try Again',
      actionIcon: RefreshCw,
      iconColor: 'text-red-500',
      bgGradient: 'from-red-500/10 to-orange-500/10',
      borderColor: 'border-red-200/50',
    },
    noFile: {
      icon: FileQuestion,
      title: 'No File Selected',
      description: 'Choose a file from your device to upload. Supported formats: PDF, JPG, PNG (Max 10MB)',
      actionLabel: 'Browse Files',
      actionIcon: Plus,
      iconColor: 'text-amber-500',
      bgGradient: 'from-amber-500/10 to-yellow-500/10',
      borderColor: 'border-amber-200/50',
    },
    filtered: {
      icon: Filter,
      title: 'No Results with Current Filters',
      description: 'Try removing some filters to see more results, or create a new record that matches your criteria.',
      actionLabel: 'Reset Filters',
      actionIcon: RefreshCw,
      iconColor: 'text-teal-500',
      bgGradient: 'from-teal-500/10 to-cyan-500/10',
      borderColor: 'border-teal-200/50',
    },
    empty: {
      icon: Sparkles,
      title: 'This Space is Waiting',
      description: 'Nothing here yet, but that\'s about to change. Start adding content to bring this section to life.',
      actionLabel: 'Get Started',
      actionIcon: Plus,
      iconColor: 'text-indigo-500',
      bgGradient: 'from-indigo-500/10 to-blue-500/10',
      borderColor: 'border-indigo-200/50',
    },
  }

  const config = presets[type] || presets.noData
  const Icon = CustomIcon || config.icon
  const ActionIcon = config.actionIcon

  const finalTitle = title || config.title
  const finalDescription = description || config.description
  const finalActionLabel = actionLabel || config.actionLabel

  // Size configurations
  const sizeConfig = {
    compact: {
      container: 'p-6 sm:p-8',
      iconWrapper: 'p-4 mb-4',
      icon: 'w-10 h-10 sm:w-12 sm:h-12',
      title: 'text-base sm:text-lg',
      description: 'text-sm',
      maxWidth: 'max-w-sm',
    },
    default: {
      container: 'p-8 sm:p-12 lg:p-16',
      iconWrapper: 'p-5 sm:p-6 mb-5 sm:mb-6',
      icon: 'w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16',
      title: 'text-lg sm:text-xl lg:text-2xl',
      description: 'text-sm sm:text-base',
      maxWidth: 'max-w-md lg:max-w-lg',
    },
    large: {
      container: 'p-12 sm:p-16 lg:p-20',
      iconWrapper: 'p-6 sm:p-8 mb-6 sm:mb-8',
      icon: 'w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24',
      title: 'text-xl sm:text-2xl lg:text-3xl',
      description: 'text-base sm:text-lg',
      maxWidth: 'max-w-lg lg:max-w-xl',
    },
  }

  const sizing = sizeConfig[size]

  return (
    <div 
      className={`flex flex-col items-center justify-center ${sizing.container} text-center ${className}`}
      role="status"
      aria-live="polite"
    >
      {/* Illustration or Icon */}
      {illustration ? (
        <div className={`mb-6 ${animated ? 'animate-in fade-in zoom-in-95 duration-500' : ''}`}>
          {illustration}
        </div>
      ) : (
        <div 
          className={`
            relative rounded-2xl sm:rounded-3xl bg-gradient-to-br ${config.bgGradient} 
            border-2 ${config.borderColor} ${sizing.iconWrapper}
            ${animated ? 'animate-in fade-in zoom-in-95 duration-500 fill-mode-backwards' : ''}
            transition-all duration-300 hover:scale-105 hover:shadow-lg
          `}
        >
          {/* Decorative elements */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-white to-transparent rounded-full opacity-60" />
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-gradient-to-tr from-white to-transparent rounded-full opacity-40" />
          
          <Icon 
            className={`${sizing.icon} ${config.iconColor} transition-transform duration-300`}
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </div>
      )}

      {/* Text Content */}
      <div 
        className={`
          ${sizing.maxWidth} 
          ${animated ? 'animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-backwards' : ''}
        `}
      >
        <h3 className={`${sizing.title} font-bold text-gray-900 mb-2 sm:mb-3 tracking-tight`}>
          {finalTitle}
        </h3>
        <p className={`${sizing.description} text-gray-600 leading-relaxed mb-6 sm:mb-8`}>
          {finalDescription}
        </p>
      </div>

      {/* Action Buttons */}
      {(onAction || secondaryAction) && (
        <div 
          className={`
            flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto
            ${animated ? 'animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-backwards' : ''}
          `}
        >
          {/* Primary Action */}
          {onAction && (
            <Button 
              onClick={onAction} 
              size={size === 'compact' ? 'default' : 'lg'}
              className="gap-2 shadow-md hover:shadow-lg transition-all duration-300 group min-w-[160px] sm:min-w-[180px]"
            >
              {ActionIcon && (
                <ActionIcon 
                  className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" 
                />
              )}
              <span className="font-semibold">{finalActionLabel}</span>
            </Button>
          )}

          {/* Secondary Action */}
          {secondaryAction && (
            <Button
              onClick={secondaryAction.onClick}
              variant={secondaryAction.variant || 'outline'}
              size={size === 'compact' ? 'default' : 'lg'}
              className="gap-2 min-w-[160px] sm:min-w-[180px] transition-all duration-300"
            >
              {secondaryAction.icon && (
                <secondaryAction.icon className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
              <span className="font-medium">{secondaryAction.label}</span>
            </Button>
          )}
        </div>
      )}

      {/* Optional Helper Text */}
      {type === 'error' && (
        <p className="text-xs sm:text-sm text-gray-500 mt-4 sm:mt-6 flex items-center gap-2 justify-center">
          <span className="inline-block w-1.5 h-1.5 bg-gray-400 rounded-full" />
          Need help? Contact support
        </p>
      )}
    </div>
  )
}

/**
 * TableEmptyState - Specialized for data tables with enhanced UX
 */
export function TableEmptyState({ 
  searchTerm, 
  filterCount = 0,
  onClearSearch, 
  onClearFilters,
  onCreateNew,
  entityName = 'records' // 'welders', 'records', 'certificates', etc.
}) {
  // Active filters state
  const hasActiveFilters = filterCount > 0
  const hasSearch = searchTerm && searchTerm.trim().length > 0

  // No search, no filters - completely empty
  if (!hasSearch && !hasActiveFilters) {
    return (
      <EmptyState
        type="noData"
        title={`No ${entityName.charAt(0).toUpperCase() + entityName.slice(1)} Yet`}
        description={`Start building your ${entityName} database. Create your first entry and keep track of all important information in one place.`}
        actionLabel={`Create New ${entityName.slice(0, -1).charAt(0).toUpperCase() + entityName.slice(0, -1).slice(1)}`}
        onAction={onCreateNew}
        secondaryAction={
          onClearFilters ? {
            label: 'Import Data',
            onClick: onClearFilters,
            variant: 'outline',
            icon: Plus,
          } : null
        }
      />
    )
  }

  // Has search term
  if (hasSearch) {
    return (
      <EmptyState
        type="noSearchResults"
        title="No Matching Results"
        description={
          <>
            No {entityName} found for <span className="font-semibold text-gray-900">"{searchTerm}"</span>.
            {hasActiveFilters && ` You also have ${filterCount} active filter${filterCount > 1 ? 's' : ''}.`}
          </>
        }
        actionLabel="Clear Search"
        onAction={onClearSearch}
        secondaryAction={
          hasActiveFilters && onClearFilters ? {
            label: `Clear ${filterCount} Filter${filterCount > 1 ? 's' : ''}`,
            onClick: onClearFilters,
            variant: 'outline',
            icon: Filter,
          } : onCreateNew ? {
            label: 'Create New',
            onClick: onCreateNew,
            variant: 'outline',
            icon: Plus,
          } : null
        }
        size="default"
      />
    )
  }

  // Only has filters
  if (hasActiveFilters) {
    return (
      <EmptyState
        type="filtered"
        title="No Results Match Your Filters"
        description={`You have ${filterCount} active filter${filterCount > 1 ? 's' : ''} applied. Try adjusting or removing filters to see more ${entityName}.`}
        actionLabel={`Clear All Filters`}
        onAction={onClearFilters}
        secondaryAction={
          onCreateNew ? {
            label: 'Create New Record',
            onClick: onCreateNew,
            variant: 'outline',
            icon: Plus,
          } : null
        }
      />
    )
  }

  return null
}

/**
 * InlineEmptyState - Compact version for smaller sections
 */
export function InlineEmptyState({ 
  message = 'No data available',
  action,
  icon: CustomIcon = Inbox,
}) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 p-6 sm:p-8 text-center sm:text-left">
      <div className="flex items-center gap-3">
        <div className="p-2.5 sm:p-3 bg-gray-100 rounded-xl">
          <CustomIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" strokeWidth={1.5} />
        </div>
        <p className="text-sm sm:text-base text-gray-600 font-medium">{message}</p>
      </div>
      
      {action && (
        <Button 
          onClick={action.onClick} 
          variant="outline" 
          size="sm"
          className="gap-2 w-full sm:w-auto"
        >
          {action.icon && <action.icon className="w-4 h-4" />}
          {action.label}
        </Button>
      )}
    </div>
  )
}

/**
 * ErrorEmptyState - Specialized error state with retry
 */
export function ErrorEmptyState({ 
  error,
  onRetry,
  onSupport,
  showDetails = false,
}) {
  return (
    <EmptyState
      type="error"
      title="Unable to Load Data"
      description={
        showDetails && error?.message 
          ? `Error: ${error.message}. Our team has been notified and is working on a fix.`
          : "We're having trouble loading this content. This is usually temporary - please try again in a moment."
      }
      actionLabel="Retry"
      onAction={onRetry}
      secondaryAction={
        onSupport ? {
          label: 'Contact Support',
          onClick: onSupport,
          variant: 'outline',
        } : null
      }
      size="default"
    />
  )
}