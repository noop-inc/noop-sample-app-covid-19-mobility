import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'

export default defineConfig({
  plugins: [createVuePlugin()],
  // server: {
  //   proxy: {
  //     '^/(api|data)': {
  //       target: 'https://localnoop.app:1234',
  //       secure: false
  //     }
  //   }
  // },
  build: {
    minify: false,
    brotliSize: false,
    chunkSizeWarningLimit: 2000
  }
})
