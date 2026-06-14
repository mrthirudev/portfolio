import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Allow overriding the base path at build time via VITE_BASE environment variable.
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  // Cast plugin to any to avoid cross-workspace type mismatch during CI/type-check
  plugins: [react() as any],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4003',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
