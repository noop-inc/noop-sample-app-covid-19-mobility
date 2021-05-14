const { createVuePlugin } = require('vite-plugin-vue2')

module.exports = {
  plugins: [createVuePlugin()],
  server: {
    port: 8080
  },
  build: {
    chunkSizeWarningLimit: 600
  }
}
