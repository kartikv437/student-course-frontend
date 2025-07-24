import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { TabProgressProvider } from './context/TabProgressContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <TabProgressProvider>
      <ThemeProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </ThemeProvider>
    </TabProgressProvider>
  </React.StrictMode>
);