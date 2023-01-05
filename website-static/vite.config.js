import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'

export default defineConfig({
  plugins: [vue()],
  server: {
    hmr: {
      protocol: 'ws',
      host: 'localhost'
    }
  },
  build: {
    chunkSizeWarningLimit: 1000
  }
})
