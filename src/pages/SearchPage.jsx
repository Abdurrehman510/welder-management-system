import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import LoadingSpinner from '../components/common/LoadingSpinner'
import EmptyState from '../components/common/EmptyState'
import AddContinuityDialog from '../components/common/AddContinuityDialog'
import { Search, ArrowLeft, RefreshCw, Plus, AlertCircle, Building2, FileText, User } from 'lucide-react'
import welderService from '../services/welderService'
import wpqService from '../services/wpqService'
import { toast } from 'sonner'
import { getInitials } from '../utils/pdfHelpers'

/**
 * ✅ PHASE 7: Search Page - FINAL VERSION
 * 
 * MODIFICATIONS:
 * 1. ✅ Search only on button click (no auto-search)
 * 2. ✅ Common image types only (JPG, PNG, JPEG, WEBP)
 * 
 * Features:
 * - Search by Company Name, Certificate Number, OR Welder Name
 * - Manual search (button click or Enter key)
 * - Add new continuity record from search results
 * - Results table with 4 columns
 * - Professional UI with loading states
 * 
 * @production-ready
 */

export default function SearchPage() {
  const navigate = useNavigate()
  
  // State Management
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [searching, setSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [error, setError] = useState(null)

  // Dialog State
  const [showAddContinuity, setShowAddContinuity] = useState(false)
  const [selectedWelder, setSelectedWelder] = useState(null)

  /**
   * ✅ FIXED: Manual Search Only (no auto-search)
   * This searches by: name, certificate number, OR company
   */
  const handleSearch = async (e) => {
    e?.preventDefault()
    
    if (!searchTerm.trim()) {
      toast.error('Search Term Required', {
        description: 'Please enter a search term',
      })
      return
    }

    setSearching(true)
    setError(null)
    setHasSearched(true)

    try {
      // Use searchWelders which searches by name, certificate, OR company
      const { data, error } = await welderService.searchWelders(searchTerm)
      
      if (error) {
        throw new Error(error)
      }

      setSearchResults(data || [])
      
      if (data && data.length > 0) {
        toast.success('Search Complete', {
          description: `Found ${data.length} matching record${data.length !== 1 ? 's' : ''}`,
        })
      } else {
        toast.info('No Results Found', {
          description: 'Try different search terms',
        })
      }
    } catch (err) {
      console.error('Search error:', err)
      setError(err.message || 'Search failed')
      toast.error('Search Failed', {
        description: err.message || 'Unable to perform search',
      })
    } finally {
      setSearching(false)
    }
  }

  /**
   * Clear Search
   */
  const handleClearSearch = () => {
    setSearchTerm('')
    setSearchResults([])
    setHasSearched(false)
    setError(null)
    toast.info('Search Cleared', {
      description: 'Ready for new search',
    })
  }

  /**
   * Handle Add New Continuity Entry
   * Fetches WPQ record ID before opening dialog
   */
  const handleAddNewEntry = async (welder) => {
    setLoading(true)
    
    try {
      // Fetch WPQ record for this welder
      const { data: wpqData, error } = await wpqService.getWPQRecordByWelderId(welder.id)
      
      if (error) {
        throw new Error(error)
      }

      if (!wpqData) {
        toast.error('WPQ Record Not Found', {
          description: `${welder.welder_name} does not have a WPQ record yet. Please create one via Form1 first.`,
          duration: 5000,
        })
        return
      }

      // Set selected welder with WPQ record ID
      setSelectedWelder({
        ...welder,
        wpq_record_id: wpqData.id
      })
      setShowAddContinuity(true)
    } catch (err) {
      console.error('Fetch WPQ error:', err)
      toast.error('Unable to Load WPQ Record', {
        description: err.message || 'Failed to fetch welder qualification data',
      })
    } finally {
      setLoading(false)
    }
  }

  /**
   * Handle successful continuity addition
   */
  const handleContinuitySuccess = () => {
    toast.success('Continuity Record Added', {
      description: `New entry added for ${selectedWelder.welder_name}`,
    })
    // Optionally refresh search results
    if (searchTerm.trim()) {
      handleSearch()
    }
  }

  /**
   * Handle Enter Key Press
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-gray-100 py-6 sm:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ================= HEADER ================= */}
        <div className="mb-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            
            {/* Left Section */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/')}
                className="w-fit gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>

              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 shadow-lg">
                  <Search className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl">
                    Global Search
                  </h1>
                  <p className="text-sm text-gray-600 sm:text-base">
                    Search by name, company, or certificate number
                  </p>
                </div>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
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
        </div>

        {/* ================= SEARCH CARD ================= */}
        <Card className="mb-8 border-indigo-100 p-6 shadow-lg sm:p-8">
          <form onSubmit={handleSearch} className="space-y-4">
            {/* Search Input */}
            <div className="flex flex-col gap-4 md:flex-row md:items-end">
              <div className="flex-1 space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Search Criteria
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Type welder name, company, or certificate number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={searching}
                    className="pl-10 h-12 text-base border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={searching || !searchTerm.trim()}
                  className="h-12 gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 px-6"
                >
                  {searching ? (
                    <>
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="h-5 w-5" />
                      Search
                    </>
                  )}
                </Button>

                {(hasSearched || searchTerm) && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClearSearch}
                    disabled={searching}
                    className="h-12 gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Clear
                  </Button>
                )}
              </div>
            </div>

            {/* Search Tips */}
            <div className="rounded-lg border border-indigo-100 bg-indigo-50/50 p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 flex-shrink-0 text-indigo-600 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-indigo-900">
                    Search by ANY of the following:
                  </p>
                  <ul className="space-y-1 text-xs text-indigo-700">
                    <li className="flex items-center gap-2">
                      <User className="h-3 w-3" />
                      <span className="font-semibold">Welder Name:</span> Try "ANANDHABABU", "THULASI", or "A Thulasi"
                    </li>
                    <li className="flex items-center gap-2">
                      <Building2 className="h-3 w-3" />
                      <span className="font-semibold">Company:</span> Try "ALMUZAIN", "MZN", or partial names
                    </li>
                    <li className="flex items-center gap-2">
                      <FileText className="h-3 w-3" />
                      <span className="font-semibold">Certificate:</span> Enter full or partial number (e.g., "25161-0756")
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </form>
        </Card>

        {/* ================= RESULTS SUMMARY ================= */}
        {hasSearched && !searching && (
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-600">
              {searchResults.length > 0 ? (
                <>
                  Found <span className="font-semibold text-gray-900">{searchResults.length}</span> result
                  {searchResults.length !== 1 ? 's' : ''} for{' '}
                  <span className="font-semibold text-indigo-600">"{searchTerm}"</span>
                </>
              ) : (
                <>
                  No results found for{' '}
                  <span className="font-semibold text-gray-900">"{searchTerm}"</span>
                </>
              )}
            </p>
          </div>
        )}

        {/* ================= ERROR STATE ================= */}
        {error && !searching && (
          <Card className="border-red-200 bg-red-50 p-6 shadow-lg sm:p-8">
            <EmptyState
              type="error"
              title="Search Failed"
              description={error}
              actionLabel="Try Again"
              onAction={handleClearSearch}
            />
          </Card>
        )}

        {/* ================= LOADING STATE ================= */}
        {searching && (
          <Card className="p-6 shadow-lg sm:p-8">
            <LoadingSpinner size="lg" text="Searching welders..." />
          </Card>
        )}

        {/* ================= RESULTS TABLE ================= */}
        {!searching && !error && searchResults.length > 0 && (
          <Card className="overflow-hidden border-gray-200 shadow-lg">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b-2 border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
                    <TableHead className="w-[50px] font-bold text-gray-900">#</TableHead>
                    <TableHead className="min-w-[200px] font-bold text-gray-900">
                      Welder Name
                    </TableHead>
                    <TableHead className="min-w-[150px] font-bold text-gray-900">
                      Iqama/Passport No
                    </TableHead>
                    <TableHead className="min-w-[150px] font-bold text-gray-900">
                      Certificate No
                    </TableHead>
                    <TableHead className="min-w-[150px] font-bold text-gray-900">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {searchResults.map((welder, index) => (
                    <TableRow
                      key={welder.id}
                      className="border-b border-gray-100 transition-colors duration-150 hover:bg-indigo-50/50 animate-fadeIn"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      {/* Row Number */}
                      <TableCell className="font-medium text-gray-600">
                        {index + 1}
                      </TableCell>

                      {/* Welder Name with Avatar */}
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border-2 border-gray-200 shadow-sm">
                            <AvatarImage
                              src={welder.photo_url}
                              alt={welder.welder_name}
                            />
                            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-sm font-semibold text-white">
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
                            {welder.client_contractor && (
                              <Badge
                                variant="outline"
                                className="mt-1 border-indigo-200 bg-indigo-50 text-xs text-indigo-700"
                              >
                                {welder.client_contractor}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>

                      {/* Iqama/Passport Number */}
                      <TableCell>
                        <span className="font-mono text-sm font-medium text-gray-700">
                          {welder.iqama_passport_no}
                        </span>
                      </TableCell>

                      {/* Certificate Number */}
                      <TableCell>
                        <span className="font-mono text-sm font-semibold text-indigo-700">
                          {welder.certificate_no}
                        </span>
                      </TableCell>

                      {/* Action Button */}
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAddNewEntry(welder)}
                          disabled={loading}
                          className="gap-2 border-green-300 text-green-700 hover:border-green-400 hover:bg-green-50"
                        >
                          <Plus className="h-4 w-4" />
                          Add New Entry
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        )}

        {/* ================= EMPTY STATE ================= */}
        {!searching && !error && hasSearched && searchResults.length === 0 && (
          <Card className="p-6 shadow-lg sm:p-8">
            <EmptyState
              type="noSearchResults"
              title="No Welders Found"
              description={`No welders match "${searchTerm}". Try different search terms or check spelling.`}
              actionLabel="Clear Search"
              onAction={handleClearSearch}
            />
          </Card>
        )}

        {/* ================= INITIAL STATE ================= */}
        {!searching && !error && !hasSearched && (
          <Card className="border-indigo-100 bg-gradient-to-br from-white to-indigo-50/30 p-8 shadow-lg sm:p-12">
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-indigo-200">
                <Search className="h-12 w-12 text-indigo-600" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-gray-900">
                Ready to Search
              </h3>
              <p className="mx-auto max-w-md text-gray-600 mb-4">
                Enter a search term above and click the Search button to find welder qualification records.
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>Name</span>
                </div>
                <div className="flex items-center gap-1">
                  <Building2 className="h-4 w-4" />
                  <span>Company</span>
                </div>
                <div className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  <span>Certificate</span>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* ================= ADD CONTINUITY DIALOG ================= */}
      {selectedWelder && (
        <AddContinuityDialog
          open={showAddContinuity}
          onOpenChange={setShowAddContinuity}
          welderId={selectedWelder.id}
          wpqRecordId={selectedWelder.wpq_record_id}
          onSuccess={handleContinuitySuccess}
        />
      )}
    </div>
  )
}