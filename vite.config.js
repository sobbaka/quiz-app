import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  publicDir: 'docs',
  resolve: {
    alias: {
      '~bootstrap': resolve(__dirname, 'node_modules/bootstrap'),
    }
  },
  server: {
    watch: {
      usePolling: true
    },
    open: true
  },
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
  plugins: [react()],
})
