import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // ✅ Add Buffer polyfill for @react-pdf/renderer
      buffer: 'buffer'
    }
  },
  // ✅ Define global Buffer for browser environment
  define: {
    'global': 'globalThis',
  },
  optimizeDeps: {
    include: ['buffer']
  }
})