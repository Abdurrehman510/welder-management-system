import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import SearchBar from '../components/reports/SearchBar'
import DetailedReportTable from '../components/reports/DetailedReportTable'
import LoadingSpinner from '../components/common/LoadingSpinner'
import EmptyState from '../components/common/EmptyState'
import { useWPQRecords } from '../hooks/useWPQRecords'
import { FileText, RefreshCw, ArrowLeft, Plus } from 'lucide-react'
import { toast } from 'sonner'

export default function DetailedReportsForm1() {
  const navigate = useNavigate()
  const {
    records,
    loading,
    error,
    searchTerm,
    searchRecords,
    refresh,
    clearSearch,
  } = useWPQRecords()

  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleSearch = (term) => {
    if (!term.trim()) {
      clearSearch()
      return
    }
    searchRecords(term)
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      await refresh()
      toast.success('Records Refreshed', {
        description: 'Data has been updated successfully',
        duration: 2000,
      })
    } catch (error) {
      toast.error('Refresh Failed', {
        description: error.message,
      })
    } finally {
      setIsRefreshing(false)
    }
  }

  const handleClearSearch = () => {
    clearSearch()
    toast.info('Search Cleared', {
      description: 'Showing all records',
      duration: 2000,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 py-6 sm:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ================= HEADER ================= */}
        <div className="mb-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            {/* Left Section */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/complete-report')}
                className="w-fit gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>

              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg">
                  <FileText className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                    Detailed Reports – Form1
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600">
                    Search and manage WPQ Certificate records
                  </p>
                </div>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={loading || isRefreshing}
                className="gap-2"
              >
                <RefreshCw
                  className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`}
                />
                Refresh
              </Button>

              <Button
                size="sm"
                onClick={() => navigate('/form1')}
                className="gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
              >
                <Plus className="h-4 w-4" />
                New Record
              </Button>
            </div>
          </div>

          {/* ================= SEARCH ================= */}
          <Card className="mt-6 p-4 sm:p-6 shadow-lg border-blue-100">
            <SearchBar
              onSearch={handleSearch}
              onClear={handleClearSearch}
              loading={loading}
              defaultValue={searchTerm}
            />
          </Card>
        </div>

        {/* ================= SUMMARY ================= */}
        {!loading && (
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-600">
              {searchTerm ? (
                <>
                  Found <span className="font-semibold text-gray-900">{records.length}</span> record
                  {records.length !== 1 ? 's' : ''} matching "{searchTerm}"
                </>
              ) : (
                <>
                  Showing <span className="font-semibold text-gray-900">{records.length}</span> total record
                  {records.length !== 1 ? 's' : ''}
                </>
              )}
            </p>

            {searchTerm && records.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearSearch}
                className="w-fit text-blue-600 hover:text-blue-700"
              >
                View All Records
              </Button>
            )}
          </div>
        )}

        {/* ================= STATES ================= */}
        {error && !loading && (
          <Card className="p-6 sm:p-8 border-red-200 bg-red-50">
            <EmptyState
              type="error"
              title="Failed to Load Records"
              description={error}
              actionLabel="Try Again"
              onAction={handleRefresh}
            />
          </Card>
        )}

        {loading && !isRefreshing && (
          <Card className="p-6 sm:p-8">
            <LoadingSpinner size="lg" text="Loading records..." />
          </Card>
        )}

        {/* ================= TABLE ================= */}
        {!loading && !error && records.length > 0 && (
          <div className="overflow-x-auto rounded-xl">
            <DetailedReportTable
              records={records}
              loading={loading}
              onRefresh={refresh}
            />
          </div>
        )}


        {/* ================= EMPTY ================= */}
        {!loading && !error && records.length === 0 && (
          <Card className="p-6 sm:p-8">
            <EmptyState
              type={searchTerm ? 'noSearchResults' : 'noData'}
              title={searchTerm ? 'No Results Found' : 'No Records Available'}
              description={
                searchTerm
                  ? `No records match "${searchTerm}". Try different search terms.`
                  : 'Start by creating your first welder qualification record.'
              }
              actionLabel={searchTerm ? 'Clear Search' : 'Create New Record'}
              onAction={searchTerm ? handleClearSearch : () => navigate('/form1')}
            />
          </Card>
        )}
      </div>
    </div>
  )
}
