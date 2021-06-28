import vue from '@vitejs/plugin-vue'

export default {
  resolve: {
    alias: {
      vue: '@vue/compat'
    }
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          compatConfig: {
            MODE: 2
          }
        }
      }
    })
  ],
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
