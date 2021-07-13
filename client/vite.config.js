import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'

export default defineConfig({
  plugins: [createVuePlugin()],
  // server: {
  //   proxy: {
  //     '^/(api|data)': {
  //       target: 'https://covid.local.noop.app',
  //       changeOrigin: true,
  //       secure: false
  //     }
  //   }
  // },
  build: {
    target: 'esnext',
    minify: false,
    brotliSize: false,
    chunkSizeWarningLimit: 2000
  }
})
