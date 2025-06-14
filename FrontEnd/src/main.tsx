import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './css/style.css';
import './css/satoshi.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 🔍 Inicializar sistema de debug
import './config/debug.config';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <Router>
      <App />
    </Router>
    </QueryClientProvider>
  </React.StrictMode>,
);
