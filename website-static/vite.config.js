import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'

export default defineConfig({
  plugins: [createVuePlugin()],
  server: {
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 3000
    }
  },
  build: {
    target: 'esnext',
    minify: false,
    brotliSize: false,
    chunkSizeWarningLimit: 2000
  }
})
