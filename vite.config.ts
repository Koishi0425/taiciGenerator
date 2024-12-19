import { defineConfig } from 'vite'

export default defineConfig({
  base: '/taichiGenerator/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    port: 3000,
  },
})
