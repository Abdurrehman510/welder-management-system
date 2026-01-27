import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  FileText, 
  Lock, 
  ArrowRight, 
  Sparkles,
  CheckCircle2,
  Zap,
  Shield,
  TrendingUp
} from 'lucide-react'

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState(null)

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
      alert(`Opening ${form.title}...`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 overflow-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .animate-slide-in-right {
          animation: slideInRight 0.6s ease-out forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.5s ease-out forwards;
        }
        .shimmer-effect {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
        .card-entrance-1 { animation-delay: 0.1s; opacity: 0; }
        .card-entrance-2 { animation-delay: 0.2s; opacity: 0; }
        .card-entrance-3 { animation-delay: 0.3s; opacity: 0; }
        .card-entrance-4 { animation-delay: 0.4s; opacity: 0; }
        .card-entrance-5 { animation-delay: 0.5s; opacity: 0; }
      `}</style>

      {/* Hero Section with Animated Background */}
      <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        {/* Animated Background Circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-16 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4 animate-slide-in-right">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Welcome to ISS Management System
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight animate-fade-in-up">
              Welder Qualification Management
            </h1>
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
              Streamline your welder certification process with our comprehensive digital platform. 
              Manage qualifications, track continuity, and generate professional certificates all in one place.
            </p>
          </div>
        </div>

        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-12 md:h-16">
            <path fill="#f9fafb" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </div>

      {/* Quick Stats with Stagger Animation */}
      <div className="container mx-auto px-4 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="shadow-xl border-t-4 border-t-blue-600 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-scale-in card-entrance-1 overflow-hidden group">
            <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <CardHeader className="pb-3 relative">
              <div className="flex items-center justify-between">
                <CardTitle className="text-4xl font-bold text-blue-600 transition-transform duration-300 group-hover:scale-110">1</CardTitle>
                <Zap className="w-8 h-8 text-blue-600 opacity-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110" />
              </div>
              <CardDescription className="text-base">Active Form Available</CardDescription>
            </CardHeader>
          </Card>
          <Card className="shadow-xl border-t-4 border-t-green-600 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-scale-in card-entrance-2 overflow-hidden group">
            <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <CardHeader className="pb-3 relative">
              <div className="flex items-center justify-between">
                <CardTitle className="text-4xl font-bold text-green-600 transition-transform duration-300 group-hover:scale-110">100%</CardTitle>
                <Shield className="w-8 h-8 text-green-600 opacity-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110" />
              </div>
              <CardDescription className="text-base">Digital Process</CardDescription>
            </CardHeader>
          </Card>
          <Card className="shadow-xl border-t-4 border-t-purple-600 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-scale-in card-entrance-3 overflow-hidden group">
            <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <CardHeader className="pb-3 relative">
              <div className="flex items-center justify-between">
                <CardTitle className="text-4xl font-bold text-purple-600 transition-transform duration-300 group-hover:scale-110">24/7</CardTitle>
                <TrendingUp className="w-8 h-8 text-purple-600 opacity-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110" />
              </div>
              <CardDescription className="text-base">System Access</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Forms Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8 animate-fade-in-up card-entrance-1">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Available Forms</h2>
              <p className="text-gray-600 text-base md:text-lg">Select a form to get started with certification management</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forms.map((form, index) => {
              const Icon = form.icon
              const isHovered = hoveredCard === form.id
              return (
                <Card
                  key={form.id}
                  onMouseEnter={() => setHoveredCard(form.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`animate-scale-in card-entrance-${index + 1} group relative overflow-hidden transition-all duration-500 ${
                    form.available
                      ? 'cursor-pointer hover:shadow-2xl hover:-translate-y-2 border-2 hover:border-blue-500'
                      : 'opacity-60 cursor-not-allowed'
                  }`}
                  onClick={() => handleFormClick(form)}
                >
                  {/* Animated Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${form.color} transition-all duration-500 ${
                    form.available && isHovered ? 'opacity-10 scale-110' : 'opacity-0'
                  }`} />
                  
                  {/* Shimmer Effect */}
                  {form.available && (
                    <div className={`absolute inset-0 shimmer-effect transition-opacity duration-500 ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}></div>
                  )}

                  {/* Lock Icon for Unavailable Forms */}
                  {!form.available && (
                    <div className="absolute top-4 right-4 animate-pulse">
                      <Lock className="w-6 h-6 text-gray-400" />
                    </div>
                  )}

                  <CardHeader className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`relative p-3 rounded-xl bg-gradient-to-br ${form.color} shadow-lg transition-all duration-500 ${
                        form.available && isHovered ? 'scale-110 rotate-3' : ''
                      }`}>
                        <Icon className="w-8 h-8 text-white" />
                        {form.available && (
                          <div className={`absolute inset-0 rounded-xl bg-white transition-opacity duration-500 ${
                            isHovered ? 'opacity-20' : 'opacity-0'
                          }`}></div>
                        )}
                      </div>
                      <Badge className={`${form.badgeColor} transition-transform duration-300 ${
                        form.available && isHovered ? 'scale-110' : ''
                      }`}>
                        {form.badge}
                      </Badge>
                    </div>
                    <CardTitle className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
                      isHovered ? 'text-blue-600' : 'text-gray-900'
                    }`}>
                      {form.title}
                    </CardTitle>
                    <CardDescription className="text-base font-medium text-blue-600">
                      {form.subtitle}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="relative">
                    <p className={`leading-relaxed mb-4 transition-colors duration-300 ${
                      isHovered ? 'text-gray-700' : 'text-gray-600'
                    }`}>
                      {form.description}
                    </p>
                    
                    {form.available ? (
                      <div className={`flex items-center text-blue-600 font-semibold transition-all duration-300 ${
                        isHovered ? 'gap-3' : 'gap-2'
                      }`}>
                        <span>Open Form</span>
                        <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${
                          isHovered ? 'translate-x-2' : ''
                        }`} />
                      </div>
                    ) : (
                      <div className="flex items-center text-gray-400 font-semibold">
                        <span>Available Soon</span>
                      </div>
                    )}
                  </CardContent>

                  {/* Hover Glow Effect */}
                  {form.available && (
                    <div className={`absolute inset-0 rounded-lg transition-opacity duration-500 pointer-events-none ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`} 
                         style={{ boxShadow: '0 0 40px rgba(59, 130, 246, 0.3)' }} />
                  )}
                </Card>
              )
            })}
          </div>
        </div>

        {/* Features Section with Enhanced Animation */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 animate-fade-in-up">System Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Digital Records',
                description: 'Paperless documentation system',
                icon: FileText,
                color: 'blue',
              },
              {
                title: 'Quick Search',
                description: 'Find welders instantly',
                icon: CheckCircle2,
                color: 'green',
              },
              {
                title: 'Compliance',
                description: 'ASME, AWS, API standards',
                icon: Shield,
                color: 'purple',
              },
              {
                title: 'Reports',
                description: 'Generate comprehensive reports',
                icon: TrendingUp,
                color: 'orange',
              },
            ].map((feature, index) => {
              const Icon = feature.icon
              const colorClasses = {
                blue: 'bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white',
                green: 'bg-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white',
                purple: 'bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white',
                orange: 'bg-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white',
              }
              return (
                <Card 
                  key={index} 
                  className={`animate-scale-in card-entrance-${index + 1} text-center hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group cursor-pointer overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <CardHeader className="relative">
                    <div className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${colorClasses[feature.color]} transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-md`}>
                      <Icon className="w-8 h-8 transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <CardTitle className="text-xl font-bold mb-2 transition-colors duration-300 group-hover:text-blue-600">{feature.title}</CardTitle>
                    <CardDescription className="transition-colors duration-300 group-hover:text-gray-700">{feature.description}</CardDescription>
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