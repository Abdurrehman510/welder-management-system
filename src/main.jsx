import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { AuthProvider } from './contexts/AuthContext'
import { Toaster } from 'sonner'
import './styles/globals.css'

// ✅ FIX: Add Buffer polyfill for browser environment
import { Buffer } from 'buffer'
window.Buffer = Buffer

/**
 * ✅ FIXED: Added Buffer polyfill for @react-pdf/renderer
 * ✅ Added Sonner Toaster for toast notifications
 * ✅ Position: top-right with rich colors
 */

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster 
        position="top-right" 
        richColors 
        closeButton
        duration={4000}
        toastOptions={{
          style: {
            padding: '16px',
            borderRadius: '8px',
          },
          className: 'toast-custom',
        }}
      />
    </AuthProvider>
  </React.StrictMode>,
)