import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import ChangePasswordDialog from '../auth/ChangePasswordDialog'
import { Home, FileText, Search, Key, LogOut } from 'lucide-react'

export default function Navbar() {
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

  return (
    <>
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Brand */}
            <div className="flex items-center space-x-3">
              <img 
                src="/iss-logo.png" 
                alt="ISS Logo" 
                className="h-10 w-auto"
                onError={(e) => {
                  // Fallback if logo doesn't load
                  e.target.style.display = 'none'
                }}
              />
              <div>
                <h1 className="font-bold text-lg text-gray-900 leading-tight">
                  Welder Management
                </h1>
                <p className="text-xs text-gray-600">
                  Industrial Support Services
                </p>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-2">
              <Link to="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Home className="w-4 h-4" />
                  <span className="hidden sm:inline">Home</span>
                </Button>
              </Link>
              
              <Link to="/complete-report">
                <Button variant="ghost" size="sm" className="gap-2">
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline">Reports</span>
                </Button>
              </Link>
              
              <Link to="/search">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Search className="w-4 h-4" />
                  <span className="hidden sm:inline">Search</span>
                </Button>
              </Link>

              {/* Divider */}
              <div className="h-6 w-px bg-gray-300 mx-2" />

              {/* User Actions */}
              {user && (
                <div className="flex items-center space-x-2">
                  {/* User Email */}
                  <div className="hidden md:block text-right mr-2">
                    <p className="text-sm font-medium text-gray-700">
                      {user.email}
                    </p>
                    <p className="text-xs text-gray-500">Administrator</p>
                  </div>

                  {/* Change Password */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => setShowChangePassword(true)}
                  >
                    <Key className="w-4 h-4" />
                    <span className="hidden sm:inline">Change Password</span>
                  </Button>

                  {/* Logout */}
                  <Button
                    variant="destructive"
                    size="sm"
                    className="gap-2"
                    onClick={() => setShowLogoutConfirm(true)}
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Logout</span>
                  </Button>
                </div>
              )}
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