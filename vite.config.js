import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base:"/Tollcost/",
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.tollguru.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
