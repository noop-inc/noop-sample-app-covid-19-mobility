const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = merge(common, {
  stats: 'errors-only',
  entry: path.resolve(__dirname, 'src', 'main.js'),
  mode: 'production',
  plugins: [
    new CompressionPlugin({
      compressionOptions: { level: 9 }
    })
  ]
})
