import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // THIS IS THE CRITICAL LINE THAT FIXES THE 404 ERRORS
  base: '/NC-SacredMirrors/', 
})
