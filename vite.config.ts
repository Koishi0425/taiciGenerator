import { defineConfig } from 'vite'

export default defineConfig({
  base: '/taiciGenerator/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    port: 3000,
  },
})
