import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { HashRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import App from './App';
import GlobalStyles from './styles/globalstyles';
import { theme } from './styles/theme';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router>
          <App />
          <GlobalStyles />
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
