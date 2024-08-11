import path from 'path'

const { defineConfig } = require('vite')

module.exports = defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environmentMatchGlobs: [['src/tests/controllers/**', 'prisma']],
    dir: './src',
  },
})
