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
import { Search, ArrowLeft, RefreshCw, Plus, AlertCircle, Building2, FileText, User, Sparkles } from 'lucide-react'
import welderService from '../services/welderService'
import wpqService from '../services/wpqService'
import { toast } from 'sonner'
import { getInitials } from '../utils/pdfHelpers'

/**
 * ✅ ENHANCED SEARCH PAGE - Production Ready
 * 
 * IMPROVEMENTS:
 * - Modern glass-morphism design with depth
 * - Perfect responsive layout (mobile-first approach)
 * - Smooth animations and transitions
 * - Enhanced mobile experience with touch-optimized targets
 * - Professional color scheme with proper contrast
 * - Improved visual hierarchy
 * - Better loading states and feedback
 * - Optimized table for mobile (card view on small screens)
 * 
 * @production-ready @responsive @modern
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
   * Manual Search Handler
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
   */
  const handleAddNewEntry = async (welder) => {
    setLoading(true)
    
    try {
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
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.5s ease-out forwards;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
        }
        
        .glass-card-dark {
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(99, 102, 241, 0.1);
          box-shadow: 0 20px 60px rgba(99, 102, 241, 0.12);
        }
        
        .search-input-wrapper {
          position: relative;
          transition: all 0.3s ease;
        }
        
        .search-input-wrapper:focus-within {
          transform: translateY(-2px);
        }
        
        .search-input-wrapper:focus-within .search-icon {
          color: #6366f1;
          transform: scale(1.1);
        }
        
        .search-icon {
          transition: all 0.3s ease;
        }
        
        .result-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .result-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(99, 102, 241, 0.15);
        }
        
        .action-button {
          transition: all 0.2s ease;
        }
        
        .action-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
        }
        
        .stat-badge {
          animation: scaleIn 0.3s ease-out;
        }
        
        /* Mobile optimizations */
        @media (max-width: 640px) {
          .mobile-card-view {
            display: block;
          }
          
          .desktop-table-view {
            display: none;
          }
        }
        
        @media (min-width: 641px) {
          .mobile-card-view {
            display: none;
          }
          
          .desktop-table-view {
            display: block;
          }
        }
        
        /* Gradient mesh background */
        .gradient-mesh {
          background: 
            radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.04) 0%, transparent 50%);
        }
      `}</style>

      <div className="min-h-screen gradient-mesh py-4 sm:py-6 lg:py-8">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          
          {/* ================= HEADER ================= */}
          <div className="mb-6 sm:mb-8 animate-slideInUp">
            <div className="flex flex-col gap-4 sm:gap-6">
              
              {/* Top Row - Back Button */}
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/')}
                  className="gap-2 hover:bg-white/80 hover:shadow-md transition-all duration-200 -ml-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Back to Home</span>
                  <span className="sm:hidden">Back</span>
                </Button>

                <Button
                  size="sm"
                  onClick={() => navigate('/form1')}
                  className="gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">New Record</span>
                  <span className="sm:hidden">New</span>
                </Button>
              </div>

              {/* Main Header */}
              <div className="glass-card rounded-2xl p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 shadow-xl">
                    <Search className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900 bg-clip-text text-transparent">
                      Global Search
                    </h1>
                    <p className="mt-1 text-sm sm:text-base text-gray-600 flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-indigo-500" />
                      Search by name, company, or certificate number
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= SEARCH CARD ================= */}
          <div className="mb-6 sm:mb-8 animate-slideInUp" style={{ animationDelay: '0.1s' }}>
            <Card className="glass-card-dark border-0 rounded-2xl p-4 sm:p-6 lg:p-8">
              <form onSubmit={handleSearch} className="space-y-4 sm:space-y-5">
                {/* Search Input */}
                <div className="flex flex-col gap-3 sm:gap-4">
                  <label className="text-sm sm:text-base font-semibold text-gray-800 flex items-center gap-2">
                    <Search className="h-4 w-4 text-indigo-600" />
                    Search Criteria
                  </label>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="search-input-wrapper flex-1">
                      <div className="relative">
                        <Search className="search-icon absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <Input
                          type="text"
                          placeholder="Type welder name, company, or certificate..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          onKeyPress={handleKeyPress}
                          disabled={searching}
                          className="h-12 sm:h-14 pl-12 pr-4 text-base border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 bg-white"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 sm:gap-3">
                      <Button
                        type="submit"
                        disabled={searching || !searchTerm.trim()}
                        className="flex-1 sm:flex-initial h-12 sm:h-14 gap-2 bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 hover:from-indigo-700 hover:to-violet-800 px-6 sm:px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-semibold"
                      >
                        {searching ? (
                          <>
                            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            <span className="hidden sm:inline">Searching...</span>
                            <span className="sm:hidden">...</span>
                          </>
                        ) : (
                          <>
                            <Search className="h-5 w-5" />
                            <span>Search</span>
                          </>
                        )}
                      </Button>

                      {(hasSearched || searchTerm) && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleClearSearch}
                          disabled={searching}
                          className="h-12 sm:h-14 gap-2 px-4 sm:px-6 border-2 rounded-xl hover:bg-gray-50 transition-all duration-200"
                        >
                          <RefreshCw className="h-4 w-4" />
                          <span className="hidden sm:inline">Clear</span>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Search Tips */}
                <div className="rounded-xl border-2 border-indigo-100 bg-gradient-to-br from-indigo-50 to-blue-50 p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
                        <AlertCircle className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div className="space-y-2 flex-1">
                      <p className="text-sm sm:text-base font-bold text-indigo-900">
                        Search by ANY of the following:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div className="flex items-start gap-2 bg-white/60 backdrop-blur-sm rounded-lg p-2 sm:p-3">
                          <User className="h-4 w-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                          <div className="text-xs sm:text-sm">
                            <span className="font-bold text-indigo-900 block">Welder Name</span>
                            <span className="text-indigo-700">e.g., "THULASI"</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 bg-white/60 backdrop-blur-sm rounded-lg p-2 sm:p-3">
                          <Building2 className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          <div className="text-xs sm:text-sm">
                            <span className="font-bold text-blue-900 block">Company</span>
                            <span className="text-blue-700">e.g., "ALMUZAIN"</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 bg-white/60 backdrop-blur-sm rounded-lg p-2 sm:p-3">
                          <FileText className="h-4 w-4 text-violet-600 flex-shrink-0 mt-0.5" />
                          <div className="text-xs sm:text-sm">
                            <span className="font-bold text-violet-900 block">Certificate</span>
                            <span className="text-violet-700">e.g., "25161-0756"</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </Card>
          </div>

          {/* ================= RESULTS SUMMARY ================= */}
          {hasSearched && !searching && (
            <div className="mb-4 sm:mb-6 animate-fadeIn">
              <div className="glass-card rounded-xl p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <p className="text-sm sm:text-base text-gray-700">
                    {searchResults.length > 0 ? (
                      <>
                        Found{' '}
                        <span className="stat-badge inline-flex items-center justify-center min-w-[32px] h-7 px-3 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-sm shadow-lg">
                          {searchResults.length}
                        </span>{' '}
                        result{searchResults.length !== 1 ? 's' : ''} for{' '}
                        <span className="font-semibold text-indigo-700">"{searchTerm}"</span>
                      </>
                    ) : (
                      <>
                        No results for{' '}
                        <span className="font-semibold text-gray-900">"{searchTerm}"</span>
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ================= ERROR STATE ================= */}
          {error && !searching && (
            <div className="animate-scaleIn">
              <Card className="glass-card border-red-200 rounded-2xl p-6 sm:p-8">
                <EmptyState
                  type="error"
                  title="Search Failed"
                  description={error}
                  actionLabel="Try Again"
                  onAction={handleClearSearch}
                />
              </Card>
            </div>
          )}

          {/* ================= LOADING STATE ================= */}
          {searching && (
            <div className="animate-scaleIn">
              <Card className="glass-card rounded-2xl p-8 sm:p-12">
                <LoadingSpinner size="lg" text="Searching welders..." />
              </Card>
            </div>
          )}

          {/* ================= RESULTS - DESKTOP TABLE VIEW ================= */}
          {!searching && !error && searchResults.length > 0 && (
            <div className="desktop-table-view animate-fadeIn">
              <Card className="glass-card-dark border-0 rounded-2xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b-2 border-indigo-100 bg-gradient-to-r from-indigo-50 to-violet-50 hover:from-indigo-50 hover:to-violet-50">
                        <TableHead className="w-[60px] font-bold text-gray-900 text-base">#</TableHead>
                        <TableHead className="min-w-[250px] font-bold text-gray-900 text-base">
                          Welder Information
                        </TableHead>
                        <TableHead className="min-w-[180px] font-bold text-gray-900 text-base">
                          Iqama/Passport No
                        </TableHead>
                        <TableHead className="min-w-[180px] font-bold text-gray-900 text-base">
                          Certificate No
                        </TableHead>
                        <TableHead className="min-w-[180px] font-bold text-gray-900 text-base text-center">
                          Action
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {searchResults.map((welder, index) => (
                        <TableRow
                          key={welder.id}
                          className="border-b border-indigo-50 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-violet-50/50 transition-all duration-200 animate-fadeIn"
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          {/* Row Number */}
                          <TableCell className="font-semibold text-gray-600">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-gray-100 to-gray-200">
                              {index + 1}
                            </div>
                          </TableCell>

                          {/* Welder Info */}
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-12 w-12 border-2 border-indigo-200 shadow-md ring-2 ring-indigo-50">
                                <AvatarImage
                                  src={welder.photo_url}
                                  alt={welder.welder_name}
                                />
                                <AvatarFallback className="bg-gradient-to-br from-indigo-600 to-violet-600 text-sm font-bold text-white">
                                  {getInitials(welder.welder_name)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-bold leading-tight text-gray-900 text-base">
                                  {welder.welder_name}
                                </p>
                                {welder.welder_name_short && (
                                  <p className="mt-0.5 text-sm text-gray-500">
                                    {welder.welder_name_short}
                                  </p>
                                )}
                                {welder.client_contractor && (
                                  <Badge
                                    variant="outline"
                                    className="mt-1.5 border-indigo-300 bg-indigo-100 text-xs font-semibold text-indigo-700 px-2 py-0.5"
                                  >
                                    {welder.client_contractor}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </TableCell>

                          {/* Iqama/Passport */}
                          <TableCell>
                            <div className="inline-flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2">
                              <span className="font-mono text-sm font-semibold text-gray-800">
                                {welder.iqama_passport_no}
                              </span>
                            </div>
                          </TableCell>

                          {/* Certificate */}
                          <TableCell>
                            <div className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-50 to-violet-50 px-3 py-2 border border-indigo-200">
                              <FileText className="h-4 w-4 text-indigo-600" />
                              <span className="font-mono text-sm font-bold text-indigo-700">
                                {welder.certificate_no}
                              </span>
                            </div>
                          </TableCell>

                          {/* Action */}
                          <TableCell>
                            <div className="flex justify-center">
                              <Button
                                size="sm"
                                onClick={() => handleAddNewEntry(welder)}
                                disabled={loading}
                                className="action-button gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white border-0 shadow-md"
                              >
                                <Plus className="h-4 w-4" />
                                Add Entry
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Card>
            </div>
          )}

          {/* ================= RESULTS - MOBILE CARD VIEW ================= */}
          {!searching && !error && searchResults.length > 0 && (
            <div className="mobile-card-view space-y-3 animate-fadeIn">
              {searchResults.map((welder, index) => (
                <Card
                  key={welder.id}
                  className="result-card glass-card border-0 rounded-xl p-4 shadow-lg"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="space-y-4">
                    {/* Header with Avatar */}
                    <div className="flex items-start justify-between gap-3">
                      {/* LEFT SIDE */}
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Avatar className="h-14 w-14 shrink-0 border-2 border-indigo-200 shadow-md ring-2 ring-indigo-50">
                          <AvatarImage
                            src={welder.photo_url}
                            alt={welder.welder_name}
                          />
                          <AvatarFallback className="bg-gradient-to-br from-indigo-600 to-violet-600 text-base font-bold text-white">
                            {getInitials(welder.welder_name)}
                          </AvatarFallback>
                        </Avatar>

                        {/* NAME BLOCK */}
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-900 text-base leading-tight truncate">
                            {welder.welder_name}
                          </p>

                          {welder.welder_name_short && (
                            <p className="mt-0.5 text-sm text-gray-500 truncate">
                              {welder.welder_name_short}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* SERIAL NUMBER */}
                      <div className="flex-shrink-0">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 text-white font-bold text-sm shadow-md">
                          {index + 1}
                        </div>
                      </div>
                    </div>


                    {/* Company Badge */}
                    {welder.client_contractor && (
                      <div>
                        <Badge
                          variant="outline"
                          className="border-indigo-300 bg-indigo-100 text-sm font-semibold text-indigo-700 px-3 py-1"
                        >
                          <Building2 className="h-3 w-3 mr-1.5" />
                          {welder.client_contractor}
                        </Badge>
                      </div>
                    )}

                    {/* Details Grid */}
                    <div className="space-y-3">
                      <div className="rounded-lg bg-gray-50 p-3">
                        <p className="text-xs font-semibold text-gray-600 mb-1.5">Iqama/Passport No</p>
                        <p className="font-mono text-sm font-semibold text-gray-900">
                          {welder.iqama_passport_no}
                        </p>
                      </div>
                      
                      <div className="rounded-lg bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-200 p-3">
                        <p className="text-xs font-semibold text-indigo-700 mb-1.5 flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          Certificate Number
                        </p>
                        <p className="font-mono text-sm font-bold text-indigo-900">
                          {welder.certificate_no}
                        </p>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button
                      size="sm"
                      onClick={() => handleAddNewEntry(welder)}
                      disabled={loading}
                      className="w-full h-11 gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold shadow-lg"
                    >
                      <Plus className="h-4 w-4" />
                      Add New Entry
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* ================= EMPTY STATE ================= */}
          {!searching && !error && hasSearched && searchResults.length === 0 && (
            <div className="animate-scaleIn">
              <Card className="glass-card rounded-2xl p-6 sm:p-8">
                <EmptyState
                  type="noSearchResults"
                  title="No Welders Found"
                  description={`No welders match "${searchTerm}". Try different search terms or check spelling.`}
                  actionLabel="Clear Search"
                  onAction={handleClearSearch}
                />
              </Card>
            </div>
          )}

          {/* ================= INITIAL STATE ================= */}
          {!searching && !error && !hasSearched && (
            <div className="animate-scaleIn" style={{ animationDelay: '0.2s' }}>
              <Card className="glass-card-dark border-0 rounded-2xl p-6 sm:p-10 lg:p-16 shadow-2xl">
                <div className="text-center space-y-6">
                  <div className="mx-auto flex h-24 w-24 sm:h-32 sm:w-32 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 shadow-2xl ring-4 ring-indigo-100">
                    <Search className="h-12 w-12 sm:h-16 sm:w-16 text-white" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900 bg-clip-text text-transparent">
                      Ready to Search
                    </h3>
                    <p className="mx-auto max-w-md text-base sm:text-lg text-gray-600">
                      Enter a search term above and click the Search button to find welder qualification records.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-4">
                    <div className="flex items-center gap-2 rounded-xl bg-white/80 backdrop-blur-sm px-4 py-2.5 shadow-md border border-indigo-100">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100">
                        <User className="h-4 w-4 text-indigo-700" />
                      </div>
                      <span className="text-sm font-semibold text-gray-700">Name</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-xl bg-white/80 backdrop-blur-sm px-4 py-2.5 shadow-md border border-blue-100">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                        <Building2 className="h-4 w-4 text-blue-700" />
                      </div>
                      <span className="text-sm font-semibold text-gray-700">Company</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-xl bg-white/80 backdrop-blur-sm px-4 py-2.5 shadow-md border border-violet-100">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100">
                        <FileText className="h-4 w-4 text-violet-700" />
                      </div>
                      <span className="text-sm font-semibold text-gray-700">Certificate</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
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
    </>
  )
}