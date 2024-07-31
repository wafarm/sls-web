import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      // this is for dev only
      // production server should use nginx to redirect api calls
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ""),
      }
    }
  }
})
