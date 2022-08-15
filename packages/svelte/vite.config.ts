import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5500,
    cors: false
  },
  preview: {
    port: 8080
  },

  plugins: [svelte()]
})
