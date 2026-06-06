import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  build: {
    // Raise chunk warning threshold (we're intentionally splitting below)
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        // Split vendor code into separate cached chunks
        // Each chunk is cached independently — unchanged chunks skip re-processing
        manualChunks: {
          // React core — almost never changes
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Animation — large but stable
          'vendor-motion': ['framer-motion'],
          // Form + toast utilities
          'vendor-ui': ['react-hook-form', 'react-hot-toast'],
        },
      },
    },

    // Minification settings
    minify: 'esbuild',   // esbuild is 20-40x faster than terser
    sourcemap: false,    // skip sourcemaps in prod — saves build time
    target: 'es2018',   // modern target = less transpilation work
  },

  server: {
    proxy: {
      '/api': {
        target:       'http://localhost:3001',
        changeOrigin: true,
        secure:       false,
      },
    },
  },
})
