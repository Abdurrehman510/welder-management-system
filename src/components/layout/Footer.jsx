import { MapPin, Phone, Mail, Globe } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-auto">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/iss-logo.png" 
                alt="ISS Logo" 
                className="h-12 w-auto brightness-0 invert"
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
              <div>
                <h3 className="font-bold text-lg">ISS Company</h3>
                <p className="text-sm text-gray-400">Industrial Support Services</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Leading provider of welding qualification and certification management solutions in the Kingdom of Saudi Arabia.
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg border-b border-gray-700 pb-2">
              Contact Information
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3 text-gray-300 hover:text-white transition-colors">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Head Office</p>
                  <p className="text-gray-400">P.O. Box 11501, Dammam 31463</p>
                  <p className="text-gray-400">Kingdom of Saudi Arabia</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <div>
                  <p>Ph: +966 13 844 7733</p>
                  <p>Fax: +966 13 844 8833</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <a href="mailto:info@issksa.com" className="hover:underline">
                  info@issksa.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg border-b border-gray-700 pb-2">
              Quick Links
            </h3>
            <div className="space-y-2 text-sm">
              <a 
                href="/" 
                className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all"
              >
                → Home
              </a>
              <a 
                href="/complete-report" 
                className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all"
              >
                → Complete Reports
              </a>
              <a 
                href="/search" 
                className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all"
              >
                → Search Welders
              </a>
              <a 
                href="/form1" 
                className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all"
              >
                → WPQ Certificate Form
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>
              © {currentYear} Industrial Support Services Co. Ltd. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors flex items-center gap-1">
                <Globe className="w-4 h-4" />
                www.issksa.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}