import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/', // Use root path for most deployments
  build: {
    outDir: 'dist',
    sourcemap: true,
    assetsDir: 'assets',
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})