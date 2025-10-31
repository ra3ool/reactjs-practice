import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';
import { pwaConfig } from './pwa.config';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr(), VitePWA(pwaConfig)],
  base: '/reactjs-practice',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
