import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true, // 👈 Isso ativa o uso global de `test`, `expect`, etc
    setupFiles: './setupTests.js', // 👈 opcional, se você tiver o setup
  },
});
