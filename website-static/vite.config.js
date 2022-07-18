import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'

export default defineConfig({
  plugins: [vue()],
  server: {
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173
    }
  },
  build: {
    target: 'esnext',
    minify: false,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 2000
  }
})
