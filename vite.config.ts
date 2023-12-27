import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dotenv from 'dotenv'
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    PORT: process.env.PORT,
  },
  server: {
    port: Number(process.env.PORT),
  },
  optimizeDeps: {
    // 👈 optimizedeps
    esbuildOptions: {
      target: 'esnext',
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },
      supported: {
        bigint: true,
      },
    },
  },

  build: {
    target: ['esnext'], // 👈 build.target
  },
  plugins: [vue()],
})
