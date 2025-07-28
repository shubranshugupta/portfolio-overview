import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import { ThemeModeProvider } from './components/context/ThemeModeContext';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ThemeModeProvider>
      <App />
    </ThemeModeProvider>
  </React.StrictMode>,
);