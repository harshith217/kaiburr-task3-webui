import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
// No need for node URL helpers; use relative string alias

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => {
          const newPath = path.replace(/^\/api/, '');
          console.log('[Vite Proxy] Rewrite:', path, '→', newPath);
          return newPath;
        },
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('[Proxy Request]', req.method, req.url, '→', proxyReq.path);
          });
        }
      }
    }
  },
  preview: {
    port: 5173
  },
  envPrefix: ['VITE_', 'APP_'],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});
