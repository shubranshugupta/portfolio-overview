import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'my-mfe',
      filename: 'remoteEntry.js',
      exposes: {
        './ExposedComponent': './src/components/ExposedComponent.tsx',
      },
      shared: ['react', 'react-dom', '@mui/material'],
    }),
  ],
});