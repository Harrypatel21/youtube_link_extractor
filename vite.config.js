import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enable JSX in .js files as well
      include: "**/*.{jsx,js}",
    }), 
    crx({ manifest }), 
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5174,
    strictPort: true,
    hmr: {
      port: 5174,
    }
  },
  esbuild: {
    // Enable JSX in .js files
    loader: 'jsx',
    include: /src\/.*\.[jt]sx?$/,
  }
})