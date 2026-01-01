import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Home, FileText, Search, LogOut } from 'lucide-react'

export default function Navbar() {
  const navigate = useNavigate()

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center text-white font-bold">
              ISS
            </div>
            <span className="font-semibold text-lg">Welder Management</span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" className="gap-2">
                <Home className="w-4 h-4" />
                Home
              </Button>
            </Link>
            <Link to="/complete-report">
              <Button variant="ghost" className="gap-2">
                <FileText className="w-4 h-4" />
                Complete Report
              </Button>
            </Link>
            <Link to="/search">
              <Button variant="ghost" className="gap-2">
                <Search className="w-4 h-4" />
                Search
              </Button>
            </Link>
            <Button variant="ghost" className="gap-2">
              Change Password
            </Button>
            <Button 
              variant="destructive" 
              className="gap-2"
              onClick={() => navigate('/login')}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}