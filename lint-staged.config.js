module.exports = {
  '**/*.{js,vue}': [
    'eslint --fix --cache --cache-location node_modules/.cache/.eslintcache --ignore-path .gitignore'
  ]
}
