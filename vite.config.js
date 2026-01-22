import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// ✅ FIX: Configure Buffer polyfill and global
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      buffer: "buffer", // ✅ Add Buffer alias
    },
  },
  define: {
    global: 'globalThis', // ✅ Define global for browser
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis' // ✅ Ensure global is available
      }
    }
  }
})