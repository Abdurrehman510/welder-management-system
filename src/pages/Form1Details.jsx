import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import SearchBar from '../components/reports/SearchBar'
import LoadingSpinner from '../components/common/LoadingSpinner'
import EmptyState from '../components/common/EmptyState'
import { FileText, Users, ArrowLeft, RefreshCw, Download } from 'lucide-react'
import { useWelders } from '../hooks/useWelders'
import wpqService from '../services/wpqService'
import continuityService from '../services/continuityService'
import pdfService from '../services/pdfService'
import { pdf } from '@react-pdf/renderer'
import Form1PDF from '../components/pdf/Form1PDF'
import { toast } from 'sonner'
import { getInitials } from '../utils/pdfHelpers'

/**
 * Form1 Details Page
 * View all welders with PDF generation options and search functionality
 */

export default function Form1Details() {
  const navigate = useNavigate()
  const {
    welders,
    loading,
    error,
    searchTerm,
    searchWelders,
    refresh,
    clearSearch,
  } = useWelders()

  const [generatingPDF, setGeneratingPDF] = useState(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  /**
   * Format date for display
   */
  const formatDisplayDate = (dateString) => {
    if (!dateString) return 'N/A'
    
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return 'N/A'
      
      return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    } catch (error) {
      console.error('Date formatting error:', error)
      return 'N/A'
    }
  }

  /**
   * Handle search
   */
  const handleSearch = (term) => {
    if (!term.trim()) {
      clearSearch()
      return
    }
    searchWelders(term)
  }

  /**
   * Handle refresh
   */
  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      await refresh()
      toast.success('Welders Refreshed', {
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

  /**
   * Handle clear search
   */
  const handleClearSearch = () => {
    clearSearch()
    toast.info('Search Cleared', {
      description: 'Showing all welders',
      duration: 2000,
    })
  }

  /**
   * Handle View Form1 PDF
   */
  const handleViewForm1 = async (welder) => {
    setGeneratingPDF(`form1-${welder.id}`)

    try {
      // Fetch WPQ and continuity records
      const { data: wpqData, error: wpqError } = await wpqService.getWPQRecordByWelderId(welder.id)
      
      if (wpqError && !wpqError.includes('no rows')) {
        throw new Error(wpqError)
      }

      const { data: continuityData } = 
        await continuityService.getContinuityRecordsByWelderId(welder.id)

      // Prepare PDF data
      const pdfData = await pdfService.prepareForm1Data({
        welder: welder,
        wpq_records: wpqData ? [wpqData] : [],
        continuity_records: continuityData || []
      })

      console.log(pdfData)

      // Generate PDF
      const blob = await pdf(<Form1PDF data={pdfData} />).toBlob()

      // Download PDF
      const filename = pdfService.generateFilename('form1', welder.certificate_no, welder.welder_name)
      pdfService.downloadPDF(blob, filename)

      toast.success('Form1 PDF Generated', {
        description: `Downloaded: ${filename}`,
        duration: 4000,
      })
    } catch (error) {
      console.error('Form1 PDF generation error:', error)
      toast.error('PDF Generation Failed', {
        description: error.message || 'Unable to generate Form1 PDF',
        duration: 5000,
      })
    } finally {
      setGeneratingPDF(null)
    }
  }

  /**
   * Handle View Form2 PDF
   */
  const handleViewForm2 = async (welder) => {
    setGeneratingPDF(`form2-${welder.id}`)

    try {
      const { data: wpqData } = await wpqService.getWPQRecordByWelderId(welder.id)
      const { data: continuityData } = await continuityService.getContinuityRecordsByWelderId(welder.id)

      // Prepare PDF data
      const pdfData = await pdfService.prepareForm2Data({
        welder: welder,
        wpq_records: wpqData ? [wpqData] : [],
        continuity_records: continuityData || []
      })

      // Import Form2PDF dynamically
      const Form2PDF = (await import('../components/pdf/Form2PDF/Form2PDF')).default

      // Generate PDF
      const blob = await pdf(<Form2PDF data={pdfData} />).toBlob()

      // Download PDF
      const filename = pdfService.generateFilename('form2', welder.certificate_no, welder.welder_name)
      pdfService.downloadPDF(blob, filename)

      toast.success('Form2 PDF Generated Successfully', {
        description: `Downloaded: ${filename}`,
        duration: 4000,
      })
    } catch (error) {
      console.error('Form2 PDF generation error:', error)
      toast.error('PDF Generation Failed', {
        description: error.message || 'Unable to generate Form2 PDF',
        duration: 5000,
      })
    } finally {
      setGeneratingPDF(null)
    }
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
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 shadow-lg">
                  <Users className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl">
                    Form1 Details
                  </h1>
                  <p className="text-sm text-gray-600 sm:text-base">
                    Search welders and generate PDFs
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
            </div>
          </div>

          {/* ================= SEARCH BAR ================= */}
          <Card className="mt-6 border-blue-100 p-4 shadow-lg sm:p-6">
            <SearchBar
              onSearch={handleSearch}
              onClear={handleClearSearch}
              loading={loading}
              defaultValue={searchTerm}
              placeholder="Search by welder name, designation, certificate number, or client..."
            />
          </Card>
        </div>

        {/* ================= SUMMARY ================= */}
        {!loading && (
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-600">
              {searchTerm ? (
                <>
                  Found <span className="font-semibold text-gray-900">{welders.length}</span> welder
                  {welders.length !== 1 ? 's' : ''} matching "{searchTerm}"
                </>
              ) : (
                <>
                  Showing <span className="font-semibold text-gray-900">{welders.length}</span> total welder
                  {welders.length !== 1 ? 's' : ''}
                </>
              )}
            </p>

            {searchTerm && welders.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearSearch}
                className="w-fit text-blue-600 hover:text-blue-700"
              >
                View All Welders
              </Button>
            )}
          </div>
        )}

        {/* ================= ERROR STATE ================= */}
        {error && !loading && (
          <Card className="border-red-200 bg-red-50 p-6 shadow-lg sm:p-8">
            <EmptyState
              type="error"
              title="Failed to Load Welders"
              description={error}
              actionLabel="Try Again"
              onAction={handleRefresh}
            />
          </Card>
        )}

        {/* ================= LOADING STATE ================= */}
        {loading && !isRefreshing && (
          <Card className="p-6 shadow-lg sm:p-8">
            <LoadingSpinner size="lg" text="Loading welders..." />
          </Card>
        )}

        {/* ================= DATA TABLE ================= */}
        {!loading && !error && welders.length > 0 && (
          <Card className="overflow-hidden border-gray-200 shadow-lg">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b-2 border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
                    <TableHead className="w-[50px] font-bold text-gray-900">#</TableHead>
                    <TableHead className="min-w-[250px] font-bold text-gray-900">
                      Actions
                    </TableHead>
                    <TableHead className="min-w-[200px] font-bold text-gray-900">
                      Name
                    </TableHead>
                    <TableHead className="min-w-[150px] font-bold text-gray-900">
                      Designation
                    </TableHead>
                    <TableHead className="min-w-[120px] font-bold text-gray-900">
                      DOB
                    </TableHead>
                    <TableHead className="min-w-[120px] font-bold text-gray-900">
                      DOJ
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {welders.map((welder, index) => (
                    <TableRow
                      key={welder.id}
                      className="border-b border-gray-100 transition-colors duration-150 hover:bg-blue-50/50"
                    >
                      {/* Row Number */}
                      <TableCell className="font-medium text-gray-600">{index + 1}</TableCell>

                      {/* Actions */}
                      <TableCell>
                        <div className="flex flex-col gap-2 sm:flex-row">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewForm1(welder)}
                            disabled={generatingPDF === `form1-${welder.id}`}
                            className="gap-2 border-blue-300 text-blue-700 hover:border-blue-400 hover:bg-blue-50"
                          >
                            {generatingPDF === `form1-${welder.id}` ? (
                              <>
                                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                                Generating...
                              </>
                            ) : (
                              <>
                                <FileText className="h-4 w-4" />
                                View Form1
                              </>
                            )}
                          </Button>

                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewForm2(welder)}
                            disabled={generatingPDF === `form2-${welder.id}`}
                            className="gap-2 border-green-300 text-green-700 hover:border-green-400 hover:bg-green-50"
                          >
                            {generatingPDF === `form2-${welder.id}` ? (
                              <>
                                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-green-600 border-t-transparent" />
                                Generating...
                              </>
                            ) : (
                              <>
                                <Download className="h-4 w-4" />
                                View Form2
                              </>
                            )}
                          </Button>
                        </div>
                      </TableCell>

                      {/* Name with Avatar */}
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border-2 border-gray-200 shadow-sm">
                            <AvatarImage
                              src={welder.photo_url}
                              alt={welder.welder_name}
                            />
                            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-purple-600 text-sm font-semibold text-white">
                              {getInitials(welder.welder_name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold leading-tight text-gray-900">
                              {welder.welder_name}
                            </p>
                            {welder.welder_name_short && (
                              <p className="mt-0.5 text-xs text-gray-500">
                                {welder.welder_name_short}
                              </p>
                            )}
                          </div>
                        </div>
                      </TableCell>

                      {/* Designation */}
                      <TableCell>
                        <span className="font-medium text-gray-900">
                          {welder.designation || 'N/A'}
                        </span>
                      </TableCell>

                      {/* DOB */}
                      <TableCell>
                        <span className="text-gray-700">
                          {formatDisplayDate(welder.date_of_birth)}
                        </span>
                      </TableCell>

                      {/* DOJ */}
                      <TableCell>
                        <span className="text-gray-700">
                          {formatDisplayDate(welder.date_of_joining)}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        )}

        {/* ================= EMPTY STATE ================= */}
        {!loading && !error && welders.length === 0 && (
          <Card className="p-6 shadow-lg sm:p-8">
            <EmptyState
              type={searchTerm ? 'noSearchResults' : 'noData'}
              title={searchTerm ? 'No Welders Found' : 'No Welders Available'}
              description={
                searchTerm
                  ? `No welders match "${searchTerm}". Try different search terms.`
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