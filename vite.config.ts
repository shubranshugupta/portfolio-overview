import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  build: {
    target: 'esnext', // or 'modules'
  },
  plugins: [
    react(),
    federation({
      name: 'portfolio-overview',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.tsx',
      },
      shared: ['react', 'react-dom', '@mui/material'],
    }),
  ],
});