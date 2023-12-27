import viteReact from '@vitejs/plugin-react';

/** @type {import('vite').UserConfig} */
export default {
  plugins: [viteReact()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
};
