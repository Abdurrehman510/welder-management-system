import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Users, ClipboardList, ArrowRight, Search } from 'lucide-react'

/**
 * CompleteReport Page
 * Navigation hub for all reports
 */

export default function CompleteReport() {
  const navigate = useNavigate()

  const reportCards = [
    {
      id: 1,
      title: 'Detailed Reports Form1',
      description: 'Search, view, update, and manage WPQ Certificate records with full CRUD operations',
      icon: FileText,
      iconColor: 'from-blue-600 to-blue-700',
      path: '/detailed-reports-form1',
      badge: 'Active',
      badgeColor: 'bg-green-100 text-green-700',
      features: ['Search by Name/Client/Cert', 'Update Records', 'Delete Records', 'Generate Certificates'],
    },
    {
      id: 2,
      title: 'Form1 Details',
      description: 'View comprehensive welder details with designation, DOB, DOJ, and generate Form1/Form2 PDFs',
      icon: Users,
      iconColor: 'from-purple-600 to-purple-700',
      path: '/form1-details',
      badge: 'Active',
      badgeColor: 'bg-green-100 text-green-700',
      features: ['View All Welders', 'Designation & DOB', 'Generate Form1 PDF', 'Generate Form2 PDF'],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 py-8">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
              <ClipboardList className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Complete Reports</h1>
              <p className="text-gray-600 mt-1">
                Access all welder qualification reports and records
              </p>
            </div>
          </div>
        </div>

        {/* Report Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {reportCards.map((report) => {
            const Icon = report.icon
            return (
              <Card
                key={report.id}
                className="group hover:shadow-2xl transition-all duration-300 border-gray-200 hover:border-blue-300 cursor-pointer overflow-hidden"
                onClick={() => navigate(report.path)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={`w-14 h-14 bg-gradient-to-br ${report.iconColor} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${report.badgeColor}`}
                    >
                      {report.badge}
                    </span>
                  </div>

                  <CardTitle className="text-xl mb-2 group-hover:text-blue-600 transition-colors">
                    {report.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600 leading-relaxed">
                    {report.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  {/* Features List */}
                  <div className="space-y-2 mb-4">
                    {report.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <Button
                    className="w-full gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md group-hover:shadow-lg transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate(report.path)
                    }}
                  >
                    Open Report
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}