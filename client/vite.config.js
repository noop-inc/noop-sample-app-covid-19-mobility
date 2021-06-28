const { createVuePlugin } = require('vite-plugin-vue2')

module.exports = {
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
}
