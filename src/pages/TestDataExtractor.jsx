import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Copy, Download } from 'lucide-react'
import welderService from '../services/welderService'
import wpqService from '../services/wpqService'
import continuityService from '../services/continuityService'
import { toast } from 'sonner'

/**
 * Test Data Extractor
 * Extract complete welder data for debugging
 */

export default function TestDataExtractor() {
  const [welderId, setWelderId] = useState('')
  const [loading, setLoading] = useState(false)
  const [jsonData, setJsonData] = useState('')

  const extractData = async () => {
    if (!welderId.trim()) {
      toast.error('Please enter a Welder ID')
      return
    }

    setLoading(true)
    try {
      // Fetch complete data
      const { data: welderData, error: welderError } = await welderService.getWelderById(welderId)
      
      if (welderError) {
        throw new Error(welderError)
      }

      const { data: wpqData, error: wpqError } = await wpqService.getWPQRecordByWelderId(welderId)
      
      const { data: continuityData, error: continuityError } = 
        await continuityService.getContinuityRecordsByWelderId(welderId)

      // Combine all data
      const completeData = {
        welder: welderData,
        wpq_records: wpqData ? [wpqData] : [],
        continuity_records: continuityData || []
      }

      // Format as pretty JSON
      const formatted = JSON.stringify(completeData, null, 2)
      setJsonData(formatted)

      toast.success('Data Extracted Successfully')
    } catch (error) {
      console.error('Extract error:', error)
      toast.error('Failed to extract data', {
        description: error.message
      })
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonData)
    toast.success('Copied to clipboard!')
  }

  const downloadJSON = () => {
    const blob = new Blob([jsonData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `welder_data_${welderId}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    toast.success('Downloaded!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <Card className="p-8">
          <h1 className="text-2xl font-bold mb-6">🔍 Test Data Extractor</h1>
          
          {/* Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Enter Welder ID (UUID):
            </label>
            <input
              type="text"
              value={welderId}
              onChange={(e) => setWelderId(e.target.value)}
              placeholder="e.g., 123e4567-e89b-12d3-a456-426614174000"
              className="w-full p-3 border rounded-lg"
            />
            <p className="text-xs text-gray-500 mt-1">
              You can find the Welder ID in the browser console logs or database
            </p>
          </div>

          {/* Extract Button */}
          <Button
            onClick={extractData}
            disabled={loading}
            className="w-full mb-6"
            size="lg"
          >
            {loading ? 'Extracting...' : 'Extract Data'}
          </Button>

          {/* JSON Output */}
          {jsonData && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold">Complete Welder Data (JSON):</h2>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                    className="gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={downloadJSON}
                    className="gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              </div>

              <Textarea
                value={jsonData}
                readOnly
                className="font-mono text-xs h-[600px] resize-none"
              />

              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-semibold text-blue-900 mb-2">
                  📋 Next Steps:
                </p>
                <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                  <li>Copy the JSON data above</li>
                  <li>Share it with the developer</li>
                  <li>Check console logs for additional debug info</li>
                </ol>
              </div>
            </div>
          )}
        </Card>

        {/* Quick Access Section */}
        <Card className="mt-6 p-6 bg-gradient-to-r from-purple-50 to-blue-50">
          <h3 className="font-semibold mb-3">🎯 Quick Access - Recent Welder IDs:</h3>
          <p className="text-sm text-gray-600 mb-3">
            Open browser console (F12) and run this command to get all welder IDs:
          </p>
          <pre className="bg-gray-900 text-green-400 p-3 rounded text-xs overflow-x-auto">
{`// Paste this in browser console:
import('${window.location.origin}/src/services/welderService.js')
  .then(m => m.default.getAllWelders())
  .then(({data}) => {
    console.table(data.map(w => ({
      id: w.id,
      name: w.welder_name,
      cert: w.certificate_no
    })));
    return data;
  });`}
          </pre>
        </Card>
      </div>
    </div>
  )
}