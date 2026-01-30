import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  FileText, 
  Lock, 
  ArrowRight, 
  Sparkles,
  CheckCircle2
} from 'lucide-react'

export default function Home() {
  const navigate = useNavigate()

  const forms = [
    {
      id: 1,
      title: 'Form 1',
      subtitle: 'WPQ Certificate',
      description: 'Welder Performance Qualification Record - Complete certification form with all testing variables and results.',
      icon: FileText,
      available: true,
      route: '/form1',
      color: 'from-blue-500 to-blue-600',
      badge: 'Active',
      badgeColor: 'bg-green-100 text-green-800',
    },
    {
      id: 2,
      title: 'Form 2',
      subtitle: 'Continuity Record',
      description: 'Welding continuity tracking and qualification maintenance records.',
      icon: FileText,
      available: false,
      route: '/form2',
      color: 'from-gray-400 to-gray-500',
      badge: 'Coming Soon',
      badgeColor: 'bg-gray-100 text-gray-600',
    },
    {
      id: 3,
      title: 'Form 3',
      subtitle: 'Documentation',
      description: 'Additional certification and qualification documentation.',
      icon: FileText,
      available: false,
      route: '/form3',
      color: 'from-gray-400 to-gray-500',
      badge: 'Coming Soon',
      badgeColor: 'bg-gray-100 text-gray-600',
    },
    {
      id: 4,
      title: 'Form 4',
      subtitle: 'Inspection Report',
      description: 'Quality control inspection and verification reports.',
      icon: FileText,
      available: false,
      route: '/form4',
      color: 'from-gray-400 to-gray-500',
      badge: 'Coming Soon',
      badgeColor: 'bg-gray-100 text-gray-600',
    },
    {
      id: 5,
      title: 'Form 5',
      subtitle: 'Compliance Record',
      description: 'Compliance tracking and regulatory documentation.',
      icon: FileText,
      available: false,
      route: '/form5',
      color: 'from-gray-400 to-gray-500',
      badge: 'Coming Soon',
      badgeColor: 'bg-gray-100 text-gray-600',
    },
  ]

  const handleFormClick = (form) => {
    if (form.available) {
      navigate(form.route)
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Welcome to ISS Management System
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Welder Qualification Management
            </h1>
            <p className="text-lg text-blue-100 leading-relaxed">
              Streamline your welder certification process with our comprehensive digital platform. 
              Manage qualifications, track continuity, and generate professional certificates all in one place.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="container mx-auto px-4 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="shadow-lg border-t-4 border-t-blue-600">
            <CardHeader className="pb-3">
              <CardTitle className="text-3xl font-bold text-blue-600">1</CardTitle>
              <CardDescription>Active Form Available</CardDescription>
            </CardHeader>
          </Card>
          <Card className="shadow-lg border-t-4 border-t-green-600">
            <CardHeader className="pb-3">
              <CardTitle className="text-3xl font-bold text-green-600">100%</CardTitle>
              <CardDescription>Digital Process</CardDescription>
            </CardHeader>
          </Card>
          <Card className="shadow-lg border-t-4 border-t-purple-600">
            <CardHeader className="pb-3">
              <CardTitle className="text-3xl font-bold text-purple-600">24/7</CardTitle>
              <CardDescription>System Access</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Forms Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Available Forms</h2>
              <p className="text-gray-600 mt-1">Select a form to get started with certification management</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forms.map((form) => {
              const Icon = form.icon
              return (
                <Card
                  key={form.id}
                  className={`group relative overflow-hidden transition-all duration-300 ${
                    form.available
                      ? 'cursor-pointer hover:shadow-2xl hover:-translate-y-1 border-2 hover:border-blue-500'
                      : 'opacity-60 cursor-not-allowed'
                  }`}
                  onClick={() => handleFormClick(form)}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${form.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                  
                  {/* Lock Icon for Unavailable Forms */}
                  {!form.available && (
                    <div className="absolute top-4 right-4">
                      <Lock className="w-6 h-6 text-gray-400" />
                    </div>
                  )}

                  <CardHeader className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${form.color} shadow-lg ${
                        form.available ? 'group-hover:scale-110' : ''
                      } transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <Badge className={form.badgeColor}>
                        {form.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                      {form.title}
                    </CardTitle>
                    <CardDescription className="text-base font-medium text-blue-600">
                      {form.subtitle}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="relative">
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {form.description}
                    </p>
                    
                    {form.available ? (
                      <div className="flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
                        <span>Open Form</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    ) : (
                      <div className="flex items-center text-gray-400 font-semibold">
                        <span>Available Soon</span>
                      </div>
                    )}
                  </CardContent>

                  {/* Hover Effect Border */}
                  {form.available && (
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500 rounded-lg transition-colors pointer-events-none" />
                  )}
                </Card>
              )
            })}
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">System Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Digital Records',
                description: 'Paperless documentation system',
                icon: FileText,
              },
              {
                title: 'Quick Search',
                description: 'Find welders instantly',
                icon: CheckCircle2,
              },
              {
                title: 'Compliance',
                description: 'ASME, AWS, API standards',
                icon: CheckCircle2,
              },
              {
                title: 'Reports',
                description: 'Generate comprehensive reports',
                icon: CheckCircle2,
              },
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}