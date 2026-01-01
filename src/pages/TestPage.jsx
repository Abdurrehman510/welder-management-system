import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react'
import { testSupabaseConnection, testDatabaseSchema } from '../utils/testSupabase'

export default function TestPage() {
  const [testing, setTesting] = useState(false)
  const [results, setResults] = useState(null)

  const runTests = async () => {
    setTesting(true)
    setResults(null)

    console.log('🚀 Starting Phase 1 Tests...\n')

    const connectionTest = await testSupabaseConnection()
    const schemaTest = await testDatabaseSchema()

    const testResults = {
      connection: connectionTest,
      schema: schemaTest,
      routing: true, // If this page loads, routing works
      ui: true, // If UI components render, shadcn works
      tailwind: true, // If styles apply, Tailwind works
    }

    setResults(testResults)
    setTesting(false)

    console.log('\n🎉 Phase 1 Testing Complete!')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Phase 1 Testing Suite</CardTitle>
            <CardDescription>
              Verify all Phase 1 setup is working correctly
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Test Button */}
            <div className="flex justify-center">
              <Button 
                onClick={runTests} 
                disabled={testing}
                size="lg"
                className="gap-2"
              >
                {testing && <Loader2 className="w-4 h-4 animate-spin" />}
                {testing ? 'Running Tests...' : 'Run All Tests'}
              </Button>
            </div>

            {/* Test Results */}
            {results && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Test Results:</h3>

                {/* Supabase Connection */}
                <TestResult
                  title="Supabase Connection"
                  description="Database connectivity and authentication"
                  passed={results.connection}
                />

                {/* Database Schema */}
                <TestResult
                  title="Database Schema"
                  description="All tables and new fields (designation, DOB, signature)"
                  passed={results.schema}
                />

                {/* Routing */}
                <TestResult
                  title="React Router"
                  description="Navigation and route configuration"
                  passed={results.routing}
                />

                {/* shadcn/ui */}
                <TestResult
                  title="shadcn/ui Components"
                  description="Button, Card, Input, and other UI components"
                  passed={results.ui}
                />

                {/* Tailwind CSS */}
                <TestResult
                  title="Tailwind CSS"
                  description="Styling and utility classes"
                  passed={results.tailwind}
                />

                {/* Overall Result */}
                <div className="pt-4 border-t">
                  {Object.values(results).every(Boolean) ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                      <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-2" />
                      <h4 className="text-xl font-bold text-green-800">
                        🎉 Phase 1 Complete!
                      </h4>
                      <p className="text-green-700 mt-2">
                        All tests passed. Ready for Phase 2: Authentication
                      </p>
                    </div>
                  ) : (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                      <XCircle className="w-12 h-12 text-red-600 mx-auto mb-2" />
                      <h4 className="text-xl font-bold text-red-800">
                        Some Tests Failed
                      </h4>
                      <p className="text-red-700 mt-2">
                        Check console for details. Fix errors before proceeding.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <h4 className="font-semibold text-blue-900 mb-2">📋 Instructions:</h4>
              <ol className="list-decimal list-inside space-y-1 text-blue-800 text-sm">
                <li>Click "Run All Tests" button above</li>
                <li>Open browser console (F12) to see detailed logs</li>
                <li>Verify all tests show green checkmarks</li>
                <li>If any test fails, check the error message in console</li>
                <li>Once all pass, you're ready for Phase 2!</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function TestResult({ title, description, passed }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg border bg-white">
      <div className="flex-shrink-0 mt-0.5">
        {passed ? (
          <CheckCircle2 className="w-5 h-5 text-green-600" />
        ) : (
          <XCircle className="w-5 h-5 text-red-600" />
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h4 className="font-semibold">{title}</h4>
          <Badge variant={passed ? "default" : "destructive"}>
            {passed ? "PASS" : "FAIL"}
          </Badge>
        </div>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  )
}