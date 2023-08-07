import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: './lib/main.ts',
      name: 'VersionWebpackPlugin',
      fileName: 'version-webpack-plugin'
    }
  }
})
