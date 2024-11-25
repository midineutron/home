import { defineConfig } from 'vite';
import path from 'path';
import { output } from 'three/webgpu';

export default defineConfig({
  base: '',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')  // Optional: Allows using '@' as a shortcut for './src'
    }
  },
  server: {
    open: true,  // Automatically open the app in the browser
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three']
        }
      }
    }
  }
});