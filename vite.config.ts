import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
    },
    define: {
      // This polyfills process.env.API_KEY so it works in the browser
      // It prioritizes REACT_APP_GEMINI_API_KEY, then API_KEY
      'process.env.API_KEY': JSON.stringify(env.REACT_APP_GEMINI_API_KEY || env.API_KEY || ''),
      // Prevents "process is not defined" errors
      'process.env': {} 
    }
  };
});