import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'
import { TableLoadingSkeleton } from './LoadingSpinner'
import { TableEmptyState } from './EmptyState'

/**
 * DataTable Component
 * Professional, sortable table with loading and empty states
 * 
 * Usage:
 * <DataTable
 *   columns={[
 *     { key: 'name', label: 'Name', sortable: true },
 *     { key: 'email', label: 'Email' },
 *   ]}
 *   data={records}
 *   loading={isLoading}
 *   onRowClick={(row) => navigate(`/detail/${row.id}`)}
 * />
 */

export default function DataTable({
  columns = [],
  data = [],
  loading = false,
  emptyMessage,
  onRowClick,
  searchTerm,
  onClearSearch,
  onCreateNew,
  renderCell,
  rowClassName,
}) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })

  // Handle column sorting
  const handleSort = (key) => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  // Sort data
  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0

    const aValue = a[sortConfig.key]
    const bValue = b[sortConfig.key]

    if (aValue === null || aValue === undefined) return 1
    if (bValue === null || bValue === undefined) return -1

    if (typeof aValue === 'string') {
      return sortConfig.direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    }

    if (sortConfig.direction === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  // Loading state
  if (loading) {
    return <TableLoadingSkeleton rows={5} columns={columns.length} />
  }

  // Empty state
  if (!data || data.length === 0) {
    return (
      <TableEmptyState
        searchTerm={searchTerm}
        onClearSearch={onClearSearch}
        onCreateNew={onCreateNew}
      />
    )
  }

  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden shadow-sm bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100">
            {columns.map((column) => (
              <TableHead
                key={column.key}
                className={`font-bold text-gray-700 ${column.className || ''}`}
              >
                {column.sortable ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort(column.key)}
                    className="h-auto p-0 hover:bg-transparent font-bold"
                  >
                    {column.label}
                    {sortConfig.key === column.key ? (
                      sortConfig.direction === 'asc' ? (
                        <ArrowUp className="ml-2 h-4 w-4" />
                      ) : (
                        <ArrowDown className="ml-2 h-4 w-4" />
                      )
                    ) : (
                      <ArrowUpDown className="ml-2 h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                ) : (
                  column.label
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((row, rowIndex) => (
            <TableRow
              key={row.id || rowIndex}
              className={`
                hover:bg-blue-50 transition-colors cursor-pointer
                ${rowClassName ? rowClassName(row) : ''}
              `}
              onClick={() => onRowClick && onRowClick(row)}
            >
              {columns.map((column) => (
                <TableCell key={column.key} className={column.cellClassName || ''}>
                  {renderCell ? renderCell(column.key, row) : row[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

/**
 * TablePagination Component
 * Simple "Load More" pagination
 */
export function TablePagination({ 
  hasMore, 
  loading, 
  onLoadMore,
  currentCount,
  totalCount 
}) {
  if (!hasMore) {
    return (
      <div className="text-center py-6 text-sm text-gray-500">
        Showing all {currentCount} records
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <p className="text-sm text-gray-600">
        Showing {currentCount} of {totalCount} records
      </p>
      <Button
        onClick={onLoadMore}
        disabled={loading}
        variant="outline"
        size="lg"
        className="min-w-[200px]"
      >
        {loading ? (
          <>
            <span className="animate-spin mr-2">⏳</span>
            Loading...
          </>
        ) : (
          'Load More'
        )}
      </Button>
    </div>
  )
}