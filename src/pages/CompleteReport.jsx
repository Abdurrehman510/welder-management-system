import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Users, ArrowRight, BarChart3, ArrowLeft } from 'lucide-react'

/**
 * ✅ PHASE 7: Complete Report Page - Enhanced Navigation Hub
 * 
 * Features:
 * - Modern card-based navigation
 * - Clear visual hierarchy
 * - Descriptive cards for each report type
 * 
 * @production-ready
 */

export default function CompleteReport() {
  const navigate = useNavigate()

  const reportCards = [
    {
      id: 1,
      title: 'Detailed Reports — Form1',
      subtitle: 'WPQ Certificate Records',
      description: 'Search, view, and manage all WPQ Certificate records. Update existing records, generate certificates, and delete entries with full search capabilities.',
      icon: FileText,
      route: '/detailed-reports-form1',
      color: 'from-blue-500 to-blue-600',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      hoverColor: 'hover:border-blue-500',
      features: [
        'Search by name, client, or certificate number',
        'Update and delete records',
        'Generate PDF certificates',
        'View complete qualification details'
      ]
    },
    {
      id: 2,
      title: 'Form1 Details',
      subtitle: 'Welder Directory & PDFs',
      description: 'Browse all welders in the system and generate Form1 (WPQ Certificate) and Form2 (Continuity Record) PDFs for individual welders.',
      icon: Users,
      route: '/form1-details',
      color: 'from-purple-500 to-purple-600',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      hoverColor: 'hover:border-purple-500',
      features: [
        'View all welder profiles',
        'Generate Form1 PDF documents',
        'Generate Form2 continuity PDFs',
        'Quick access to welder information'
      ]
    },
  ]

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="max-w-3xl">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="mb-4 gap-2 text-white hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Reports & Analytics
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Complete Reports
            </h1>
            <p className="text-lg text-blue-100 leading-relaxed">
              Access comprehensive reports, search records, and generate professional documentation 
              for all welder qualifications and certifications.
            </p>
          </div>
        </div>
      </div>

      {/* Reports Section */}
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Available Reports</h2>
          <p className="text-gray-600">Select a report type to view detailed information and manage records</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {reportCards.map((report) => {
            const Icon = report.icon
            return (
              <Card
                key={report.id}
                className={`group relative overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-2xl hover:-translate-y-1 border-2 ${report.hoverColor}`}
                onClick={() => navigate(report.route)}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${report.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                
                <CardHeader className="relative pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-4 rounded-xl ${report.iconBg} shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-10 h-10 ${report.iconColor}`} />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {report.title}
                  </CardTitle>
                  <CardDescription className="text-base font-medium text-blue-600">
                    {report.subtitle}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative space-y-6">
                  <p className="text-gray-600 leading-relaxed">
                    {report.description}
                  </p>
                  
                  {/* Features List */}
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-700 mb-3">Key Features:</p>
                    <ul className="space-y-2">
                      {report.features.map((feature, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-600">
                          <span className="mr-2 mt-1 flex-shrink-0 h-1.5 w-1.5 rounded-full bg-blue-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Link */}
                  <div className="flex items-center text-blue-600 font-semibold pt-4 border-t group-hover:gap-2 transition-all">
                    <span>Open Report</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500 rounded-lg transition-colors pointer-events-none" />
              </Card>
            )
          })}
        </div>

        {/* Additional Info Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Search & Filter
              </CardTitle>
              <CardDescription>
                Quickly find specific records using powerful search and filtering options
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-green-600" />
                Generate PDFs
              </CardTitle>
              <CardDescription>
                Create professional PDF certificates and reports with one click
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-purple-100">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-600" />
                Manage Records
              </CardTitle>
              <CardDescription>
                Update, delete, and maintain all welder qualification records
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  )
}