import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      '@core': path.resolve(__dirname, '../../packages/core/src'),
    },
  },
})
