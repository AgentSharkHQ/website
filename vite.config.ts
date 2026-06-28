import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

// Multi-page app: each HTML entry becomes its own static document, so every
// page ships correct per-page <title>/meta/OG tags (good for SEO + sharing).
// Vercel's cleanUrls serves dist/about.html at /about.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        about: resolve(import.meta.dirname, 'about.html'),
      },
    },
  },
})
