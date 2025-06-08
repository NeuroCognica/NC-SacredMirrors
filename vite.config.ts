import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react' // <-- 1. IMPORT THE REACT PLUGIN
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    // --- 2. ADD THE PLUGINS SECTION ---
    plugins: [react()], 

    // --- 3. ADD THE BASE PATH FOR GITHUB PAGES ---
    base: '/NC-SacredMirrors/',

    // --- Your existing settings are preserved below ---
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
