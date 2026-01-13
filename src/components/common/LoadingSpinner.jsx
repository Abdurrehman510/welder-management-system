import { Loader2 } from 'lucide-react'

/**
 * LoadingSpinner Component
 * Professional loading indicators with multiple variants
 * Usage: <LoadingSpinner size="lg" text="Loading data..." />
 */
    
export default function LoadingSpinner({ 
  size = 'md', 
  text = null, 
  fullScreen = false,
  variant = 'primary' 
}) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  }

  const variantClasses = {
    primary: 'text-blue-600',
    secondary: 'text-gray-600',
    success: 'text-green-600',
    danger: 'text-red-600',
  }

  const content = (
    <div className={`flex flex-col items-center justify-center gap-3 ${fullScreen ? 'min-h-screen' : 'p-8'}`}>
      <Loader2 
        className={`${sizeClasses[size]} ${variantClasses[variant]} animate-spin`} 
      />
      {text && (
        <p className="text-sm text-gray-600 font-medium animate-pulse">
          {text}
        </p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
        {content}
      </div>
    )
  }

  return content
}

/**
 * TableLoadingSkeleton - For table loading states
 */
export function TableLoadingSkeleton({ rows = 5, columns = 6 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4 animate-pulse">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div
              key={colIndex}
              className="h-12 bg-gray-200 rounded flex-1"
              style={{
                animationDelay: `${(rowIndex * columns + colIndex) * 50}ms`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

/**
 * ButtonLoadingSpinner - Inline button spinner
 */
export function ButtonLoadingSpinner({ text = 'Loading...' }) {
  return (
    <span className="flex items-center gap-2">
      <Loader2 className="w-4 h-4 animate-spin" />
      {text}
    </span>
  )
}