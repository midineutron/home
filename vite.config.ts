import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')  // Optional: Allows using '@' as a shortcut for './src'
    }
  },
  server: {
    open: true,  // Automatically open the app in the browser
  }
});