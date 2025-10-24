import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: '/fintrack/',
  server: {
    proxy: {
      '/api': {
        target: 'https://finance-app-xo80.onrender.com', // endereço do seu backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
