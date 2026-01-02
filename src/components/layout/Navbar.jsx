import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import ChangePasswordDialog from '../auth/ChangePasswordDialog'
import { Home, FileText, Search, Key, LogOut, User, Menu, ChevronDown } from 'lucide-react'

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  const [showChangePassword, setShowChangePassword] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await signOut()
      navigate('/login', { replace: true })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setLoggingOut(false)
      setShowLogoutConfirm(false)
    }
  }

  const isActive = (path) => location.pathname === path

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/complete-report', label: 'Reports', icon: FileText },
    { path: '/search', label: 'Search', icon: Search },
  ]

  return (
    <>
      <nav className="bg-white border-b border-gray-200 shadow-md sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Brand */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <img 
                  src="/iss-logo.png" 
                  alt="ISS Logo" 
                  className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
              </div>
              <div className="hidden md:block">
                <h1 className="font-bold text-lg text-gray-900 leading-tight tracking-tight">
                  Welder Management System
                </h1>
                <p className="text-xs text-gray-500 font-medium">
                  Industrial Support Services Co.
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => {
                const Icon = link.icon
                const active = isActive(link.path)
                return (
                  <Link key={link.path} to={link.path}>
                    <Button
                      variant={active ? 'default' : 'ghost'}
                      size="sm"
                      className={`gap-2 transition-all duration-200 ${
                        active 
                          ? 'shadow-sm' 
                          : 'hover:bg-gray-100 hover:shadow-sm'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {link.label}
                    </Button>
                  </Link>
                )
              })}

              {/* Divider */}
              <div className="h-8 w-px bg-gray-300 mx-3" />

              {/* User Menu - Desktop */}
              {user && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                          {user.email.charAt(0).toUpperCase()}
                        </div>
                        <div className="hidden xl:block text-left">
                          <p className="text-xs font-medium text-gray-700 leading-none">
                            {user.email.split('@')[0]}
                          </p>
                          <p className="text-xs text-gray-500">Administrator</p>
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{user.email}</p>
                        <p className="text-xs text-gray-500">Administrator</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setShowChangePassword(true)}>
                      <Key className="mr-2 h-4 w-4" />
                      Change Password
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => setShowLogoutConfirm(true)}
                      className="text-red-600 focus:text-red-600 focus:bg-red-50"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            {/* Mobile Menu */}
            <div className="lg:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Menu className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Navigation</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {navLinks.map((link) => {
                    const Icon = link.icon
                    return (
                      <DropdownMenuItem key={link.path} asChild>
                        <Link to={link.path} className="flex items-center">
                          <Icon className="mr-2 h-4 w-4" />
                          {link.label}
                        </Link>
                      </DropdownMenuItem>
                    )
                  })}
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Account</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => setShowChangePassword(true)}>
                    <Key className="mr-2 h-4 w-4" />
                    Change Password
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setShowLogoutConfirm(true)}
                    className="text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      {/* Change Password Dialog */}
      <ChangePasswordDialog
        open={showChangePassword}
        onOpenChange={setShowChangePassword}
      />

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to log out? You'll need to sign in again to access the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loggingOut}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogout}
              disabled={loggingOut}
              className="bg-red-600 hover:bg-red-700"
            >
              {loggingOut ? 'Logging out...' : 'Logout'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}